"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export type ContactFormState = {
  success: boolean;
  error: string | null;
};

const SUBJECT_LABELS: Record<string, string> = {
  "new-project": "New Project",
  "existing-project": "Existing Project",
  temadag: "Zinc Info Day",
  general: "General Inquiry",
};

const VOLUME_LABELS: Record<string, string> = {
  "1k-5k": "1,000–5,000 pcs",
  "5k-15k": "5,000–15,000 pcs",
  "15k-50k": "15,000–50,000 pcs",
  "50k-100k": "50,000–100,000 pcs",
  "over-100k": "Over 100,000 pcs",
};

const ALLOWED_FILE_EXTENSIONS = [
  ".step", ".stp", ".iges", ".igs", ".sldprt", ".sldasm", ".x_t", ".pdf", ".dwg", ".dxf",
];
// Resend caps emails at 40MB after base64 encoding (~1.37x); stay well under
const MAX_TOTAL_FILE_BYTES = 15 * 1024 * 1024;

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const name = formData.get("name")?.toString().trim();
  const company = formData.get("company")?.toString().trim();
  const email = formData.get("email")?.toString().trim();
  const phone = formData.get("phone")?.toString().trim() || "";
  const subject = formData.get("subject")?.toString() || "new-project";
  const volume = formData.get("volume")?.toString() || "";
  const message = formData.get("message")?.toString().trim();

  // Server-side validation
  if (!name || !company || !email || !message) {
    return { success: false, error: "missing_fields" };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, error: "invalid_email" };
  }

  if (name.length > 200 || company.length > 200 || message.length > 5000) {
    return { success: false, error: "too_long" };
  }

  const files = formData
    .getAll("files")
    .filter((f): f is File => f instanceof File && f.size > 0);

  for (const file of files) {
    const ext = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();
    if (!ALLOWED_FILE_EXTENSIONS.includes(ext)) {
      return { success: false, error: "invalid_file_type" };
    }
  }

  const totalFileBytes = files.reduce((sum, f) => sum + f.size, 0);
  if (totalFileBytes > MAX_TOTAL_FILE_BYTES) {
    return { success: false, error: "files_too_large" };
  }

  const subjectLabel = SUBJECT_LABELS[subject] ?? subject;
  const volumeLabel = volume ? (VOLUME_LABELS[volume] ?? volume) : "Not specified";

  try {
    const attachments = await Promise.all(
      files.map(async (file) => ({
        filename: file.name,
        content: Buffer.from(await file.arrayBuffer()),
      }))
    );

    await resend.emails.send({
      from: "Linimatic Website <website@linimatic.dk>",
      to: "info@linimatic.dk",
      replyTo: email,
      subject: `${subjectLabel} from ${company} — ${name}`,
      text: [
        `Name: ${name}`,
        `Company: ${company}`,
        `Email: ${email}`,
        `Phone: ${phone || "Not provided"}`,
        `Subject: ${subjectLabel}`,
        `Volume: ${volumeLabel}`,
        `Attachments: ${files.length > 0 ? files.map((f) => f.name).join(", ") : "None"}`,
        ``,
        `Message:`,
        message,
      ].join("\n"),
      attachments,
    });
  } catch (err) {
    console.error("[Contact Form] Email send failed:", err);
    return { success: false, error: "send_failed" };
  }

  return { success: true, error: null };
}
