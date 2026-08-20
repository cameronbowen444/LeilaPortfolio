"use client";

import {
  ChangeEvent,
  FormEvent,
  useRef,
  useState,
} from "react";

import { useRouter } from "next/navigation";
import { upload } from "@vercel/blob/client";

import {
  FiAlertCircle,
  FiCheck,
  FiCheckCircle,
  FiFilm,
  FiImage,
  FiLoader,
  FiPlus,
  FiTrash2,
  FiUploadCloud,
  FiVideo,
  FiX,
} from "react-icons/fi";

/* =====================================
   TYPES
===================================== */

type ProjectCategory =
  | "PRODUCTION"
  | "USU_MARKETING"
  | "PERSONAL"
  | "MOTION_GRAPHICS";

type Placement =
  | "top"
  | "bottom";

type UploadFolder =
  | "covers"
  | "gallery"
  | "motion"
  | "posters";

type ProjectFormProps = {
  initialData?: {
    id?: string;

    title: string;

    category: ProjectCategory;

    year: string | null;

    description: string;

    coverImage: string | null;

    previewVideo: string | null;

    videoPoster: string | null;

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

  previewVideo?: string;

  videoPoster?: string;

  oneSheets?: string;
  outdoor?: string;
  international?: string;

  gallery?: string;

  published?: string;

  general?: string;
};

/* =====================================
   OPTIONS
===================================== */

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

/* =====================================
   COMPONENT
===================================== */

export default function ProjectForm({
  initialData,
}: ProjectFormProps) {
  const router =
    useRouter();

  const editing =
    Boolean(initialData?.id);

  /* =====================================
     BASIC INFORMATION
  ===================================== */

  const [
    title,
    setTitle,
  ] =
    useState(
      initialData?.title ??
        ""
    );

  const [
    category,
    setCategory,
  ] =
    useState<ProjectCategory>(
      initialData?.category ??
        "PRODUCTION"
    );

  const [
    year,
    setYear,
  ] =
    useState(
      initialData?.year ??
        ""
    );

  const [
    description,
    setDescription,
  ] =
    useState(
      initialData?.description ??
        ""
    );

  const [
    published,
    setPublished,
  ] =
    useState(
      initialData?.published ??
        true
    );

  /* =====================================
     PLACEMENT
  ===================================== */

  const [
    placement,
    setPlacement,
  ] =
    useState<Placement>(
      initialData?.sortOrder !=
        null &&
        initialData.sortOrder < 0
        ? "top"
        : "bottom"
    );

  /* =====================================
     COVER IMAGE
  ===================================== */

  const [
    coverImage,
    setCoverImage,
  ] =
    useState(
      initialData?.coverImage ??
        ""
    );

  const [
    uploadingCover,
    setUploadingCover,
  ] =
    useState(false);

  const coverInputRef =
    useRef<HTMLInputElement | null>(
      null
    );

  /* =====================================
     MOTION GRAPHICS
  ===================================== */

  const [
    previewVideo,
    setPreviewVideo,
  ] =
    useState(
      initialData?.previewVideo ??
        ""
    );

  const [
    videoPoster,
    setVideoPoster,
  ] =
    useState(
      initialData?.videoPoster ??
        ""
    );

  const [
    uploadingVideo,
    setUploadingVideo,
  ] =
    useState(false);

  const [
    uploadingPoster,
    setUploadingPoster,
  ] =
    useState(false);

  const videoInputRef =
    useRef<HTMLInputElement | null>(
      null
    );

  const posterInputRef =
    useRef<HTMLInputElement | null>(
      null
    );

  /* =====================================
     DELIVERABLES
  ===================================== */

  const [
    oneSheets,
    setOneSheets,
  ] =
    useState<string[]>(
      initialData?.oneSheets
        ?.length
        ? initialData.oneSheets
        : [""]
    );

  const [
    outdoor,
    setOutdoor,
  ] =
    useState<string[]>(
      initialData?.outdoor
        ?.length
        ? initialData.outdoor
        : [""]
    );

  const [
    international,
    setInternational,
  ] =
    useState<string[]>(
      initialData
        ?.international?.length
        ? initialData.international
        : [""]
    );

  /* =====================================
     GALLERY
  ===================================== */

  const [
    gallery,
    setGallery,
  ] =
    useState<string[]>(
      initialData?.gallery ??
        []
    );

  const [
    uploadingGallery,
    setUploadingGallery,
  ] =
    useState(false);

  const galleryInputRef =
    useRef<HTMLInputElement | null>(
      null
    );

  /* =====================================
     FORM STATUS
  ===================================== */

  const [
    saving,
    setSaving,
  ] =
    useState(false);

  const [
    errors,
    setErrors,
  ] =
    useState<FieldErrors>({});

  const [
    success,
    setSuccess,
  ] =
    useState("");

  const busy =
    saving ||
    uploadingCover ||
    uploadingGallery ||
    uploadingVideo ||
    uploadingPoster;

  const isMotion =
    category ===
    "MOTION_GRAPHICS";

  /* =====================================
     HELPERS
  ===================================== */

  function clearError(
    field: keyof FieldErrors
  ) {
    setErrors(
      (previous) => ({
        ...previous,

        [field]:
          undefined,

        general:
          undefined,
      })
    );
  }

  function cleanArray(
    values: string[]
  ) {
    return values
      .map(
        (value) =>
          value.trim()
      )
      .filter(Boolean);
  }

  /* =====================================
     ARRAY HELPERS
  ===================================== */

  function updateArrayItem(
    setter: React.Dispatch<
      React.SetStateAction<
        string[]
      >
    >,

    values: string[],

    index: number,

    value: string,

    errorField: keyof FieldErrors
  ) {
    const next = [
      ...values,
    ];

    next[index] =
      value;

    setter(next);

    clearError(
      errorField
    );
  }

  function addArrayItem(
    setter: React.Dispatch<
      React.SetStateAction<
        string[]
      >
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
      React.SetStateAction<
        string[]
      >
    >,

    values: string[],

    index: number
  ) {
    if (
      values.length === 1
    ) {
      setter([""]);

      return;
    }

    setter(
      values.filter(
        (
          _,
          itemIndex
        ) =>
          itemIndex !==
          index
      )
    );
  }

  /* =====================================
     GENERIC UPLOAD
  ===================================== */

  async function uploadFile(
    file: File,
    folder: UploadFolder
  ) {
    const safeName = file.name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9._-]+/g, "-")
      .replace(/^-+|-+$/g, "");

    const pathname =
      `projects/${folder}/${Date.now()}-${safeName || "upload"}`;

    const blob = await upload(
      pathname,
      file,
      {
        access: "public",
        handleUploadUrl: "/api/admin/uploads",
        clientPayload: JSON.stringify({
          folder,
        }),
      }
    );

    return blob.url;
  }

  /* =====================================
     COVER UPLOAD
  ===================================== */

  async function handleCoverUpload(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const file =
      event.target.files?.[0];

    event.target.value =
      "";

    if (!file) {
      return;
    }

    if (
      !file.type.startsWith(
        "image/"
      )
    ) {
      setErrors(
        (previous) => ({
          ...previous,

          coverImage:
            "Please choose an image file.",
        })
      );

      return;
    }

    if (
      file.size >
      10 *
        1024 *
        1024
    ) {
      setErrors(
        (previous) => ({
          ...previous,

          coverImage:
            "Cover image must be smaller than 10 MB.",
        })
      );

      return;
    }

    setUploadingCover(
      true
    );

    clearError(
      "coverImage"
    );

    try {
      const url =
        await uploadFile(
          file,
          "covers"
        );

      setCoverImage(
        url
      );
    } catch (error) {
      console.error(
        "COVER UPLOAD ERROR:",
        error
      );

      setErrors(
        (previous) => ({
          ...previous,

          coverImage:
            error instanceof
            Error
              ? error.message
              : "Cover image could not be uploaded.",
        })
      );
    } finally {
      setUploadingCover(
        false
      );
    }
  }

  /* =====================================
     VIDEO UPLOAD
  ===================================== */

  async function handleVideoUpload(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const file =
      event.target.files?.[0];

    event.target.value =
      "";

    if (!file) {
      return;
    }

    const validTypes = [
      "video/mp4",
      "video/webm",
    ];

    if (
      !validTypes.includes(
        file.type
      )
    ) {
      setErrors(
        (previous) => ({
          ...previous,

          previewVideo:
            "Upload an MP4 or WebM video.",
        })
      );

      return;
    }

    if (
      file.size >
      50 *
        1024 *
        1024
    ) {
      setErrors(
        (previous) => ({
          ...previous,

          previewVideo:
            "Motion clips must be smaller than 50 MB.",
        })
      );

      return;
    }

    setUploadingVideo(
      true
    );

    clearError(
      "previewVideo"
    );

    try {
      const url =
        await uploadFile(
          file,
          "motion"
        );

      setPreviewVideo(
        url
      );
    } catch (error) {
      console.error(
        "VIDEO UPLOAD ERROR:",
        error
      );

      setErrors(
        (previous) => ({
          ...previous,

          previewVideo:
            error instanceof
            Error
              ? error.message
              : "Motion clip could not be uploaded.",
        })
      );
    } finally {
      setUploadingVideo(
        false
      );
    }
  }

  /* =====================================
     VIDEO POSTER
  ===================================== */

  async function handlePosterUpload(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const file =
      event.target.files?.[0];

    event.target.value =
      "";

    if (!file) {
      return;
    }

    if (
      !file.type.startsWith(
        "image/"
      )
    ) {
      setErrors(
        (previous) => ({
          ...previous,

          videoPoster:
            "Please choose an image file.",
        })
      );

      return;
    }

    if (
      file.size >
      10 *
        1024 *
        1024
    ) {
      setErrors(
        (previous) => ({
          ...previous,

          videoPoster:
            "Poster image must be smaller than 10 MB.",
        })
      );

      return;
    }

    setUploadingPoster(
      true
    );

    clearError(
      "videoPoster"
    );

    try {
      const url =
        await uploadFile(
          file,
          "posters"
        );

      setVideoPoster(
        url
      );
    } catch (error) {
      console.error(
        "POSTER UPLOAD ERROR:",
        error
      );

      setErrors(
        (previous) => ({
          ...previous,

          videoPoster:
            error instanceof
            Error
              ? error.message
              : "Poster image could not be uploaded.",
        })
      );
    } finally {
      setUploadingPoster(
        false
      );
    }
  }

  /* =====================================
     GALLERY UPLOAD
  ===================================== */

  async function handleGalleryUpload(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const files =
      Array.from(
        event.target.files ??
          []
      );

    event.target.value =
      "";

    if (
      files.length === 0
    ) {
      return;
    }

    const imageFiles =
      files.filter(
        (file) =>
          file.type.startsWith(
            "image/"
          )
      );

    if (
      imageFiles.length !==
      files.length
    ) {
      setErrors(
        (previous) => ({
          ...previous,

          gallery:
            "Gallery files must all be images.",
        })
      );

      return;
    }

    const oversized =
      imageFiles.some(
        (file) =>
          file.size >
          10 *
            1024 *
            1024
      );

    if (oversized) {
      setErrors(
        (previous) => ({
          ...previous,

          gallery:
            "Each gallery image must be smaller than 10 MB.",
        })
      );

      return;
    }

    setUploadingGallery(
      true
    );

    clearError(
      "gallery"
    );

    try {
      const uploadedUrls =
        await Promise.all(
          imageFiles.map(
            (file) =>
              uploadFile(
                file,
                "gallery"
              )
          )
        );

      setGallery(
        (previous) => [
          ...previous,
          ...uploadedUrls,
        ]
      );
    } catch (error) {
      console.error(
        "GALLERY UPLOAD ERROR:",
        error
      );

      setErrors(
        (previous) => ({
          ...previous,

          gallery:
            error instanceof
            Error
              ? error.message
              : "Gallery images could not be uploaded.",
        })
      );
    } finally {
      setUploadingGallery(
        false
      );
    }
  }

  function removeGalleryImage(
    index: number
  ) {
    setGallery(
      (previous) =>
        previous.filter(
          (
            _,
            imageIndex
          ) =>
            imageIndex !==
            index
        )
    );
  }

  /* =====================================
     VALIDATION
  ===================================== */

  function validateClient() {
    const nextErrors: FieldErrors =
      {};

    if (
      title.trim()
        .length < 2
    ) {
      nextErrors.title =
        "Enter a project title.";
    }

    if (!category) {
      nextErrors.category =
        "Choose a project category.";
    }

    if (
      description
        .trim()
        .length < 20
    ) {
      nextErrors.description =
        "Add at least 20 characters describing the project.";
    }

    if (
      description
        .trim()
        .length > 1500
    ) {
      nextErrors.description =
        "Description cannot exceed 1500 characters.";
    }

    /*
     * Motion Graphics can technically be
     * saved without a clip while still a draft.
     *
     * But if it is published, require a video.
     */
    if (
      isMotion &&
      published &&
      !previewVideo
    ) {
      nextErrors.previewVideo =
        "Upload a motion clip before publishing this Motion Graphics project.";
    }

    setErrors(
      nextErrors
    );

    return (
      Object.keys(
        nextErrors
      ).length === 0
    );
  }

  /* =====================================
     SUBMIT
  ===================================== */

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (busy) {
      return;
    }

    setSuccess("");

    if (
      !validateClient()
    ) {
      window.scrollTo({
        top: 0,
        behavior:
          "smooth",
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
        await fetch(
          endpoint,
          {
            method,

            headers: {
              "Content-Type":
                "application/json",
            },

            body:
              JSON.stringify(
                {
                  title:
                    title.trim(),

                  category,

                  year:
                    year.trim(),

                  description:
                    description.trim(),

                  coverImage,

                  previewVideo:
                    isMotion
                      ? previewVideo
                      : "",

                  videoPoster:
                    isMotion
                      ? videoPoster
                      : "",

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

                  gallery,

                  placement,

                  published,
                }
              ),
          }
        );

      const contentType =
        response.headers.get(
          "content-type"
        );

      let data:
        | Record<
            string,
            any
          >
        | null = null;

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
            "Check that the project API route exists.",
        });

        return;
      }

      if (
        !response.ok
      ) {
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

        window.scrollTo({
          top: 0,
          behavior:
            "smooth",
        });

        return;
      }

      setSuccess(
        editing
          ? "Project updated successfully."
          : "Project added successfully."
      );

      window.setTimeout(
        () => {
          router.push(
            "/admin/projects"
          );

          router.refresh();
        },
        650
      );
    } catch (error) {
      console.error(
        "PROJECT FORM ERROR:",
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
      onSubmit={
        handleSubmit
      }
      noValidate
      className="space-y-6"
    >
      {/* =====================================
          ERROR
      ===================================== */}

      {errors.general && (
        <div className="flex items-start gap-3 border border-red-500/25 bg-red-500/[0.06] px-4 py-4">
          <FiAlertCircle className="mt-0.5 shrink-0 text-lg text-red-400" />

          <div>
            <p className="text-[14px] font-medium text-red-300">
              We couldn&apos;t save this project.
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
        <div className="flex items-start gap-3 border border-green-500/25 bg-green-500/[0.06] px-4 py-4">
          <FiCheckCircle className="mt-0.5 shrink-0 text-lg text-green-400" />

          <div>
            <p className="text-[14px] font-medium text-green-300">
              {success}
            </p>

            <p className="mt-1 text-[11px] text-green-300/50">
              Returning to Projects...
            </p>
          </div>
        </div>
      )}

      {/* =====================================
          PROJECT INFORMATION
      ===================================== */}

      <FormSection
        title="Project Information"
        description="The primary information displayed throughout the portfolio."
      >
        <div className="grid gap-5 md:grid-cols-2">
          <Field
            label="Project Title"
            required
            disabled={busy}
            value={title}
            placeholder="Spider-Man Campaign"
            error={
              errors.title
            }
            help="Use the movie, campaign, or project name."
            onChange={(
              value
            ) => {
              setTitle(
                value
              );

              clearError(
                "title"
              );
            }}
          />

          {/* CATEGORY */}

          <div>
            <Label required>
              Category
            </Label>

            <select
              disabled={
                busy
              }
              value={
                category
              }
              onChange={(
                event
              ) => {
                setCategory(
                  event
                    .target
                    .value as ProjectCategory
                );

                clearError(
                  "category"
                );
              }}
              className="h-11 w-full cursor-pointer border border-[#D4AF37]/15 bg-[#121212] px-4 text-[14px] text-[#F4EFE6]/80 outline-none transition focus:border-[#D4AF37]/45 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {categoryOptions.map(
                (
                  option
                ) => (
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
              Determines which Projects category this appears under.
            </HelpText>
          </div>

          <Field
            label="Year"
            disabled={busy}
            value={year}
            placeholder="2026"
            help="Optional."
            onChange={(
              value
            ) => {
              setYear(
                value
              );

              clearError(
                "year"
              );
            }}
          />

          {/* PLACEMENT */}

          <div>
            <Label>
              Placement
            </Label>

            <div className="grid grid-cols-2 gap-2">
              <PlacementButton
                label="Top"
                description="Show first"
                active={
                  placement ===
                  "top"
                }
                disabled={
                  busy
                }
                onClick={() =>
                  setPlacement(
                    "top"
                  )
                }
              />

              <PlacementButton
                label="Bottom"
                description="Show last"
                active={
                  placement ===
                  "bottom"
                }
                disabled={
                  busy
                }
                onClick={() =>
                  setPlacement(
                    "bottom"
                  )
                }
              />
            </div>

            <HelpText>
              Places the project at the top or bottom of its category.
            </HelpText>
          </div>
        </div>
      </FormSection>

      {/* =====================================
          DESCRIPTION
      ===================================== */}

      <FormSection
        title="Description"
        description="Explain the project and the creative work involved."
      >
        <div>
          <div className="mb-2 flex items-center justify-between gap-4">
            <Label required>
              Project Description
            </Label>

            <span
              className={`text-[9px] ${
                description.length >
                1400
                  ? "text-red-400"
                  : "text-[#F4EFE6]/25"
              }`}
            >
              {
                description.length
              }
              /1500
            </span>
          </div>

          <textarea
            disabled={
              busy
            }
            value={
              description
            }
            maxLength={
              1500
            }
            rows={6}
            placeholder="Describe the campaign, creative direction, deliverables, or design approach..."
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
            className={`w-full resize-none border bg-[#121212] px-4 py-3.5 text-[14px] leading-6 text-[#F4EFE6]/80 outline-none transition placeholder:text-[#F4EFE6]/18 disabled:cursor-not-allowed disabled:opacity-50 ${
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
              One concise paragraph works best.
            </HelpText>
          )}
        </div>
      </FormSection>

      {/* =====================================
          COVER ARTWORK
      ===================================== */}

      <FormSection
        title="Cover Artwork"
        description={
          isMotion
            ? "The still artwork shown before the animation begins."
            : "The main artwork shown on the project card and project presentation."
        }
      >
        <input
          ref={
            coverInputRef
          }
          type="file"
          accept="image/*"
          disabled={
            busy
          }
          onChange={
            handleCoverUpload
          }
          className="hidden"
        />

        {coverImage ? (
          <div className="grid gap-5 sm:grid-cols-[170px_1fr] sm:items-start">
            <div className="relative overflow-hidden border border-[#D4AF37]/15 bg-[#101010]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={
                  coverImage
                }
                alt="Project cover preview"
                className="aspect-[2/3] w-full object-cover"
              />

              <div className="pointer-events-none absolute inset-[5px] border border-[#D4AF37]/10" />
            </div>

            <div className="border border-[#D4AF37]/10 bg-[#121212] p-5">
              <div className="flex h-10 w-10 items-center justify-center border border-[#D4AF37]/20 text-[#D4AF37]">
                <FiImage />
              </div>

              <h3 className="mt-4 font-serif text-[20px]">
                Cover image ready
              </h3>

              <p className="mt-2 max-w-[460px] text-[12px] leading-5 text-[#F4EFE6]/35">
                This image will be used as the project&apos;s primary artwork.
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                <button
                  type="button"
                  disabled={
                    busy
                  }
                  onClick={() =>
                    coverInputRef.current?.click()
                  }
                  className="flex items-center gap-2 border border-[#D4AF37]/25 px-4 py-2.5 text-[9px] uppercase tracking-[0.2em] text-[#D4AF37] transition hover:bg-[#D4AF37] hover:text-[#121212] disabled:opacity-40"
                >
                  <FiUploadCloud />

                  Replace
                </button>

                <button
                  type="button"
                  disabled={
                    busy
                  }
                  onClick={() =>
                    setCoverImage(
                      ""
                    )
                  }
                  className="flex items-center gap-2 border border-[#7E2A5A]/25 px-4 py-2.5 text-[9px] uppercase tracking-[0.2em] text-[#F4EFE6]/45 transition hover:border-[#7E2A5A]/55 hover:text-[#A95F84] disabled:opacity-40"
                >
                  <FiTrash2 />

                  Remove
                </button>
              </div>
            </div>
          </div>
        ) : (
          <UploadButton
            loading={
              uploadingCover
            }
            title="Upload Cover Artwork"
            loadingTitle="Uploading artwork..."
            description="JPG, PNG or WEBP • Maximum 10 MB"
            disabled={
              busy
            }
            onClick={() =>
              coverInputRef.current?.click()
            }
          />
        )}

        {errors.coverImage && (
          <ErrorMessage>
            {
              errors.coverImage
            }
          </ErrorMessage>
        )}
      </FormSection>

      {/* =====================================
          MOTION GRAPHICS MEDIA
      ===================================== */}

      {isMotion && (
        <FormSection
          title="Motion Preview"
          description="Upload the animation clip and an optional still image used before playback."
        >
          <div className="space-y-6">
            {/* VIDEO INPUT */}

            <input
              ref={
                videoInputRef
              }
              type="file"
              accept="video/mp4,video/webm"
              disabled={
                busy
              }
              onChange={
                handleVideoUpload
              }
              className="hidden"
            />

            {/* VIDEO */}

            <div>
              <div className="mb-3 flex items-center gap-3">
                <FiFilm className="text-[#D4AF37]" />

                <div>
                  <p className="font-serif text-[18px]">
                    Animation Clip
                  </p>

                  <p className="mt-0.5 text-[10px] text-[#F4EFE6]/28">
                    MP4 or WebM • Maximum 50 MB
                  </p>
                </div>
              </div>

              {previewVideo ? (
                <div className="grid gap-5 lg:grid-cols-[1.35fr_0.65fr]">
                  <div className="overflow-hidden border border-[#D4AF37]/15 bg-black">
                    <video
                      src={
                        previewVideo
                      }
                      poster={
                        videoPoster ||
                        coverImage ||
                        undefined
                      }
                      controls
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      className="aspect-video w-full bg-black object-contain"
                    />
                  </div>

                  <div className="flex flex-col justify-between border border-[#D4AF37]/10 bg-[#121212] p-5">
                    <div>
                      <div className="flex h-10 w-10 items-center justify-center border border-[#D4AF37]/20 text-[#D4AF37]">
                        <FiVideo />
                      </div>

                      <h3 className="mt-4 font-serif text-[20px]">
                        Motion clip ready
                      </h3>

                      <p className="mt-2 text-[12px] leading-5 text-[#F4EFE6]/35">
                        This animation can be used for the Motion Graphics project preview.
                      </p>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-2">
                      <button
                        type="button"
                        disabled={
                          busy
                        }
                        onClick={() =>
                          videoInputRef.current?.click()
                        }
                        className="flex items-center gap-2 border border-[#D4AF37]/25 px-4 py-2.5 text-[9px] uppercase tracking-[0.2em] text-[#D4AF37] transition hover:bg-[#D4AF37] hover:text-[#121212] disabled:opacity-40"
                      >
                        <FiUploadCloud />

                        Replace
                      </button>

                      <button
                        type="button"
                        disabled={
                          busy
                        }
                        onClick={() =>
                          setPreviewVideo(
                            ""
                          )
                        }
                        className="flex items-center gap-2 border border-[#7E2A5A]/25 px-4 py-2.5 text-[9px] uppercase tracking-[0.2em] text-[#F4EFE6]/45 transition hover:border-[#7E2A5A]/55 hover:text-[#A95F84] disabled:opacity-40"
                      >
                        <FiTrash2 />

                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <UploadButton
                  loading={
                    uploadingVideo
                  }
                  title="Upload Animation Clip"
                  loadingTitle="Uploading motion clip..."
                  description="MP4 or WebM • Maximum 50 MB"
                  disabled={
                    busy
                  }
                  video
                  onClick={() =>
                    videoInputRef.current?.click()
                  }
                />
              )}

              {errors.previewVideo && (
                <ErrorMessage>
                  {
                    errors.previewVideo
                  }
                </ErrorMessage>
              )}
            </div>

            {/* =====================================
                POSTER
            ===================================== */}

            <div className="border-t border-[#D4AF37]/10 pt-6">
              <input
                ref={
                  posterInputRef
                }
                type="file"
                accept="image/*"
                disabled={
                  busy
                }
                onChange={
                  handlePosterUpload
                }
                className="hidden"
              />

              <div className="mb-3">
                <p className="font-serif text-[18px]">
                  Video Poster
                </p>

                <p className="mt-1 text-[10px] leading-4 text-[#F4EFE6]/28">
                  Optional still image displayed before the animation plays.
                </p>
              </div>

              {videoPoster ? (
                <div className="flex flex-col gap-4 sm:flex-row">
                  <div className="w-full max-w-[220px] overflow-hidden border border-[#D4AF37]/15 bg-[#101010]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={
                        videoPoster
                      }
                      alt="Motion video poster"
                      className="aspect-video w-full object-cover"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={
                        busy
                      }
                      onClick={() =>
                        posterInputRef.current?.click()
                      }
                      className="flex items-center gap-2 border border-[#D4AF37]/25 px-4 py-2.5 text-[9px] uppercase tracking-[0.2em] text-[#D4AF37] transition hover:bg-[#D4AF37] hover:text-[#121212]"
                    >
                      <FiUploadCloud />

                      Replace
                    </button>

                    <button
                      type="button"
                      disabled={
                        busy
                      }
                      onClick={() =>
                        setVideoPoster(
                          ""
                        )
                      }
                      className="flex items-center gap-2 border border-[#7E2A5A]/25 px-4 py-2.5 text-[9px] uppercase tracking-[0.2em] text-[#F4EFE6]/45 transition hover:text-[#A95F84]"
                    >
                      <FiTrash2 />

                      Remove
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  disabled={
                    busy
                  }
                  onClick={() =>
                    posterInputRef.current?.click()
                  }
                  className="flex items-center gap-3 border border-dashed border-[#D4AF37]/20 bg-[#121212] px-5 py-4 text-left transition hover:border-[#D4AF37]/40 disabled:opacity-50"
                >
                  {uploadingPoster ? (
                    <FiLoader className="animate-spin text-[#D4AF37]" />
                  ) : (
                    <FiImage className="text-[#D4AF37]" />
                  )}

                  <div>
                    <p className="text-[12px] text-[#F4EFE6]/70">
                      Upload video poster
                    </p>

                    <p className="mt-1 text-[9px] text-[#F4EFE6]/25">
                      Optional
                    </p>
                  </div>
                </button>
              )}

              {errors.videoPoster && (
                <ErrorMessage>
                  {
                    errors.videoPoster
                  }
                </ErrorMessage>
              )}
            </div>
          </div>
        </FormSection>
      )}

      {/* =====================================
          CAMPAIGN DELIVERABLES
      ===================================== */}

      <FormSection
        title="Campaign Deliverables"
        description="Short labels describing the work included in the project."
      >
        <div className="grid gap-6 lg:grid-cols-3">
          <DynamicList
            title="One Sheets"
            values={
              oneSheets
            }
            disabled={
              busy
            }
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
            onRemove={(
              index
            ) =>
              removeArrayItem(
                setOneSheets,
                oneSheets,
                index
              )
            }
          />

          <DynamicList
            title="Outdoor"
            values={
              outdoor
            }
            disabled={
              busy
            }
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
            onRemove={(
              index
            ) =>
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
            disabled={
              busy
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
            onRemove={(
              index
            ) =>
              removeArrayItem(
                setInternational,
                international,
                index
              )
            }
          />
        </div>
      </FormSection>

      {/* =====================================
          GALLERY
      ===================================== */}

      <FormSection
        title="Additional Artwork"
        description="Upload supporting artwork displayed inside the project presentation."
      >
        <input
          ref={
            galleryInputRef
          }
          type="file"
          accept="image/*"
          multiple
          disabled={
            busy
          }
          onChange={
            handleGalleryUpload
          }
          className="hidden"
        />

        <button
          type="button"
          disabled={
            busy
          }
          onClick={() =>
            galleryInputRef.current?.click()
          }
          className="group flex w-full items-center justify-between gap-5 border border-dashed border-[#D4AF37]/20 bg-[#121212] p-5 text-left transition hover:border-[#D4AF37]/40 hover:bg-[#151313] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-[#D4AF37]/20 text-[#D4AF37]">
              {uploadingGallery ? (
                <FiLoader className="animate-spin" />
              ) : (
                <FiPlus />
              )}
            </div>

            <div>
              <p className="font-serif text-[18px]">
                {uploadingGallery
                  ? "Uploading artwork..."
                  : "Add Gallery Artwork"}
              </p>

              <p className="mt-1 text-[10px] leading-4 text-[#F4EFE6]/28">
                Choose one or multiple images.
              </p>
            </div>
          </div>

          <FiUploadCloud className="hidden text-lg text-[#D4AF37]/45 sm:block" />
        </button>

        {errors.gallery && (
          <ErrorMessage>
            {
              errors.gallery
            }
          </ErrorMessage>
        )}

        {gallery.length >
          0 && (
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {gallery.map(
              (
                image,
                index
              ) => (
                <div
                  key={`${image}-${index}`}
                  className="group/image relative overflow-hidden border border-[#D4AF37]/10 bg-[#101010]"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={
                      image
                    }
                    alt={`Gallery artwork ${
                      index +
                      1
                    }`}
                    className="aspect-[4/5] w-full object-cover"
                  />

                  <div className="absolute inset-0 bg-black/0 transition group-hover/image:bg-black/20" />

                  <div className="absolute left-2 top-2 border border-[#D4AF37]/15 bg-[#121212]/85 px-2 py-1 backdrop-blur">
                    <span className="font-serif text-[10px] text-[#D4AF37]/65">
                      {String(
                        index +
                          1
                      ).padStart(
                        2,
                        "0"
                      )}
                    </span>
                  </div>

                  <button
                    type="button"
                    disabled={
                      busy
                    }
                    onClick={() =>
                      removeGalleryImage(
                        index
                      )
                    }
                    className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center border border-[#7E2A5A]/30 bg-[#121212]/90 text-[#F4EFE6]/60 backdrop-blur transition hover:border-[#7E2A5A] hover:text-[#A95F84]"
                  >
                    <FiX />
                  </button>
                </div>
              )
            )}
          </div>
        )}
      </FormSection>

      {/* =====================================
          PUBLISHING
      ===================================== */}

      <FormSection
        title="Publishing"
        description="Control whether this project is visible on the public portfolio."
      >
        <button
          type="button"
          disabled={
            busy
          }
          onClick={() =>
            setPublished(
              (
                value
              ) =>
                !value
            )
          }
          className={`flex min-h-[58px] w-full items-center justify-between border px-4 text-left transition disabled:cursor-not-allowed disabled:opacity-50 ${
            published
              ? "border-[#D4AF37]/40 bg-[#D4AF37]/[0.05]"
              : "border-[#D4AF37]/15 bg-[#121212]"
          }`}
        >
          <div>
            <p className="text-[13px] text-[#F4EFE6]/75">
              {published
                ? "Published"
                : "Draft"}
            </p>

            <p className="mt-1 text-[10px] text-[#F4EFE6]/28">
              {published
                ? "Visible on the public portfolio"
                : "Hidden from the public portfolio"}
            </p>
          </div>

          <div
            className={`relative h-5 w-9 shrink-0 rounded-full transition ${
              published
                ? "bg-[#D4AF37]"
                : "bg-[#F4EFE6]/10"
            }`}
          >
            <span
              className={`absolute top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full bg-[#121212] transition-all duration-200 ${
                published
                  ? "left-[18px]"
                  : "left-[3px]"
              }`}
            />
          </div>
        </button>
      </FormSection>

      {/* =====================================
          SAVE
      ===================================== */}

      <div className="border-t border-[#D4AF37]/10 pt-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[11px] text-[#F4EFE6]/30">
              {editing
                ? "Save changes to update this portfolio project."
                : published
                  ? "This project will be visible after saving."
                  : "This project will be saved as a draft."}
            </p>

            {(uploadingCover ||
              uploadingGallery ||
              uploadingVideo ||
              uploadingPoster) && (
              <p className="mt-1 text-[10px] text-[#D4AF37]/60">
                Wait for all media to finish uploading before saving.
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={
              busy
            }
            className="group relative flex min-h-[46px] w-full items-center justify-center gap-3 overflow-hidden border border-[#D4AF37]/40 bg-[#5B1E3A]/15 px-7 transition disabled:cursor-not-allowed disabled:opacity-55 sm:w-auto sm:min-w-[200px]"
          >
            {!saving && (
              <span className="absolute inset-0 origin-left scale-x-0 bg-[#D4AF37] transition-transform duration-300 group-hover:scale-x-100" />
            )}

            {saving ? (
              <>
                <FiLoader className="relative animate-spin text-[15px] text-[#D4AF37]" />

                <span className="relative text-[9px] uppercase tracking-[0.25em] text-[#D4AF37]">
                  Saving...
                </span>
              </>
            ) : (
              <>
                <FiCheck className="relative text-[14px] text-[#D4AF37] transition group-hover:text-[#121212]" />

                <span className="relative text-[9px] uppercase tracking-[0.25em] text-[#D4AF37] transition group-hover:text-[#121212]">
                  {editing
                    ? "Update Project"
                    : "Save Project"}
                </span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* =====================================
          LOADING OVERLAY
      ===================================== */}

      {saving && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0B0B0B]/40 backdrop-blur-[2px]">
          <div className="flex items-center gap-4 border border-[#D4AF37]/20 bg-[#111111] px-6 py-4 shadow-[0_20px_70px_rgba(0,0,0,0.5)]">
            <FiLoader className="animate-spin text-xl text-[#D4AF37]" />

            <div>
              <p className="font-serif text-[17px] text-[#F4EFE6]">
                {editing
                  ? "Updating Project"
                  : "Saving Project"}
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
   UPLOAD BUTTON
===================================== */

function UploadButton({
  title,
  loadingTitle,
  description,
  loading,
  disabled,
  onClick,
  video = false,
}: {
  title: string;

  loadingTitle: string;

  description: string;

  loading: boolean;

  disabled: boolean;

  onClick: () => void;

  video?: boolean;
}) {
  return (
    <button
      type="button"
      disabled={
        disabled
      }
      onClick={
        onClick
      }
      className="group flex min-h-[180px] w-full flex-col items-center justify-center border border-dashed border-[#D4AF37]/25 bg-[#121212] px-6 text-center transition hover:border-[#D4AF37]/50 hover:bg-[#151313] disabled:cursor-not-allowed disabled:opacity-50"
    >
      {loading ? (
        <>
          <FiLoader className="animate-spin text-2xl text-[#D4AF37]" />

          <p className="mt-4 font-serif text-[19px]">
            {loadingTitle}
          </p>
        </>
      ) : (
        <>
          <div className="flex h-12 w-12 items-center justify-center border border-[#D4AF37]/20 text-xl text-[#D4AF37] transition group-hover:border-[#D4AF37]/45">
            {video ? (
              <FiFilm />
            ) : (
              <FiUploadCloud />
            )}
          </div>

          <p className="mt-4 font-serif text-[20px]">
            {title}
          </p>

          <p className="mt-2 text-[11px] leading-5 text-[#F4EFE6]/30">
            {description}
          </p>
        </>
      )}
    </button>
  );
}

/* =====================================
   PLACEMENT
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
      disabled={
        disabled
      }
      onClick={
        onClick
      }
      className={`flex min-h-[58px] items-center justify-between border px-4 text-left transition disabled:cursor-not-allowed disabled:opacity-50 ${
        active
          ? "border-[#D4AF37]/45 bg-[#D4AF37]/[0.06]"
          : "border-[#D4AF37]/15 bg-[#121212] hover:border-[#D4AF37]/30"
      }`}
    >
      <div>
        <p
          className={`font-serif text-[16px] ${
            active
              ? "text-[#F4EFE6]"
              : "text-[#F4EFE6]/55"
          }`}
        >
          {label}
        </p>

        <p className="mt-0.5 text-[9px] uppercase tracking-[0.15em] text-[#F4EFE6]/25">
          {
            description
          }
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
   DYNAMIC LIST
===================================== */

function DynamicList({
  title,
  values,
  placeholder,
  onChange,
  onAdd,
  onRemove,
  disabled,
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

  disabled: boolean;
}) {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between gap-3">
        <Label>
          {title}
        </Label>

        <button
          type="button"
          disabled={
            disabled
          }
          onClick={
            onAdd
          }
          className="flex items-center gap-1.5 text-[9px] uppercase tracking-[0.18em] text-[#D4AF37] transition hover:text-[#F4EFE6] disabled:opacity-30"
        >
          <FiPlus />

          Add
        </button>
      </div>

      <div className="space-y-2">
        {values.map(
          (
            value,
            index
          ) => (
            <div
              key={
                index
              }
              className="flex gap-2"
            >
              <input
                disabled={
                  disabled
                }
                value={
                  value
                }
                placeholder={
                  placeholder
                }
                onChange={(
                  event
                ) =>
                  onChange(
                    index,
                    event
                      .target
                      .value
                  )
                }
                className="h-11 min-w-0 flex-1 border border-[#D4AF37]/15 bg-[#121212] px-3.5 text-[13px] text-[#F4EFE6]/75 outline-none transition placeholder:text-[#F4EFE6]/18 focus:border-[#D4AF37]/45 disabled:opacity-50"
              />

              <button
                type="button"
                disabled={
                  disabled
                }
                onClick={() =>
                  onRemove(
                    index
                  )
                }
                className="flex h-11 w-11 shrink-0 items-center justify-center border border-[#7E2A5A]/20 text-[#F4EFE6]/30 transition hover:border-[#7E2A5A]/50 hover:text-[#A95F84] disabled:opacity-30"
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

  children:
    React.ReactNode;
}) {
  return (
    <section className="border-b border-[#D4AF37]/10 pb-7">
      <div className="mb-5">
        <h2 className="font-serif text-[22px] text-[#F4EFE6]">
          {title}
        </h2>

        <p className="mt-1.5 text-[13px] leading-5 text-[#F4EFE6]/35">
          {
            description
          }
        </p>
      </div>

      {children}
    </section>
  );
}

/* =====================================
   LABEL
===================================== */

function Label({
  children,
  required = false,
}: {
  children:
    React.ReactNode;

  required?:
    boolean;
}) {
  return (
    <label className="mb-2 block text-[9px] uppercase tracking-[0.26em] text-[#D4AF37]">
      {children}

      {required && (
        <span className="ml-1 text-red-400">
          *
        </span>
      )}
    </label>
  );
}

/* =====================================
   FIELD
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

  onChange: (
    value: string
  ) => void;

  placeholder:
    string;

  help?: string;

  error?: string;

  required?:
    boolean;

  disabled?:
    boolean;
}) {
  return (
    <div>
      <Label
        required={
          required
        }
      >
        {label}
      </Label>

      <input
        disabled={
          disabled
        }
        value={
          value
        }
        placeholder={
          placeholder
        }
        onChange={(
          event
        ) =>
          onChange(
            event.target
              .value
          )
        }
        className={`h-11 w-full border bg-[#121212] px-4 text-[14px] text-[#F4EFE6]/80 outline-none transition placeholder:text-[#F4EFE6]/18 disabled:opacity-50 ${
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
   ERROR
===================================== */

function ErrorMessage({
  children,
}: {
  children:
    React.ReactNode;
}) {
  return (
    <p className="mt-2 flex items-center gap-1.5 text-[11px] leading-4 text-red-400">
      <FiAlertCircle className="shrink-0" />

      {children}
    </p>
  );
}

/* =====================================
   HELP
===================================== */

function HelpText({
  children,
}: {
  children:
    React.ReactNode;
}) {
  return (
    <p className="mt-2 text-[10px] leading-4 text-[#F4EFE6]/27">
      {children}
    </p>
  );
}