import { NextResponse } from "next/server";
import { Resend } from "resend";

import { contactSchema } from "@/lib/validations/contact";

const resend = new Resend(
  process.env.RESEND_API_KEY
);

export async function POST(
  request: Request
) {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.error(
        "CONTACT ERROR: RESEND_API_KEY is missing"
      );

      return NextResponse.json(
        {
          error:
            "Email service is not configured.",
        },
        {
          status: 500,
        }
      );
    }

    const body =
      await request.json();

    const result =
      contactSchema.safeParse(
        body
      );

    if (!result.success) {
      const errors: Record<
        string,
        string
      > = {};

      for (
        const issue of
        result.error.issues
      ) {
        const field =
          issue.path[0]?.toString();

        if (
          field &&
          !errors[field]
        ) {
          errors[field] =
            issue.message;
        }
      }

      return NextResponse.json(
        {
          error:
            "Please correct the highlighted fields.",
          errors,
        },
        {
          status: 400,
        }
      );
    }

    const {
      name,
      email,
      subject,
      message,
      website,
    } = result.data;

    // Honeypot
    if (website) {
      return NextResponse.json({
        success: true,
      });
    }

    const to =
      process.env.CONTACT_TO_EMAIL ||
      "leilamirfakhraei@gmail.com";

    const from =
      process.env.CONTACT_FROM_EMAIL ||
      "Portfolio Contact <onboarding@resend.dev>";

    const { data, error } =
      await resend.emails.send({
        from,

        to: [to],

        replyTo: email,

        subject:
          `[Portfolio] ${subject}`,

        text: `
New portfolio inquiry

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}
        `.trim(),

        html: `
          <div style="
            font-family: Arial, sans-serif;
            background:#111111;
            color:#f4efe6;
            padding:32px;
          ">
            <div style="
              max-width:640px;
              margin:0 auto;
              background:#171414;
              border:1px solid #5b1e3a;
              padding:32px;
            ">
              <p style="
                color:#d4af37;
                font-size:11px;
                letter-spacing:3px;
                text-transform:uppercase;
                margin:0 0 12px;
              ">
                New Portfolio Inquiry
              </p>

              <h1 style="
                margin:0 0 28px;
                font-size:28px;
                font-weight:500;
              ">
                ${escapeHtml(subject)}
              </h1>

              <table
                style="
                  width:100%;
                  border-collapse:collapse;
                  margin-bottom:28px;
                "
              >
                <tr>
                  <td
                    style="
                      padding:8px 0;
                      color:#d4af37;
                      width:100px;
                    "
                  >
                    Name
                  </td>

                  <td
                    style="
                      padding:8px 0;
                      color:#f4efe6;
                    "
                  >
                    ${escapeHtml(name)}
                  </td>
                </tr>

                <tr>
                  <td
                    style="
                      padding:8px 0;
                      color:#d4af37;
                    "
                  >
                    Email
                  </td>

                  <td
                    style="
                      padding:8px 0;
                      color:#f4efe6;
                    "
                  >
                    ${escapeHtml(email)}
                  </td>
                </tr>
              </table>

              <div style="
                border-top:1px solid rgba(212,175,55,.25);
                padding-top:24px;
              ">
                <p style="
                  color:#d4af37;
                  font-size:10px;
                  letter-spacing:2px;
                  text-transform:uppercase;
                ">
                  Message
                </p>

                <p style="
                  color:#f4efe6;
                  line-height:1.8;
                  white-space:pre-wrap;
                ">
                  ${escapeHtml(message)}
                </p>
              </div>
            </div>
          </div>
        `,
      });

    if (error) {
      console.error(
        "RESEND ERROR:",
        error
      );

      return NextResponse.json(
        {
          error:
            "The message could not be sent. Please try again.",
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json(
      {
        success: true,
        id: data?.id,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(
      "CONTACT API ERROR:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Something went wrong while sending your message.",
      },
      {
        status: 500,
      }
    );
  }
}

function escapeHtml(
  value: string
) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}