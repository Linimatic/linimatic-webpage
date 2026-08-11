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

export function getSubjectLabel(value: string | null): string {
  return (value && SUBJECT_LABELS[value]) || SUBJECT_LABELS.general;
}

export function getVolumeLabel(value: string | null): string {
  return (value && VOLUME_LABELS[value]) || "Not specified";
}

export function buildContactEmailSubject(subjectLabel: string): string {
  return `Linimatic website enquiry — ${subjectLabel}`;
}
