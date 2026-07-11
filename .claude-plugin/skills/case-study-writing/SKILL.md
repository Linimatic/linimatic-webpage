---
name: case-study-writing
description: End-to-end playbook for the customer cases on the Linimatic website, and for credible B2B case studies generally — qualifying which projects to feature, interviewing for the facts, writing the challenge/approach/result narrative, producing all three languages (da/en/de), and wiring the case into the site. Use whenever the user wants to create a new case; improve or finish an existing one (e.g. a missing result figure or placeholder); turn a delivered project, customer win, or client engagement into a published story; choose which cases to feature; or gather case material from a customer or colleague. Trigger on "case study", "customer story", "success story", "write up this project" — and in Danish "ny case", "kundecase", "kundehistorie", "case til hjemmesiden", "vores cases", "referencer". Do NOT use for standalone testimonials, press releases, or generic blog posts with no specific customer outcome.
---

# Writing Linimatic's case studies

A case study isn't a success story — it's **evidence**. Its job is to answer the one question every serious buyer arrives with:

> *"Have you solved a problem like mine, for a company like mine, and can you prove it?"*

Three things must be true for a case to do its job: **relevance** (a problem like theirs), **similarity** (a buyer like them), and **proof** (verifiable that it worked). Miss any one and you've written a brochure. Above every other rule, hold this model:

> **A case study is a story with the customer as the hero and a number as the punchline.**

Most weak cases drop half of it — a dry spec sheet with no story, or a warm story with nothing to verify. Keep both halves: the narrative is what gets read and remembered; the number is what gets believed.

---

## The pipeline — from "let's make a case" to live page

This is the default workflow. Steps 2 and 6 are gates — never skip them.

**0. Adapt to who's asking.** With **Jan** (CEO, non-technical about software but a domain expert in die-casting): speak plain Danish, use manufacturing terms freely but never web/marketing jargon, ask questions in small batches, and never offer him technical options — the *how* is yours. With **Marc**: terse and technical. (Full rules in the repo `CLAUDE.md`.)

**1. Qualify the case** against §1 below. If the project doesn't teach the reader something the existing cases don't already teach, say so and recommend a stronger candidate.

**2. Gather the facts — the gate.** Run **[`references/questionnaire.md`](references/questionnaire.md)**: a short adaptive interview (default) or a forwardable fill-in form for whoever holds the facts. Real cases are reported, not invented. Before drafting, take stock out loud — one line naming which required facts you have and which are missing. The fluent-but-empty draft begins exactly where this check is skipped.

**3. Save the fact sheet.** Write what was gathered to `docs/cases/<slug>.md` in this repo (create the folder if missing): the facts, verbatim quotes with who said them, permission status, and open gaps. Future sessions must be able to see what's missing without re-interviewing anyone. Anything the customer wants off the record stays out of the repo entirely.

**4. Draft in Danish first.** Danish is the source of truth. Fill the site's content slots (§3) from the fact sheet. A missing fact becomes a labeled gap — never a confident-sounding sentence.

**5. Preview and approve.** Add the case to the site per **[`references/site-integration.md`](references/site-integration.md)**, start the dev server, and show the requester the actual page. With Jan: confirm the *effect* in a sentence or two, yes/no.

**6. Translate to English and German.** All facts, numbers, and units identical across the three languages; only the prose is translated. Formatting conventions per language are in `site-integration.md`.

**7. Quality gate.** Run the definition-of-done checklist (§7). Anything unchecked either gets fixed or becomes an explicit, labeled placeholder.

**8. Publish.** Jan publishes via the `/udgiv` command; Marc commits and pushes himself. Never claim the change is visible on linimatic.dk — the new site isn't on the domain yet.

**Fast path — finishing an existing case.** Many jobs are gap-filling, not new cases: `grep -r "PLADSHOLDER" messages/` finds every result still missing a number. For those, skip to step 2, ask only the one or two questions that close the gap, then update **all three** language files and republish.

---

## 1. Pick the right cases

The selection is a positioning decision, not a popularity contest. Choose by **strategic value, not by biggest logo or biggest invoice.**

- **Feature what you want to be known for.** Linimatic's positioning is *"de bedste til det sværeste"* — every case should contain a hard problem. A case about easy, routine work repositions the company as a commodity vendor, even though it's "positive."
- **Cover the buyer segments.** Each case is a mirror; a prospect should find one where they recognize their own industry and problem and think *"that's me."*
- **Cover the range of capability** across the set, so collectively the cases show the full breadth of the services.
- **Mix recognizable and impressive.** A known name (VELUX, DeWalt) lends borrowed credibility; a lesser-known client with a more technically impressive story often persuades the expert buyer more. Use both.
- **A few strong beats many thin.** 3–8 deeply-proven cases outperform 20 shallow ones.
- **Each case needs a distinct reason to exist** — a different industry, a different kind of hard, a different proof. If two cases are interchangeable, cut one.

## 2. The input contract

The failure that ruins a case is starting to write before the facts are in: the prose comes out fluent and empty, adjectives standing in for numbers nobody supplied. Three inputs are the **required floor** — they map to the three jobs a case does:

| Required input | The job it does | If it's missing |
|---|---|---|
| **Customer + segment** — name (or an honest anonymized descriptor) plus industry and rough size | **similarity** — the reader must recognize themselves | Ask. If genuinely unnamable, anonymize — never invent a client. |
| **Problem + stakes** — what was hard, and what it would have cost to leave unsolved | **relevance** — the stakes are the tension the story turns on | Ask: *"what would have happened if this stayed unsolved?"* |
| **One quantified outcome** — the hero metric; or, for a hard-problem case with no baseline, the quantified *difficulty* | **proof** — a case with no number is just a testimonial | Ask for the number. If none exists yet, it becomes a labeled placeholder — never a fabrication. |

Everything beyond the floor doesn't gate the case — it *deepens* it. The follow-up questions are adaptive: read what you were handed, see what's thin, and ask the few sharp questions that would most raise the proof. A good intake is 3–6 prioritized questions, not an interrogation. The full question set, in both English and plain Danish, is in **[`references/questionnaire.md`](references/questionnaire.md)**.

Before anything ships, **confirm permission** to name the customer and use their logo, and record the answer in the fact sheet. No permission → anonymize; the technical story still carries the case.

## 3. Structure: the arc, mapped to the site

Every good case rides the same spine — **Problem → Approach → Result** — because that's how people process a story. On this site the spine is fixed; writing a case means filling these slots (field-by-field guidance in `site-integration.md`):

| Site slot | What goes there |
|---|---|
| `title` | The narrative headline — the hard thing, from the customer's world. Not "we did X" but "the X nobody else would quote". |
| `metric` | The hero line: 1–2 hard facts, `fact · fact` format. This is the number-as-punchline, visible on the card and the hero. |
| `overview` | 2–3 sentences a skimmer can stop at: who, what part, why it was hard, that it worked. |
| `challenge` | What was hard — technically specific — and what was at stake if it stayed unsolved. |
| `approach` | What Linimatic did and **why** — the key decisions and tradeoffs, not a list of activities. This is where expertise shows. |
| `result` | The quantified payoff the whole piece builds toward. The single most important slot. |
| `capabilities` | Which services carried the case (links to service pages). |

Write for **two speeds**: the card and hero serve the majority who skim; the reader who continues gets the full argument.

## 4. The proof that makes it credible

This is what separates a real case from a testimonial. The single most common failure is a result with no number behind it.

- **Numbers on both ends — quantify the problem, not just the win.** A result figure floating alone has nothing to land against. Quantify the difficulty *first*: the tolerance nobody else would hold, the scrap rate, the downtime cost. For hard-problem cases with no baseline (nobody else could do it), the quantified *difficulty itself* is the proof.
- **Name the stakes.** Why did this matter to *their* business — field failures, a stopped line, a recall risk, a blown launch?
- **One real customer quote.** A single human sentence in the customer's voice outweighs paragraphs of your prose, because it's the one part the reader knows you didn't write. Never invent one.
- **Proof artifacts.** A photo of the actual part, a spec table, a chart of real data. Show, don't assert.

Specificity *is* credibility: a technical reader discounts every adjective and trusts every number.

> ❌ "We delivered a high-quality component with excellent reliability and a great partnership."
>
> ✅ "Three foundries declined to quote the ±0.05 mm internal geometry. We've shipped it at 99.2% first-pass yield for 8 years — zero field returns."

## 5. The craft (voice)

- **Customer is the hero; Linimatic is the guide — start to finish.** Lead with *their* problem, not company history. And don't let the ending pivot to self-praise: a CTA that asks *"have a part like this?"* keeps the reader the hero; *"we're the best at this"* steals the role back.
- **Tell it with tension and resolution** — a story, not a feature list.
- **Write for the actual reader's decision criteria.** The engineer wants tolerances and process detail; procurement wants reliability, lead time, single-source risk. Business outcome in the headline, technical depth in the body.
- **Concrete over abstract; cut the adjectives.** Replace "cutting-edge" and "innovative" with the specific fact they're gesturing at.
- **Be exactly true.** Under-claim before you over-claim. Zinc die-casting is a tight niche: an inflated number is trivially exposed, and that credibility loss is permanent.

## 6. Failure modes to avoid

- **Company-centric** ("we are great") instead of customer-centric ("their problem, solved").
- **Vague results** — "improved efficiency," "great partnership" — with no number. The most common failure.
- **Feature dump, no narrative** — everything you did, no stakes, no story.
- **Same angle every case** — consistent *structure* is good; the defect is every case making the same *point*.
- **Fabricated or unpermissioned claims** — invented metrics or quotes, or a client's name/logo without sign-off.
- **Writing before the facts are in** — if you're reaching for adjectives, you're missing a number; go get it, don't pad around it.
- **A case that exists in only one or two languages, or whose facts drift between them.** Same facts, same numbers, all three files.

## 7. Definition of done

Before publishing, verify every line:

- [ ] Customer, problem + stakes, and at least one hard number are present — or the number is an explicit placeholder the requester has accepted
- [ ] The `metric` line carries a real fact, not a slogan
- [ ] Challenge quantifies the difficulty; result quantifies the payoff
- [ ] Approach explains at least one decision and its *why*
- [ ] Permission to name the customer is confirmed and recorded in `docs/cases/<slug>.md` (or the case is anonymized)
- [ ] No invented facts, numbers, or quotes anywhere
- [ ] All three languages (`da`, `en`, `de`) complete, facts and numbers identical
- [ ] Case registered everywhere the site requires (slug lists, images, sitemap — the checklist in `site-integration.md`)
- [ ] Previewed in the browser on all three locales — listing card and detail page
- [ ] Fact sheet in `docs/cases/<slug>.md` is up to date, open gaps listed

---

## References

- **[`references/questionnaire.md`](references/questionnaire.md)** — the fact-gathering questions: adaptive interview (default) and forwardable form, English and plain Danish.
- **[`references/site-integration.md`](references/site-integration.md)** — the mechanics: every file a case touches, field-by-field content model, formatting conventions, placeholder convention, preview, publish.

**The one-line version:** get the facts before you write, pick cases that prove *"de bedste til det sværeste"*, tell each as the customer's story, land it on a verified number, and ship it in all three languages.
