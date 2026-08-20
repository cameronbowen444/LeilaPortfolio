"use client";

import {
  FormEvent,
  useState,
} from "react";

import { useRouter } from "next/navigation";

import {
  FiAlertCircle,
  FiCheck,
  FiCheckCircle,
  FiLoader,
  FiPlus,
  FiTrash2,
} from "react-icons/fi";

type ExperienceFormProps = {
  initialData?: {
    id?: string;
    company: string;
    role: string;
    location: string;
    period: string;
    description: string;
    highlights: string[];
    current: boolean;
    sortOrder: number;
  };
};

type FieldErrors = {
  company?: string;
  role?: string;
  location?: string;
  period?: string;
  description?: string;
  highlights?: string;
  current?: string;
  general?: string;
};

type Placement = "top" | "bottom";

export default function ExperienceForm({
  initialData,
}: ExperienceFormProps) {
  const router = useRouter();

  const editing = Boolean(initialData?.id);

  /* =====================================
     FORM STATE
  ===================================== */

  const [company, setCompany] = useState(
    initialData?.company ?? ""
  );

  const [role, setRole] = useState(
    initialData?.role ?? ""
  );

  const [location, setLocation] = useState(
    initialData?.location ?? ""
  );

  const [period, setPeriod] = useState(
    initialData?.period ?? ""
  );

  const [description, setDescription] = useState(
    initialData?.description ?? ""
  );

  const [current, setCurrent] = useState(
    initialData?.current ?? false
  );

  /*
   * Only exposed choice:
   * top or bottom.
   *
   * The API will calculate the actual sortOrder.
   */
  const [placement, setPlacement] =
    useState<Placement>("bottom");

  const [highlights, setHighlights] = useState<string[]>(
    initialData?.highlights?.length
      ? initialData.highlights
      : [""]
  );

  const [saving, setSaving] = useState(false);

  const [errors, setErrors] =
    useState<FieldErrors>({});

  const [success, setSuccess] = useState("");

  /* =====================================
     ERROR HELPERS
  ===================================== */

  function clearError(field: keyof FieldErrors) {
    setErrors((previous) => ({
      ...previous,
      [field]: undefined,
      general: undefined,
    }));
  }

  /* =====================================
     HIGHLIGHTS
  ===================================== */

  function updateHighlight(
    index: number,
    value: string
  ) {
    const next = [...highlights];

    next[index] = value;

    setHighlights(next);

    clearError("highlights");
  }

  function addHighlight() {
    if (highlights.length >= 6) {
      setErrors((previous) => ({
        ...previous,
        highlights:
          "You can add up to 6 highlights.",
      }));

      return;
    }

    setHighlights([
      ...highlights,
      "",
    ]);
  }

  function removeHighlight(index: number) {
    if (highlights.length === 1) {
      return;
    }

    setHighlights(
      highlights.filter(
        (_, highlightIndex) =>
          highlightIndex !== index
      )
    );

    clearError("highlights");
  }

  /* =====================================
     VALIDATION
  ===================================== */

  function validateClient() {
    const nextErrors: FieldErrors = {};

    if (company.trim().length < 2) {
      nextErrors.company =
        "Enter the company or organization name.";
    }

    if (role.trim().length < 2) {
      nextErrors.role =
        "Enter the job title or role.";
    }

    if (period.trim().length < 4) {
      nextErrors.period =
        'Enter a period such as "2025 — Present".';
    }

    if (description.trim().length < 20) {
      nextErrors.description =
        "Add a little more detail — at least 20 characters.";
    }

    if (description.trim().length > 1000) {
      nextErrors.description =
        "Description cannot exceed 1000 characters.";
    }

    const validHighlights = highlights
      .map((highlight) => highlight.trim())
      .filter(Boolean);

    if (validHighlights.length === 0) {
      nextErrors.highlights =
        "Add at least one highlight.";
    }

    if (
      validHighlights.some(
        (highlight) => highlight.length < 2
      )
    ) {
      nextErrors.highlights =
        "Each highlight should be at least 2 characters.";
    }

    if (
      validHighlights.some(
        (highlight) => highlight.length > 80
      )
    ) {
      nextErrors.highlights =
        "Highlights cannot exceed 80 characters.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  }

  /* =====================================
     SUBMIT
  ===================================== */

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (saving) return;

    setSuccess("");

    const valid = validateClient();

    if (!valid) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      return;
    }

    setSaving(true);
    setErrors({});

    const endpoint = initialData?.id
      ? `/api/admin/experience/${initialData.id}`
      : "/api/admin/experience";

    const method = initialData?.id
      ? "PUT"
      : "POST";

    try {
      const response = await fetch(endpoint, {
        method,

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          company: company.trim(),
          role: role.trim(),
          location: location.trim(),
          period: period.trim(),
          description: description.trim(),
          current,

          /*
           * API decides the numeric sortOrder.
           */
          placement,

          highlights: highlights
            .map((highlight) =>
              highlight.trim()
            )
            .filter(Boolean),
        }),
      });

      const contentType =
        response.headers.get("content-type");

      let data: any = null;

      if (
        contentType?.includes(
          "application/json"
        )
      ) {
        data = await response.json();
      } else {
        const text = await response.text();

        console.error(
          "SERVER RETURNED NON-JSON RESPONSE:",
          {
            status: response.status,
            statusText: response.statusText,
            url: response.url,
            body: text.slice(0, 500),
          }
        );

        setErrors({
          general:
            `Server returned ${response.status} ${response.statusText}. ` +
            "Check that the experience API route exists.",
        });

        return;
      }

      if (!response.ok) {
        console.error(
          "EXPERIENCE API ERROR:",
          data
        );

        if (
          data?.errors &&
          typeof data.errors === "object"
        ) {
          setErrors({
            ...data.errors,

            general:
              data.error ||
              "Please correct the fields below.",
          });
        } else {
          setErrors({
            general:
              data?.details ||
              data?.error ||
              `Request failed with status ${response.status}.`,
          });
        }

        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });

        return;
      }

      setSuccess(
        editing
          ? "Experience updated successfully."
          : "Experience added successfully."
      );

      window.setTimeout(() => {
        router.push("/admin/experience");
        router.refresh();
      }, 650);
    } catch (error) {
      console.error(
        "EXPERIENCE FORM ERROR:",
        error
      );

      setErrors({
        general:
          "Could not contact the server. Please try again.",
      });
    } finally {
      setSaving(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-6"
    >
      {/* =====================================
          GENERAL ERROR
      ===================================== */}

      {errors.general && (
        <div className="flex items-start gap-3 border border-red-500/25 bg-red-500/[0.06] px-4 py-4">
          <FiAlertCircle className="mt-0.5 shrink-0 text-lg text-red-400" />

          <div>
            <p className="text-[14px] font-medium text-red-300">
              We couldn&apos;t save this experience.
            </p>

            <p className="mt-1 text-[12px] leading-5 text-red-300/65">
              {errors.general}
            </p>
          </div>
        </div>
      )}

      {/* =====================================
          SUCCESS
      ===================================== */}

      {success && (
        <div className="flex items-center gap-3 border border-green-500/25 bg-green-500/[0.06] px-4 py-4">
          <FiCheckCircle className="shrink-0 text-lg text-green-400" />

          <div>
            <p className="text-[14px] font-medium text-green-300">
              {success}
            </p>

            <p className="mt-1 text-[11px] text-green-300/50">
              Returning to Experience...
            </p>
          </div>
        </div>
      )}

      {/* =====================================
          BASIC INFORMATION
      ===================================== */}

      <FormSection
        title="Basic Information"
        description="The main details shown on the experience card."
      >
        <div className="grid gap-5 md:grid-cols-2">
          <Field
            label="Company"
            required
            disabled={saving}
            value={company}
            error={errors.company}
            placeholder="Sony Pictures Entertainment"
            help="Company, studio, organization, or client."
            onChange={(value) => {
              setCompany(value);
              clearError("company");
            }}
          />

          <Field
            label="Role"
            required
            disabled={saving}
            value={role}
            error={errors.role}
            placeholder="Graphic Designer"
            help="Job title or professional role."
            onChange={(value) => {
              setRole(value);
              clearError("role");
            }}
          />

          <Field
            label="Location"
            disabled={saving}
            value={location}
            error={errors.location}
            placeholder="Los Angeles, CA"
            help="Optional."
            onChange={(value) => {
              setLocation(value);
              clearError("location");
            }}
          />

          <Field
            label="Period"
            required
            disabled={saving}
            value={period}
            error={errors.period}
            placeholder="2025 — Present"
            help='Example: "2023 — 2025" or "2025 — Present".'
            onChange={(value) => {
              setPeriod(value);
              clearError("period");
            }}
          />
        </div>
      </FormSection>

      {/* =====================================
          DESCRIPTION
      ===================================== */}

      <FormSection
        title="Description"
        description="A concise summary of the work completed in this role."
      >
        <div>
          <div className="mb-2 flex items-center justify-between gap-4">
            <label
              htmlFor="description"
              className="text-[9px] uppercase tracking-[0.26em] text-[#D4AF37]"
            >
              Role Description

              <span className="ml-1 text-red-400">
                *
              </span>
            </label>

            <span
              className={`text-[9px] ${
                description.length >= 950
                  ? "text-red-400"
                  : "text-[#F4EFE6]/25"
              }`}
            >
              {description.length}/1000
            </span>
          </div>

          <textarea
            id="description"
            disabled={saving}
            value={description}
            onChange={(event) => {
              setDescription(
                event.target.value
              );

              clearError("description");
            }}
            rows={5}
            maxLength={1000}
            placeholder="Creating entertainment-focused design work across theatrical campaigns, key art, and promotional materials..."
            className={`w-full resize-none border bg-[#121212] px-4 py-3.5 text-[14px] leading-6 text-[#F4EFE6]/80 outline-none transition placeholder:text-[#F4EFE6]/18 disabled:cursor-not-allowed disabled:opacity-50 ${
              errors.description
                ? "border-red-500/60"
                : "border-[#D4AF37]/15 focus:border-[#D4AF37]/45"
            }`}
          />

          {errors.description ? (
            <ErrorMessage>
              {errors.description}
            </ErrorMessage>
          ) : (
            <HelpText>
              One or two concise sentences works best.
            </HelpText>
          )}
        </div>
      </FormSection>

      {/* =====================================
          HIGHLIGHTS
      ===================================== */}

      <FormSection
        title="Highlights"
        description="Short areas of expertise or responsibilities shown with this role."
      >
        <div className="space-y-3">
          {highlights.map(
            (highlight, index) => (
              <div
                key={index}
                className="flex items-center gap-2.5"
              >
                <div className="flex h-11 w-9 shrink-0 items-center justify-center border border-[#D4AF37]/10 bg-[#121212] font-serif text-[11px] text-[#D4AF37]/55">
                  {String(
                    index + 1
                  ).padStart(2, "0")}
                </div>

                <input
                  disabled={saving}
                  value={highlight}
                  maxLength={80}
                  onChange={(event) =>
                    updateHighlight(
                      index,
                      event.target.value
                    )
                  }
                  placeholder={
                    index === 0
                      ? "Key Art Development"
                      : index === 1
                        ? "Campaign Adaptations"
                        : "Entertainment Marketing"
                  }
                  className={`h-11 min-w-0 flex-1 border bg-[#121212] px-4 text-[14px] text-[#F4EFE6]/80 outline-none transition placeholder:text-[#F4EFE6]/18 disabled:cursor-not-allowed disabled:opacity-50 ${
                    errors.highlights
                      ? "border-red-500/40"
                      : "border-[#D4AF37]/15 focus:border-[#D4AF37]/45"
                  }`}
                />

                <button
                  type="button"
                  disabled={
                    saving ||
                    highlights.length === 1
                  }
                  onClick={() =>
                    removeHighlight(index)
                  }
                  title="Remove highlight"
                  className="flex h-11 w-11 shrink-0 items-center justify-center border border-[#7E2A5A]/20 text-[#F4EFE6]/30 transition hover:border-[#7E2A5A]/50 hover:bg-[#7E2A5A]/5 hover:text-[#A64A79] disabled:cursor-not-allowed disabled:opacity-20"
                >
                  <FiTrash2 />
                </button>
              </div>
            )
          )}
        </div>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            {errors.highlights ? (
              <ErrorMessage>
                {errors.highlights}
              </ErrorMessage>
            ) : (
              <HelpText>
                Add between 1 and 6. Keep each one short.
              </HelpText>
            )}
          </div>

          <button
            type="button"
            disabled={
              saving ||
              highlights.length >= 6
            }
            onClick={addHighlight}
            className="flex w-fit items-center gap-2 text-[9px] uppercase tracking-[0.2em] text-[#D4AF37] transition hover:text-[#F4EFE6] disabled:cursor-not-allowed disabled:opacity-25"
          >
            <FiPlus />

            Add Highlight
          </button>
        </div>
      </FormSection>

      {/* =====================================
          DISPLAY SETTINGS
      ===================================== */}

      <FormSection
        title="Display Settings"
        description="Choose where the role appears and whether it is a current position."
      >
        <div className="grid gap-5 md:grid-cols-2">
          {/* =====================================
              PLACEMENT
          ===================================== */}

          <div>
            <p className="mb-2 text-[9px] uppercase tracking-[0.26em] text-[#D4AF37]">
              Placement
            </p>

            <div className="grid grid-cols-2 gap-2">
              <PlacementButton
                label="Top"
                description="Show first"
                active={
                  placement === "top"
                }
                disabled={saving}
                onClick={() =>
                  setPlacement("top")
                }
              />

              <PlacementButton
                label="Bottom"
                description="Show last"
                active={
                  placement === "bottom"
                }
                disabled={saving}
                onClick={() =>
                  setPlacement("bottom")
                }
              />
            </div>

            <HelpText>
              Choose whether this experience appears at the top or bottom of the list.
            </HelpText>
          </div>

          {/* =====================================
              CURRENT POSITION
          ===================================== */}

          <div>
            <p className="mb-2 text-[9px] uppercase tracking-[0.26em] text-[#D4AF37]">
              Position Status
            </p>

            <button
              type="button"
              disabled={saving}
              onClick={() =>
                setCurrent(
                  (previous) =>
                    !previous
                )
              }
              className={`flex h-[58px] w-full items-center justify-between border px-4 text-left transition disabled:cursor-not-allowed disabled:opacity-50 ${
                current
                  ? "border-[#D4AF37]/40 bg-[#D4AF37]/[0.05]"
                  : "border-[#D4AF37]/15 bg-[#121212] hover:border-[#D4AF37]/25"
              }`}
            >
              <div>
                <p className="text-[13px] text-[#F4EFE6]/75">
                  Current Position
                </p>

                <p className="mt-1 text-[10px] text-[#F4EFE6]/28">
                  {current
                    ? "Currently working in this role"
                    : "Past position"}
                </p>
              </div>

              <div
                className={`relative h-5 w-9 shrink-0 rounded-full transition ${
                  current
                    ? "bg-[#D4AF37]"
                    : "bg-[#F4EFE6]/10"
                }`}
              >
                <span
                  className={`absolute top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full bg-[#121212] transition-all duration-200 ${
                    current
                      ? "left-[18px]"
                      : "left-[3px]"
                  }`}
                />
              </div>
            </button>

            <HelpText>
              Turn this on if Leila currently works in this role.
            </HelpText>
          </div>
        </div>
      </FormSection>

      {/* =====================================
          SAVE
      ===================================== */}

      <div className="border-t border-[#D4AF37]/10 pt-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[10px] leading-5 text-[#F4EFE6]/25">
            {editing
              ? "Save changes to update the live experience section."
              : "The new experience will appear on the portfolio after saving."}
          </p>

          <button
            type="submit"
            disabled={saving}
            className="group relative flex min-h-[46px] w-full items-center justify-center gap-3 overflow-hidden border border-[#D4AF37]/40 bg-[#5B1E3A]/15 px-7 transition disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-[205px]"
          >
            {!saving && (
              <span className="absolute inset-0 origin-left scale-x-0 bg-[#D4AF37] transition-transform duration-300 group-hover:scale-x-100" />
            )}

            {saving ? (
              <>
                <FiLoader className="relative animate-spin text-[15px] text-[#D4AF37]" />

                <span className="relative text-[9px] uppercase tracking-[0.26em] text-[#D4AF37]">
                  Saving...
                </span>
              </>
            ) : (
              <>
                <FiCheck className="relative text-[14px] text-[#D4AF37] transition-colors group-hover:text-[#121212]" />

                <span className="relative text-[9px] uppercase tracking-[0.26em] text-[#D4AF37] transition-colors group-hover:text-[#121212]">
                  {editing
                    ? "Update Experience"
                    : "Save Experience"}
                </span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* =====================================
          SAVING OVERLAY
      ===================================== */}

      {saving && (
        <div className="pointer-events-none fixed inset-0 z-[100] flex items-center justify-center bg-[#0B0B0B]/30 backdrop-blur-[2px]">
          <div className="flex items-center gap-4 border border-[#D4AF37]/20 bg-[#111111] px-6 py-4 shadow-[0_20px_70px_rgba(0,0,0,0.45)]">
            <FiLoader className="animate-spin text-xl text-[#D4AF37]" />

            <div>
              <p className="font-serif text-[17px] text-[#F4EFE6]">
                {editing
                  ? "Updating Experience"
                  : "Saving Experience"}
              </p>

              <p className="mt-1 text-[9px] uppercase tracking-[0.2em] text-[#F4EFE6]/30">
                Please wait
              </p>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}

/* =====================================
   FORM SECTION
===================================== */

function FormSection({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-b border-[#D4AF37]/10 pb-7">
      <div className="mb-5">
        <h2 className="font-serif text-[22px] text-[#F4EFE6]">
          {title}
        </h2>

        <p className="mt-1.5 text-[13px] leading-5 text-[#F4EFE6]/35">
          {description}
        </p>
      </div>

      {children}
    </section>
  );
}

/* =====================================
   TEXT FIELD
===================================== */

function Field({
  label,
  value,
  onChange,
  placeholder,
  help,
  error,
  required = false,
  disabled = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  help?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
}) {
  const id = label
    .toLowerCase()
    .replace(/\s+/g, "-");

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-[9px] uppercase tracking-[0.26em] text-[#D4AF37]"
      >
        {label}

        {required && (
          <span className="ml-1 text-red-400">
            *
          </span>
        )}
      </label>

      <input
        id={id}
        disabled={disabled}
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder={placeholder}
        className={`h-11 w-full border bg-[#121212] px-4 text-[14px] text-[#F4EFE6]/80 outline-none transition placeholder:text-[#F4EFE6]/18 disabled:cursor-not-allowed disabled:opacity-50 ${
          error
            ? "border-red-500/60"
            : "border-[#D4AF37]/15 focus:border-[#D4AF37]/45"
        }`}
      />

      {error ? (
        <ErrorMessage>
          {error}
        </ErrorMessage>
      ) : help ? (
        <HelpText>
          {help}
        </HelpText>
      ) : null}
    </div>
  );
}

/* =====================================
   PLACEMENT BUTTON
===================================== */

function PlacementButton({
  label,
  description,
  active,
  disabled,
  onClick,
}: {
  label: string;
  description: string;
  active: boolean;
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`relative flex min-h-[58px] items-center justify-between border px-4 text-left transition disabled:cursor-not-allowed disabled:opacity-50 ${
        active
          ? "border-[#D4AF37]/45 bg-[#D4AF37]/[0.06]"
          : "border-[#D4AF37]/15 bg-[#121212] hover:border-[#D4AF37]/30"
      }`}
    >
      <div>
        <p
          className={`font-serif text-[16px] transition ${
            active
              ? "text-[#F4EFE6]"
              : "text-[#F4EFE6]/55"
          }`}
        >
          {label}
        </p>

        <p className="mt-0.5 text-[9px] uppercase tracking-[0.15em] text-[#F4EFE6]/25">
          {description}
        </p>
      </div>

      <div
        className={`flex h-5 w-5 items-center justify-center border transition ${
          active
            ? "border-[#D4AF37] bg-[#D4AF37] text-[#121212]"
            : "border-[#F4EFE6]/15 text-transparent"
        }`}
      >
        <FiCheck className="text-[12px]" />
      </div>
    </button>
  );
}

/* =====================================
   ERROR MESSAGE
===================================== */

function ErrorMessage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <p className="mt-2 flex items-center gap-1.5 text-[11px] leading-4 text-red-400">
      <FiAlertCircle className="shrink-0" />

      {children}
    </p>
  );
}

/* =====================================
   HELP TEXT
===================================== */

function HelpText({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <p className="mt-2 text-[10px] leading-4 text-[#F4EFE6]/27">
      {children}
    </p>
  );
}