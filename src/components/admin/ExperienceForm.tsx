"use client";

import {
  FormEvent,
  useState,
} from "react";

import { useRouter } from "next/navigation";

import {
  FiAlertCircle,
  FiCheckCircle,
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
  sortOrder?: string;
  general?: string;
};

const orderOptions = [
  { value: 0, label: "First" },
  { value: 1, label: "Second" },
  { value: 2, label: "Third" },
  { value: 3, label: "Fourth" },
  { value: 4, label: "Fifth" },
  { value: 5, label: "Sixth" },
];

export default function ExperienceForm({
  initialData,
}: ExperienceFormProps) {
  const router = useRouter();

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

  const [sortOrder, setSortOrder] = useState(
    initialData?.sortOrder ?? 0
  );

  const [highlights, setHighlights] = useState<string[]>(
    initialData?.highlights?.length
      ? initialData.highlights
      : [""]
  );

  const [saving, setSaving] = useState(false);

  const [errors, setErrors] =
    useState<FieldErrors>({});

  const [success, setSuccess] =
    useState("");

  function clearError(
    field: keyof FieldErrors
  ) {
    setErrors((previous) => ({
      ...previous,
      [field]: undefined,
      general: undefined,
    }));
  }

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

  function removeHighlight(
    index: number
  ) {
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

    if (
      description.trim().length < 20
    ) {
      nextErrors.description =
        "Add a more detailed description — at least 20 characters.";
    }

    if (
      description.trim().length > 1000
    ) {
      nextErrors.description =
        "Description cannot exceed 1000 characters.";
    }

    const validHighlights =
      highlights
        .map((highlight) =>
          highlight.trim()
        )
        .filter(Boolean);

    if (
      validHighlights.length === 0
    ) {
      nextErrors.highlights =
        "Add at least one highlight.";
    }

    if (
      validHighlights.some(
        (highlight) =>
          highlight.length < 2
      )
    ) {
      nextErrors.highlights =
        "Each highlight should be at least 2 characters.";
    }

    if (
      validHighlights.some(
        (highlight) =>
          highlight.length > 80
      )
    ) {
      nextErrors.highlights =
        "Highlights cannot exceed 80 characters.";
    }

    setErrors(nextErrors);

    return (
      Object.keys(nextErrors).length ===
      0
    );
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setSuccess("");

    const valid =
      validateClient();

    if (!valid) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      return;
    }

    setSaving(true);
    setErrors({});

    const endpoint =
      initialData?.id
        ? `/api/admin/experience/${initialData.id}`
        : "/api/admin/experience";

    const method =
      initialData?.id
        ? "PUT"
        : "POST";

    try {
      const response =
        await fetch(endpoint, {
          method,

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            company:
              company.trim(),

            role:
              role.trim(),

            location:
              location.trim(),

            period:
              period.trim(),

            description:
              description.trim(),

            current,

            sortOrder,

            highlights:
              highlights
                .map(
                  (highlight) =>
                    highlight.trim()
                )
                .filter(Boolean),
          }),
        });

      const contentType =
        response.headers.get(
          "content-type"
        );

      let data: any = null;

      if (
        contentType?.includes(
          "application/json"
        )
      ) {
        data =
          await response.json();
      } else {
        const text =
          await response.text();

        console.error(
          "SERVER RETURNED NON-JSON RESPONSE:",
          {
            status:
              response.status,

            statusText:
              response.statusText,

            url:
              response.url,

            body:
              text.slice(
                0,
                500
              ),
          }
        );

        setErrors({
          general:
            `Server returned ${response.status} ${response.statusText}. ` +
            "Check that the API route exists at /api/admin/experience.",
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
          typeof data.errors ===
            "object"
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

        return;
      }

      setSuccess(
        initialData?.id
          ? "Experience updated successfully."
          : "Experience added successfully."
      );

      setTimeout(() => {
        router.push(
          "/admin/experience"
        );

        router.refresh();
      }, 500);
    } catch (error) {
      console.error(
        "EXPERIENCE FORM ERROR:",
        error
      );

      setErrors({
        general:
          "Could not contact the server. Make sure both Next.js and the Prisma development database are running.",
      });
    } finally {
      setSaving(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-7"
    >
      {/* General Error */}
      {errors.general && (
        <div className="flex items-start gap-3 border border-red-500/25 bg-red-500/5 px-4 py-4">
          <FiAlertCircle className="mt-0.5 shrink-0 text-red-400" />

          <div>
            <p className="text-sm font-medium text-red-300">
              We couldn&apos;t save this experience.
            </p>

            <p className="mt-1 text-xs leading-5 text-red-300/70">
              {errors.general}
            </p>
          </div>
        </div>
      )}

      {/* Success */}
      {success && (
        <div className="flex items-start gap-3 border border-green-500/25 bg-green-500/5 px-4 py-4">
          <FiCheckCircle className="mt-0.5 shrink-0 text-green-400" />

          <p className="text-sm text-green-300">
            {success}
          </p>
        </div>
      )}

      {/* Basic Information */}
      <FormSection
        title="Basic Information"
        description="The main information displayed on the experience ticket."
      >
        <div className="grid gap-5 md:grid-cols-2">
          <Field
            label="Company"
            required
            value={company}
            error={
              errors.company
            }
            placeholder="Sony Pictures Entertainment"
            help="The company, studio, organization, or client."
            onChange={(value) => {
              setCompany(value);
              clearError(
                "company"
              );
            }}
          />

          <Field
            label="Role"
            required
            value={role}
            error={errors.role}
            placeholder="Graphic Designer"
            help="Her job title or professional role."
            onChange={(value) => {
              setRole(value);
              clearError("role");
            }}
          />

          <Field
            label="Location"
            value={location}
            error={
              errors.location
            }
            placeholder="Los Angeles, CA"
            help="Optional."
            onChange={(value) => {
              setLocation(value);
              clearError(
                "location"
              );
            }}
          />

          <Field
            label="Period"
            required
            value={period}
            error={errors.period}
            placeholder="2025 — Present"
            help='Example: "2023 — 2025" or "2025 — Present".'
            onChange={(value) => {
              setPeriod(value);
              clearError(
                "period"
              );
            }}
          />
        </div>
      </FormSection>

      {/* Description */}
      <FormSection
        title="Description"
        description="A short summary of what she worked on in this role."
      >
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label
              htmlFor="description"
              className="text-[8px] uppercase tracking-[0.28em] text-[#D4AF37]"
            >
              Role Description

              <span className="ml-1 text-red-400">
                *
              </span>
            </label>

            <span
              className={`text-[8px] ${
                description.length >
                1000
                  ? "text-red-400"
                  : "text-[#F4EFE6]/25"
              }`}
            >
              {
                description.length
              }
              /1000
            </span>
          </div>

          <textarea
            id="description"
            value={description}
            onChange={(
              event
            ) => {
              setDescription(
                event.target
                  .value
              );

              clearError(
                "description"
              );
            }}
            rows={5}
            maxLength={1000}
            placeholder="Creating entertainment-focused design work across theatrical campaigns, key art, and promotional materials..."
            className={`w-full resize-none border bg-[#121212] px-4 py-3 text-sm leading-6 outline-none transition ${
              errors.description
                ? "border-red-500/60"
                : "border-[#D4AF37]/15 focus:border-[#D4AF37]/45"
            }`}
          />

          {errors.description ? (
            <ErrorMessage>
              {
                errors.description
              }
            </ErrorMessage>
          ) : (
            <HelpText>
              Aim for one or two concise sentences.
            </HelpText>
          )}
        </div>
      </FormSection>

      {/* Highlights */}
      <FormSection
        title="Highlights"
        description="Short skills or responsibilities shown underneath the experience."
      >
        <div className="space-y-3">
          {highlights.map(
            (
              highlight,
              index
            ) => (
              <div
                key={index}
                className="flex items-center gap-2"
              >
                <div className="flex h-11 w-8 shrink-0 items-center justify-center border border-[#D4AF37]/10 bg-[#121212] text-[8px] text-[#F4EFE6]/30">
                  {index + 1}
                </div>

                <input
                  value={
                    highlight
                  }
                  maxLength={80}
                  onChange={(
                    event
                  ) =>
                    updateHighlight(
                      index,
                      event.target
                        .value
                    )
                  }
                  placeholder={
                    index === 0
                      ? "Key Art Development"
                      : index ===
                          1
                        ? "Campaign Adaptations"
                        : "Entertainment Marketing"
                  }
                  className={`h-11 flex-1 border bg-[#121212] px-4 text-sm outline-none transition ${
                    errors.highlights
                      ? "border-red-500/40"
                      : "border-[#D4AF37]/15 focus:border-[#D4AF37]/45"
                  }`}
                />

                <button
                  type="button"
                  disabled={
                    highlights.length ===
                    1
                  }
                  onClick={() =>
                    removeHighlight(
                      index
                    )
                  }
                  title="Remove highlight"
                  className="flex h-11 w-11 items-center justify-center border border-[#7E2A5A]/20 text-[#F4EFE6]/30 transition hover:border-[#7E2A5A]/50 hover:text-[#7E2A5A] disabled:cursor-not-allowed disabled:opacity-20"
                >
                  <FiTrash2 />
                </button>
              </div>
            )
          )}
        </div>

        <div className="mt-3 flex items-center justify-between">
          <div>
            {errors.highlights ? (
              <ErrorMessage>
                {
                  errors.highlights
                }
              </ErrorMessage>
            ) : (
              <HelpText>
                1–6 highlights. Keep them short.
              </HelpText>
            )}
          </div>

          <button
            type="button"
            disabled={
              highlights.length >=
              6
            }
            onClick={
              addHighlight
            }
            className="flex items-center gap-2 text-[7px] uppercase tracking-[0.2em] text-[#D4AF37] transition hover:text-[#F4EFE6] disabled:cursor-not-allowed disabled:opacity-25"
          >
            <FiPlus />

            Add Highlight
          </button>
        </div>
      </FormSection>

      {/* Display Settings */}
      <FormSection
        title="Display Settings"
        description="Controls where this experience appears and whether it is a current role."
      >
        <div className="grid gap-5 md:grid-cols-2">
          {/* Display Order */}
          <div>
            <label
              htmlFor="sortOrder"
              className="mb-2 block text-[8px] uppercase tracking-[0.28em] text-[#D4AF37]"
            >
              Display Order
            </label>

            <select
              id="sortOrder"
              value={sortOrder}
              onChange={(
                event
              ) => {
                setSortOrder(
                  Number(
                    event.target
                      .value
                  )
                );

                clearError(
                  "sortOrder"
                );
              }}
              className="h-11 w-full cursor-pointer border border-[#D4AF37]/15 bg-[#121212] px-4 text-sm text-[#F4EFE6] outline-none transition focus:border-[#D4AF37]/45"
            >
              {orderOptions.map(
                (option) => (
                  <option
                    key={
                      option.value
                    }
                    value={
                      option.value
                    }
                  >
                    {
                      option.label
                    }
                  </option>
                )
              )}
            </select>

            <HelpText>
              First appears at the top of the Experience section.
            </HelpText>
          </div>

          {/* Current */}
          <div>
            <p className="mb-2 text-[8px] uppercase tracking-[0.28em] text-[#D4AF37]">
              Position Status
            </p>

            <button
              type="button"
              onClick={() =>
                setCurrent(
                  (
                    previous
                  ) => !previous
                )
              }
              className={`flex h-11 w-full items-center justify-between border px-4 text-left transition ${
                current
                  ? "border-[#D4AF37]/45 bg-[#D4AF37]/5"
                  : "border-[#D4AF37]/15 bg-[#121212]"
              }`}
            >
              <div>
                <p className="text-xs text-[#F4EFE6]/70">
                  Current Position
                </p>
              </div>

              <div
                className={`relative h-5 w-9 rounded-full transition ${
                  current
                    ? "bg-[#D4AF37]"
                    : "bg-[#F4EFE6]/10"
                }`}
              >
                <span
                  className={`absolute top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full bg-[#121212] transition ${
                    current
                      ? "left-[18px]"
                      : "left-[3px]"
                  }`}
                />
              </div>
            </button>

            <HelpText>
              Turn this on if she currently works in this role.
            </HelpText>
          </div>
        </div>
      </FormSection>

      {/* Save */}
      <div className="border-t border-[#D4AF37]/10 pt-6">
        <button
          type="submit"
          disabled={saving}
          className="group relative flex w-full items-center justify-center overflow-hidden border border-[#D4AF37]/40 bg-[#5B1E3A]/20 px-5 py-4 transition disabled:cursor-not-allowed disabled:opacity-50"
        >
          <span className="absolute inset-0 translate-y-full bg-[#D4AF37] transition-transform duration-300 group-hover:translate-y-0" />

          <span className="relative text-[8px] uppercase tracking-[0.3em] text-[#D4AF37] transition group-hover:text-[#121212]">
            {saving
              ? "Saving Experience..."
              : initialData?.id
                ? "Update Experience"
                : "Save Experience"}
          </span>
        </button>
      </div>
    </form>
  );
}

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
        <h2 className="font-serif text-xl text-[#F4EFE6]">
          {title}
        </h2>

        <p className="mt-1 text-xs leading-5 text-[#F4EFE6]/35">
          {description}
        </p>
      </div>

      {children}
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  help,
  error,
  required = false,
}: {
  label: string;
  value: string;
  onChange: (
    value: string
  ) => void;
  placeholder: string;
  help?: string;
  error?: string;
  required?: boolean;
}) {
  const id = label
    .toLowerCase()
    .replace(/\s+/g, "-");

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-[8px] uppercase tracking-[0.28em] text-[#D4AF37]"
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
        value={value}
        onChange={(
          event
        ) =>
          onChange(
            event.target.value
          )
        }
        placeholder={placeholder}
        className={`h-11 w-full border bg-[#121212] px-4 text-sm outline-none transition ${
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

function ErrorMessage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <p className="mt-2 flex items-center gap-1.5 text-[10px] leading-4 text-red-400">
      <FiAlertCircle className="shrink-0" />

      {children}
    </p>
  );
}

function HelpText({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <p className="mt-2 text-[9px] leading-4 text-[#F4EFE6]/25">
      {children}
    </p>
  );
}