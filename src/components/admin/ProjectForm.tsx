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

type ProjectCategory =
  | "PRODUCTION"
  | "USU_MARKETING"
  | "PERSONAL"
  | "MOTION_GRAPHICS";

type ProjectFormProps = {
  initialData?: {
    id?: string;
    title: string;
    category: ProjectCategory;
    year: string;
    description: string;
    coverImage: string;
    oneSheets: string[];
    outdoor: string[];
    international: string[];
    gallery: string[];
    sortOrder: number;
    published: boolean;
  };
};

type FieldErrors = {
  title?: string;
  category?: string;
  year?: string;
  description?: string;
  coverImage?: string;
  oneSheets?: string;
  outdoor?: string;
  international?: string;
  gallery?: string;
  sortOrder?: string;
  published?: string;
  general?: string;
};

const categoryOptions = [
  {
    value: "PRODUCTION",
    label: "Production",
  },
  {
    value: "USU_MARKETING",
    label: "USU Marketing",
  },
  {
    value: "PERSONAL",
    label: "Personal",
  },
  {
    value: "MOTION_GRAPHICS",
    label: "Motion Graphics",
  },
] as const;

const orderOptions = Array.from(
  { length: 12 },
  (_, index) => ({
    value: index,
    label:
      index === 0
        ? "First"
        : index === 1
        ? "Second"
        : index === 2
        ? "Third"
        : index === 3
        ? "Fourth"
        : index === 4
        ? "Fifth"
        : index === 5
        ? "Sixth"
        : index === 6
        ? "Seventh"
        : index === 7
        ? "Eighth"
        : index === 8
        ? "Ninth"
        : index === 9
        ? "Tenth"
        : `Position ${index + 1}`,
  })
);

export default function ProjectForm({
  initialData,
}: ProjectFormProps) {
  const router = useRouter();

  const [title, setTitle] = useState(
    initialData?.title ?? ""
  );

  const [category, setCategory] =
    useState<ProjectCategory>(
      initialData?.category ??
        "PRODUCTION"
    );

  const [year, setYear] = useState(
    initialData?.year ?? ""
  );

  const [description, setDescription] =
    useState(
      initialData?.description ?? ""
    );

  const [coverImage, setCoverImage] =
    useState(
      initialData?.coverImage ?? ""
    );

  const [oneSheets, setOneSheets] =
    useState<string[]>(
      initialData?.oneSheets?.length
        ? initialData.oneSheets
        : [""]
    );

  const [outdoor, setOutdoor] =
    useState<string[]>(
      initialData?.outdoor?.length
        ? initialData.outdoor
        : [""]
    );

  const [
    international,
    setInternational,
  ] = useState<string[]>(
    initialData?.international?.length
      ? initialData.international
      : [""]
  );

  const [gallery, setGallery] =
    useState<string[]>(
      initialData?.gallery?.length
        ? initialData.gallery
        : [""]
    );

  const [sortOrder, setSortOrder] =
    useState(
      initialData?.sortOrder ?? 0
    );

  const [published, setPublished] =
    useState(
      initialData?.published ?? true
    );

  const [saving, setSaving] =
    useState(false);

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

  function cleanArray(
    values: string[]
  ) {
    return values
      .map((value) => value.trim())
      .filter(Boolean);
  }

  function updateArrayItem(
    setter: React.Dispatch<
      React.SetStateAction<string[]>
    >,
    values: string[],
    index: number,
    value: string,
    errorField: keyof FieldErrors
  ) {
    const next = [...values];

    next[index] = value;

    setter(next);

    clearError(errorField);
  }

  function addArrayItem(
    setter: React.Dispatch<
      React.SetStateAction<string[]>
    >,
    values: string[]
  ) {
    setter([
      ...values,
      "",
    ]);
  }

  function removeArrayItem(
    setter: React.Dispatch<
      React.SetStateAction<string[]>
    >,
    values: string[],
    index: number
  ) {
    if (values.length === 1) {
      setter([""]);
      return;
    }

    setter(
      values.filter(
        (_, itemIndex) =>
          itemIndex !== index
      )
    );
  }

  function validateClient() {
    const nextErrors: FieldErrors = {};

    if (title.trim().length < 2) {
      nextErrors.title =
        "Enter a project title.";
    }

    if (!category) {
      nextErrors.category =
        "Choose a project category.";
    }

    if (
      description.trim().length < 20
    ) {
      nextErrors.description =
        "Add at least 20 characters describing the project.";
    }

    if (
      description.trim().length > 1500
    ) {
      nextErrors.description =
        "Description cannot exceed 1500 characters.";
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

    if (!validateClient()) {
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
        ? `/api/admin/projects/${initialData.id}`
        : "/api/admin/projects";

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
            title:
              title.trim(),

            category,

            year:
              year.trim(),

            description:
              description.trim(),

            coverImage:
              coverImage.trim(),

            oneSheets:
              cleanArray(
                oneSheets
              ),

            outdoor:
              cleanArray(
                outdoor
              ),

            international:
              cleanArray(
                international
              ),

            gallery:
              cleanArray(
                gallery
              ),

            sortOrder,

            published,
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
          "PROJECT SERVER RETURNED NON-JSON:",
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
            "Check that /api/admin/projects exists.",
        });

        return;
      }

      if (!response.ok) {
        console.error(
          "PROJECT API ERROR:",
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
              "The project could not be saved.",
          });
        }

        return;
      }

      setSuccess(
        initialData?.id
          ? "Project updated successfully."
          : "Project added successfully."
      );

      setTimeout(() => {
        router.push(
          "/admin/projects"
        );

        router.refresh();
      }, 450);
    } catch (error) {
      console.error(
        "PROJECT FORM ERROR:",
        error
      );

      setErrors({
        general:
          "Could not contact the server. Make sure Next.js and Prisma are running.",
      });
    } finally {
      setSaving(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-8"
    >
      {/* GENERAL ERROR */}

      {errors.general && (
        <div className="flex items-start gap-3 border border-red-500/25 bg-red-500/5 px-4 py-4">
          <FiAlertCircle className="mt-0.5 shrink-0 text-red-400" />

          <div>
            <p className="text-sm font-medium text-red-300">
              We couldn&apos;t save this project.
            </p>

            <p className="mt-1 text-xs leading-5 text-red-300/70">
              {errors.general}
            </p>
          </div>
        </div>
      )}

      {success && (
        <div className="flex items-center gap-3 border border-green-500/25 bg-green-500/5 px-4 py-4 text-sm text-green-300">
          <FiCheckCircle />

          {success}
        </div>
      )}

      {/* BASIC */}

      <FormSection
        title="Project Information"
        description="The primary information shown throughout the portfolio."
      >
        <div className="grid gap-5 md:grid-cols-2">
          <Field
            label="Project Title"
            required
            value={title}
            placeholder="Spider-Man Campaign"
            error={errors.title}
            help="Use the movie, campaign, or project name."
            onChange={(value) => {
              setTitle(value);
              clearError("title");
            }}
          />

          <div>
            <Label required>
              Category
            </Label>

            <select
              value={category}
              onChange={(event) => {
                setCategory(
                  event.target
                    .value as ProjectCategory
                );

                clearError(
                  "category"
                );
              }}
              className="h-11 w-full border border-[#D4AF37]/15 bg-[#121212] px-4 text-sm text-[#F4EFE6] outline-none focus:border-[#D4AF37]/45"
            >
              {categoryOptions.map(
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
              Determines which Projects tab this appears under.
            </HelpText>
          </div>

          <Field
            label="Year"
            value={year}
            placeholder="2026"
            help="Optional."
            onChange={(value) => {
              setYear(value);
              clearError("year");
            }}
          />

          {/* Order */}
          <div>
            <Label>
              Display Order
            </Label>

            <select
              value={sortOrder}
              onChange={(event) =>
                setSortOrder(
                  Number(
                    event.target
                      .value
                  )
                )
              }
              className="h-11 w-full border border-[#D4AF37]/15 bg-[#121212] px-4 text-sm text-[#F4EFE6] outline-none focus:border-[#D4AF37]/45"
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
              Controls its order within the selected category.
            </HelpText>
          </div>
        </div>
      </FormSection>

      {/* DESCRIPTION */}

      <FormSection
        title="Description"
        description="Explain the project and the creative work involved."
      >
        <div>
          <div className="mb-2 flex items-center justify-between">
            <Label required>
              Project Description
            </Label>

            <span className="text-[8px] text-[#F4EFE6]/25">
              {description.length}/1500
            </span>
          </div>

          <textarea
            value={description}
            maxLength={1500}
            rows={6}
            placeholder="Describe the campaign, creative direction, deliverables, or design approach..."
            onChange={(event) => {
              setDescription(
                event.target.value
              );

              clearError(
                "description"
              );
            }}
            className={`w-full resize-none border bg-[#121212] px-4 py-3 text-sm leading-6 outline-none ${
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
              One short paragraph works best.
            </HelpText>
          )}
        </div>
      </FormSection>

      {/* COVER */}

      <FormSection
        title="Cover Artwork"
        description="This is the main image displayed in the project grid."
      >
        <Field
          label="Cover Image"
          value={coverImage}
          placeholder="/projects/spider-man-cover.webp"
          help="Temporary URL/path field. We will replace this with image uploading next."
          onChange={(value) => {
            setCoverImage(value);
            clearError(
              "coverImage"
            );
          }}
        />

        {coverImage && (
          <div className="mt-4 max-w-[250px] overflow-hidden border border-[#D4AF37]/15">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={coverImage}
              alt="Project cover preview"
              className="aspect-[2/3] w-full object-cover"
            />
          </div>
        )}
      </FormSection>

      {/* DELIVERABLES */}

      <FormSection
        title="Campaign Deliverables"
        description="These appear as the categorized bullet points inside the project popup."
      >
        <div className="grid gap-6 lg:grid-cols-3">
          <DynamicList
            title="One Sheets"
            values={oneSheets}
            placeholder="Domestic one sheet"
            onChange={(
              index,
              value
            ) =>
              updateArrayItem(
                setOneSheets,
                oneSheets,
                index,
                value,
                "oneSheets"
              )
            }
            onAdd={() =>
              addArrayItem(
                setOneSheets,
                oneSheets
              )
            }
            onRemove={(index) =>
              removeArrayItem(
                setOneSheets,
                oneSheets,
                index
              )
            }
          />

          <DynamicList
            title="Outdoor"
            values={outdoor}
            placeholder="Billboard campaign"
            onChange={(
              index,
              value
            ) =>
              updateArrayItem(
                setOutdoor,
                outdoor,
                index,
                value,
                "outdoor"
              )
            }
            onAdd={() =>
              addArrayItem(
                setOutdoor,
                outdoor
              )
            }
            onRemove={(index) =>
              removeArrayItem(
                setOutdoor,
                outdoor,
                index
              )
            }
          />

          <DynamicList
            title="International"
            values={
              international
            }
            placeholder="International adaptation"
            onChange={(
              index,
              value
            ) =>
              updateArrayItem(
                setInternational,
                international,
                index,
                value,
                "international"
              )
            }
            onAdd={() =>
              addArrayItem(
                setInternational,
                international
              )
            }
            onRemove={(index) =>
              removeArrayItem(
                setInternational,
                international,
                index
              )
            }
          />
        </div>
      </FormSection>

      {/* GALLERY */}

      <FormSection
        title="Additional Artwork"
        description="Images displayed underneath the project information in the popup."
      >
        <DynamicList
          title="Gallery Images"
          values={gallery}
          placeholder="/projects/project-image-01.webp"
          onChange={(
            index,
            value
          ) =>
            updateArrayItem(
              setGallery,
              gallery,
              index,
              value,
              "gallery"
            )
          }
          onAdd={() =>
            addArrayItem(
              setGallery,
              gallery
            )
          }
          onRemove={(index) =>
            removeArrayItem(
              setGallery,
              gallery,
              index
            )
          }
        />

        {cleanArray(gallery).length >
          0 && (
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {cleanArray(
              gallery
            ).map(
              (
                image,
                index
              ) => (
                <div
                  key={`${image}-${index}`}
                  className="overflow-hidden border border-[#D4AF37]/10"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={image}
                    alt={`Gallery preview ${
                      index + 1
                    }`}
                    className="aspect-[4/5] w-full object-cover"
                  />
                </div>
              )
            )}
          </div>
        )}
      </FormSection>

      {/* STATUS */}

      <FormSection
        title="Publishing"
        description="Control whether this project is visible on the public portfolio."
      >
        <button
          type="button"
          onClick={() =>
            setPublished(
              (value) => !value
            )
          }
          className={`flex h-12 w-full items-center justify-between border px-4 transition ${
            published
              ? "border-[#D4AF37]/40 bg-[#D4AF37]/5"
              : "border-[#D4AF37]/15 bg-[#121212]"
          }`}
        >
          <div className="text-left">
            <p className="text-xs text-[#F4EFE6]/70">
              Published
            </p>

            <p className="mt-1 text-[8px] text-[#F4EFE6]/30">
              {published
                ? "Visible on portfolio"
                : "Hidden from portfolio"}
            </p>
          </div>

          <div
            className={`relative h-5 w-9 rounded-full ${
              published
                ? "bg-[#D4AF37]"
                : "bg-[#F4EFE6]/10"
            }`}
          >
            <span
              className={`absolute top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full bg-[#121212] transition ${
                published
                  ? "left-[18px]"
                  : "left-[3px]"
              }`}
            />
          </div>
        </button>
      </FormSection>

      {/* SAVE */}

      <button
        type="submit"
        disabled={saving}
        className="group relative flex w-full items-center justify-center overflow-hidden border border-[#D4AF37]/40 bg-[#5B1E3A]/20 px-5 py-4 disabled:opacity-50"
      >
        <span className="absolute inset-0 translate-y-full bg-[#D4AF37] transition-transform duration-300 group-hover:translate-y-0" />

        <span className="relative text-[8px] uppercase tracking-[0.3em] text-[#D4AF37] transition group-hover:text-[#121212]">
          {saving
            ? "Saving Project..."
            : initialData?.id
            ? "Update Project"
            : "Save Project"}
        </span>
      </button>
    </form>
  );
}

/* =====================================
   HELPERS
===================================== */

function DynamicList({
  title,
  values,
  placeholder,
  onChange,
  onAdd,
  onRemove,
}: {
  title: string;
  values: string[];
  placeholder: string;
  onChange: (
    index: number,
    value: string
  ) => void;
  onAdd: () => void;
  onRemove: (
    index: number
  ) => void;
}) {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <Label>{title}</Label>

        <button
          type="button"
          onClick={onAdd}
          className="flex items-center gap-1.5 text-[7px] uppercase tracking-[0.18em] text-[#D4AF37]"
        >
          <FiPlus />
          Add
        </button>
      </div>

      <div className="space-y-2">
        {values.map(
          (value, index) => (
            <div
              key={index}
              className="flex gap-2"
            >
              <input
                value={value}
                placeholder={placeholder}
                onChange={(event) =>
                  onChange(
                    index,
                    event.target
                      .value
                  )
                }
                className="h-10 min-w-0 flex-1 border border-[#D4AF37]/15 bg-[#121212] px-3 text-xs outline-none focus:border-[#D4AF37]/45"
              />

              <button
                type="button"
                onClick={() =>
                  onRemove(index)
                }
                className="flex h-10 w-10 items-center justify-center border border-[#7E2A5A]/20 text-[#F4EFE6]/30 hover:text-red-400"
              >
                <FiTrash2 />
              </button>
            </div>
          )
        )}
      </div>
    </div>
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
    <section className="border-b border-[#D4AF37]/10 pb-8">
      <div className="mb-5">
        <h2 className="font-serif text-xl">
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

function Label({
  children,
  required = false,
}: {
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label className="mb-2 block text-[8px] uppercase tracking-[0.28em] text-[#D4AF37]">
      {children}

      {required && (
        <span className="ml-1 text-red-400">
          *
        </span>
      )}
    </label>
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
  return (
    <div>
      <Label required={required}>
        {label}
      </Label>

      <input
        value={value}
        placeholder={placeholder}
        onChange={(event) =>
          onChange(
            event.target.value
          )
        }
        className={`h-11 w-full border bg-[#121212] px-4 text-sm outline-none ${
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
    <p className="mt-2 flex items-center gap-2 text-[10px] text-red-400">
      <FiAlertCircle />
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