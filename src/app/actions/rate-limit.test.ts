import assert from "node:assert/strict";
import test from "node:test";
import { createRateLimiter } from "./rate-limit.ts";

test("removes expired IP entries during later requests", () => {
  const limiter = createRateLimiter({
    windowMs: 100,
    maxSubmissions: 5,
    maxKeys: 10,
  });

  assert.equal(limiter.isRateLimited("first", 0), false);
  assert.equal(limiter.isRateLimited("second", 10), false);
  assert.equal(limiter.trackedKeyCount(), 2);

  assert.equal(limiter.isRateLimited("later", 111), false);
  assert.equal(limiter.trackedKeyCount(), 1);
});
