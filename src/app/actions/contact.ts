"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import {
  buildContactEmailSubject,
  getSubjectLabel,
  getVolumeLabel,
} from "./contact-format";
import { rateLimiter } from "./rate-limit";

// Built on first use, not at module load: a missing or rotated API key would
// otherwise throw while the module is being evaluated, which surfaces to the
// visitor as a raw 500 page instead of the form's own error message.
//
// DATA RESIDENCY — the privacy policy (privacyPage.dataSharingItems in
// messages/*.json) tells visitors in all three languages that contact-form
// data is processed on servers in the EU (Ireland). That is an account-level
// region setting on Resend, confirmed by Marc as Dublin — it is not pinned
// anywhere in this code. If the account region is ever changed, or the form is
// pointed at a different provider, the privacy policy becomes false and must
// be updated in the same change.
let resendClient: Resend | null = null;

function getResend(): Resend {
  if (!resendClient) resendClient = new Resend(process.env.RESEND_API_KEY);
  return resendClient;
}

export type ContactFormState = {
  success: boolean;
  error: string | null;
};

const CONTACT_RECIPIENTS = ["linimatic@linimatic.dk"];

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  // Honeypot: a field hidden from people but filled in by most form-spam bots.
  // Report success so the bot has no signal to adapt to, and send nothing.
  if (formData.get("website")?.toString().trim()) {
    return { success: true, error: null };
  }

  const forwardedFor = (await headers()).get("x-forwarded-for");
  const clientIp = forwardedFor?.split(",")[0]?.trim() || "unknown";
  if (rateLimiter.isRateLimited(clientIp)) {
    return { success: false, error: "rate_limited" };
  }

  const name = formData.get("name")?.toString().trim();
  const company = formData.get("company")?.toString().trim();
  const email = formData.get("email")?.toString().trim();
  const phone = formData.get("phone")?.toString().trim() || "";
  const subject = formData.get("subject")?.toString() || null;
  const volume = formData.get("volume")?.toString() || null;
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

  const subjectLabel = getSubjectLabel(subject);
  const volumeLabel = getVolumeLabel(volume);

  try {
    const { data, error } = await getResend().emails.send({
      from: "Linimatic Website <website@linimatic.dk>",
      to: CONTACT_RECIPIENTS,
      replyTo: email,
      subject: buildContactEmailSubject(subjectLabel),
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

    if (error || !data) {
      console.error("[Contact Form] Email send failed:", error ?? "Resend returned no email ID");
      return { success: false, error: "send_failed" };
    }
  } catch (err) {
    console.error("[Contact Form] Email send failed:", err);
    return { success: false, error: "send_failed" };
  }

  return { success: true, error: null };
}
