/** Dates are authored as "DD.MM.YYYY" in messages/<locale>.json. */
export function hasPassed(date: string, now = new Date()) {
  const [day, month, year] = date.split(".").map(Number);
  const today = new Date(now);
  today.setHours(0, 0, 0, 0);
  return new Date(year, month - 1, day) < today;
}
