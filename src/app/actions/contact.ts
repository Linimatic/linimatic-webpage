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
  general: "General Inquiry",
};

const VOLUME_LABELS: Record<string, string> = {
  prototype: "Prototype (<1,000 pcs)",
  low: "Low volume (1,000–100,000 pcs)",
  high: "High volume (100,000+ pcs)",
};

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

  const subjectLabel = SUBJECT_LABELS[subject] ?? subject;
  const volumeLabel = volume ? (VOLUME_LABELS[volume] ?? volume) : "Not specified";

  try {
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
        ``,
        `Message:`,
        message,
      ].join("\n"),
    });
  } catch (err) {
    console.error("[Contact Form] Email send failed:", err);
    return { success: false, error: "send_failed" };
  }

  return { success: true, error: null };
}
