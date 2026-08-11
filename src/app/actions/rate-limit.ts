type RateLimiterOptions = {
  windowMs?: number;
  maxSubmissions?: number;
  maxKeys?: number;
};

type RateLimiter = {
  isRateLimited(key: string, now?: number): boolean;
  trackedKeyCount(): number;
};

const DEFAULT_WINDOW_MS = 10 * 60 * 1000;
const DEFAULT_MAX_SUBMISSIONS = 5;
const DEFAULT_MAX_KEYS = 5000;

export function createRateLimiter({
  windowMs = DEFAULT_WINDOW_MS,
  maxSubmissions = DEFAULT_MAX_SUBMISSIONS,
  maxKeys = DEFAULT_MAX_KEYS,
}: RateLimiterOptions = {}): RateLimiter {
  const submissions = new Map<string, number[]>();

  function isRateLimited(key: string, now = Date.now()): boolean {
    for (const [entryKey, timestamps] of submissions) {
      const recent = timestamps.filter((timestamp) => now - timestamp < windowMs);
      if (recent.length === 0) submissions.delete(entryKey);
      else submissions.set(entryKey, recent);
    }

    const recent = submissions.get(key) ?? [];
    if (recent.length >= maxSubmissions) {
      submissions.set(key, recent);
      return true;
    }

    recent.push(now);
    submissions.set(key, recent);

    if (submissions.size > maxKeys) {
      const oldestKey = submissions.keys().next().value;
      if (typeof oldestKey === "string") submissions.delete(oldestKey);
    }

    return false;
  }

  return {
    isRateLimited,
    trackedKeyCount: () => submissions.size,
  };
}

export const rateLimiter = createRateLimiter();
