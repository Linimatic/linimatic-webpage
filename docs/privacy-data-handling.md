# Privacy and data-handling procedure

This is the internal operating procedure behind the public Privacy Policy. It describes the contact and recruitment flows used by this website. It is not a substitute for the provider agreements or a legal review.

Last reviewed: August 2026

## Actual contact-form flow

`Visitor browser → Vercel server action → Resend → linimatic@linimatic.dk → Linimatic mailbox provider`

The form sends the visitor's name, company, email address, phone number, enquiry subject, expected production volume and message. The visitor's address is also used as the reply address. The site does not accept file uploads and does not store submissions in a website database.

The form uses a short-lived in-memory IP limit to prevent repeated abuse. It is not a persistent visitor database. Resend and the mailbox provider are the systems that can retain the message for normal business use. Technical drawings can be shared later through an agreed channel after the initial enquiry.

The provider terms are available in the [Vercel Data Processing Addendum](https://vercel.com/legal/dpa) and [Resend Data Processing Addendum](https://resend.com/legal/dpa). This procedure does not replace those agreements.

## Monthly deletion schedule and owner

Owner: the person responsible for the Linimatic mailbox. Linimatic management must record the named owner and a backup in the internal processor register before launch.

Schedule: the owner performs this review on the first business day of every month. If the review is missed, the backup completes it within five business days and records the reason.

## Monthly deletion procedure

The person responsible for the Linimatic mailbox performs this review once each month and records the date, systems checked and any exceptions.

1. Review contact enquiries whose last contact was more than two years ago.
2. Delete the message and related copies from the inbox, sent/archive folders, shared folders, exports and recoverable/deleted areas where the system supports them.
3. Keep an enquiry only when an active customer relationship or a legal obligation requires it. Record the reason and the next review date.
4. Review job applications six months after the relevant position was filled, or six months after receipt or last contact for unsolicited applications. Delete them unless the applicant has agreed to longer retention and the longer period is still needed.
5. Check the Resend dashboard, exports and logs according to the current Resend plan. Do not treat Resend's standard email-log period as a replacement for deleting the copies held in the Linimatic mailbox.
6. Keep only a non-identifying completion record: date, systems checked, number of items deleted and documented exceptions.

Deletion deadlines must be documented and followed up. Logs of the deletion process can themselves contain personal data and must not be kept indefinitely.

## Processor register and publication gate

The table below is the initial register. Complete the account-specific checks before publication and whenever a provider changes. Until that is done, do not describe the site as fully compliant.

| Provider | Role | What it receives | Required check |
|---|---|---|---|
| Vercel | Website hosting and server runtime | Form request, technical request data and security data | Confirm the Vercel plan and the applicable data-processing agreement. The current Vercel DPA covers Pro and Enterprise plans; do not assume it covers Hobby. |
| Resend | Contact-form email delivery | Contact details, message, reply address and email metadata | Keep the current DPA. Record the selected sending region, tracking setting and the current retention terms. An Ireland sending region is not EU-only storage. |
| Business email provider | Mailbox storage and delivery | Incoming contact messages and recruitment emails | Identify the provider from the domain's MX records. Record location, retention, sub-processors and DPA. |
| Vercel Analytics | Optional visit analytics | Consent-gated analytics measurements | Confirm it is not loaded before analytics consent and keep the public wording aligned with the current Vercel analytics policy. |

Do not publish a provider name, region, retention period or transfer mechanism until it has been checked in the relevant account or agreement.

## Security decisions

- The contact form is protected by HTTPS, a honeypot and a server-side rate limit.
- The contact form accepts text fields only. Technical drawings can be shared later through an agreed channel after the initial enquiry.
- The email subject does not contain the visitor's name or company. Those details remain in the message body where they are needed to answer the enquiry.
- Do not ask visitors to submit unnecessary sensitive personal data or special-category data. Do not add file uploads without a separate security and retention review.
- Do not add marketing or newsletter use to this form without a separate, explicit opt-in and a separate retention purpose.

## Account checks before launch

- Resend DPA is available and accepted for the account used by the site.
- Resend domain region and open/click tracking settings are recorded.
- Vercel plan and data-processing terms are recorded; upgrade from Hobby or change the architecture if a processor agreement is required and unavailable.
- The mailbox provider and its retention/deletion controls are recorded.
- Any later channel for technical drawings has an agreed security, access and deletion process before it is used.
- A real test confirms that `linimatic@linimatic.dk` receives the message. The site currently sends only to that address.
