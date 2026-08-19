"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FiTrash2,
  FiX,
  FiAlertTriangle,
} from "react-icons/fi";

type DeleteExperienceButtonProps = {
  id: string;
  company: string;
  role: string;
};

export default function DeleteExperienceButton({
  id,
  company,
  role,
}: DeleteExperienceButtonProps) {
  const router = useRouter();

  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  async function handleDelete() {
    setDeleting(true);
    setError("");

    try {
      const response = await fetch(
        `/api/admin/experience/${id}`,
        {
          method: "DELETE",
        }
      );

      const contentType =
        response.headers.get("content-type");

      let data: any = null;

      if (contentType?.includes("application/json")) {
        data = await response.json();
      }

      if (!response.ok) {
        setError(
          data?.details ||
            data?.error ||
            "Could not delete this experience."
        );

        return;
      }

      setConfirming(false);

      router.refresh();
    } catch (error) {
      console.error("DELETE EXPERIENCE ERROR:", error);

      setError(
        "Could not contact the server. Make sure the app and database are running."
      );
    } finally {
      setDeleting(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setConfirming(true)}
        title="Delete experience"
        className="flex h-9 w-9 items-center justify-center border border-[#7E2A5A]/20 text-[#F4EFE6]/35 transition hover:border-red-400/40 hover:bg-red-500/5 hover:text-red-400"
      >
        <FiTrash2 />
      </button>

      {confirming && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 px-5 backdrop-blur-sm">
          <div className="relative w-full max-w-[430px] border border-[#D4AF37]/15 bg-[#171414] p-6 shadow-[0_30px_100px_rgba(0,0,0,.7)]">
            <button
              type="button"
              onClick={() => setConfirming(false)}
              disabled={deleting}
              className="absolute right-4 top-4 text-[#F4EFE6]/30 transition hover:text-[#F4EFE6]"
            >
              <FiX />
            </button>

            <div className="flex h-10 w-10 items-center justify-center border border-red-400/25 bg-red-500/5 text-red-400">
              <FiAlertTriangle />
            </div>

            <p className="mt-5 text-[8px] uppercase tracking-[0.32em] text-[#D4AF37]">
              Delete Experience
            </p>

            <h2 className="mt-2 font-serif text-2xl">
              Are you sure?
            </h2>

            <p className="mt-3 text-sm leading-6 text-[#F4EFE6]/45">
              You&apos;re about to permanently delete{" "}
              <span className="text-[#F4EFE6]/75">
                {role}
              </span>{" "}
              at{" "}
              <span className="text-[#F4EFE6]/75">
                {company}
              </span>
              .
            </p>

            <p className="mt-2 text-xs text-red-300/60">
              This cannot be undone.
            </p>

            {error && (
              <div className="mt-5 border border-red-500/20 bg-red-500/5 px-4 py-3 text-xs leading-5 text-red-300">
                {error}
              </div>
            )}

            <div className="mt-7 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setConfirming(false)}
                disabled={deleting}
                className="border border-[#D4AF37]/15 px-4 py-3 text-[8px] uppercase tracking-[0.22em] text-[#F4EFE6]/50 transition hover:border-[#D4AF37]/35 hover:text-[#F4EFE6]"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="border border-red-400/25 bg-red-500/5 px-4 py-3 text-[8px] uppercase tracking-[0.22em] text-red-300 transition hover:bg-red-500/15 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {deleting
                  ? "Deleting..."
                  : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}