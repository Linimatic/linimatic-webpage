import assert from "node:assert/strict";
import test from "node:test";
import {
  buildContactEmailSubject,
  getSubjectLabel,
  getVolumeLabel,
} from "./contact-format.ts";

test("builds a generic subject without visitor identity", () => {
  assert.equal(
    buildContactEmailSubject("New Project"),
    "Linimatic website enquiry — New Project",
  );
});

test("maps untrusted select values to safe labels", () => {
  assert.equal(getSubjectLabel("new-project"), "New Project");
  assert.equal(getSubjectLabel("unexpected\nsubject"), "General Inquiry");
  assert.equal(getVolumeLabel("5k-15k"), "5,000–15,000 pcs");
  assert.equal(getVolumeLabel("unexpected"), "Not specified");
});
