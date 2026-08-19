"use client";

import {
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

import {
  FiAlertTriangle,
  FiTrash2,
  FiX,
} from "react-icons/fi";

export default function DeleteProjectButton({
  id,
  title,
}: {
  id: string;
  title: string;
}) {
  const router =
    useRouter();

  const [
    confirming,
    setConfirming,
  ] = useState(false);

  const [
    deleting,
    setDeleting,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState("");

  async function handleDelete() {
    setDeleting(true);
    setError("");

    try {
      const response =
        await fetch(
          `/api/admin/projects/${id}`,
          {
            method:
              "DELETE",
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        setError(
          data?.details ||
            data?.error ||
            "Could not delete project."
        );

        return;
      }

      setConfirming(false);

      router.refresh();
    } catch (error) {
      console.error(
        "DELETE PROJECT ERROR:",
        error
      );

      setError(
        "Could not contact the server."
      );
    } finally {
      setDeleting(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() =>
          setConfirming(
            true
          )
        }
        className="flex h-9 w-9 items-center justify-center border border-[#7E2A5A]/20 text-[#F4EFE6]/35 transition hover:border-red-400/40 hover:text-red-400"
      >
        <FiTrash2 />
      </button>

      {confirming && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 px-5 backdrop-blur-sm">
          <div className="relative w-full max-w-[430px] border border-[#D4AF37]/15 bg-[#171414] p-6">
            <button
              onClick={() =>
                setConfirming(
                  false
                )
              }
              className="absolute right-4 top-4 text-[#F4EFE6]/30"
            >
              <FiX />
            </button>

            <div className="flex h-10 w-10 items-center justify-center border border-red-400/25 text-red-400">
              <FiAlertTriangle />
            </div>

            <h2 className="mt-5 font-serif text-2xl">
              Delete project?
            </h2>

            <p className="mt-3 text-sm leading-6 text-[#F4EFE6]/45">
              You&apos;re about
              to permanently
              delete{" "}
              <span className="text-[#F4EFE6]/80">
                {title}
              </span>
              .
            </p>

            {error && (
              <p className="mt-4 text-xs text-red-400">
                {error}
              </p>
            )}

            <div className="mt-7 grid grid-cols-2 gap-3">
              <button
                onClick={() =>
                  setConfirming(
                    false
                  )
                }
                className="border border-[#D4AF37]/15 py-3 text-[8px] uppercase tracking-[0.2em]"
              >
                Cancel
              </button>

              <button
                onClick={
                  handleDelete
                }
                disabled={
                  deleting
                }
                className="border border-red-400/25 bg-red-500/5 py-3 text-[8px] uppercase tracking-[0.2em] text-red-300"
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