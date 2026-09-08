# The case questionnaire — getting the facts

Cases are **reported, not invented**. This file is the complete question set for sourcing a case. It replaces guesswork with a short, adaptive interview — and doubles as a form that can be forwarded to whoever actually holds the facts.

Notes, fragments, and raw numbers are better answers than polished sentences. A question nobody can answer becomes an open gap in the fact sheet — **never an invented fact**.

## Two ways to run it

**A. Live interview (default).** Run it as a conversation in the session:

- Ask in **small batches — 2 to 4 questions at a time**, never the whole list. Twenty questions at once produces twenty shallow answers or none.
- **Skip what you already know.** Read what you were handed first (the chat, the fact sheet in `docs/cases/`, the existing site copy); only ask for what's actually missing.
- Start with Round 1. Then take stock: say in one line what you have and what's still thin, and pick the **3–6 Round 2 questions that would most raise the proof** — not all of them.
- Answers like "I don't know" or "I'd have to check" are fine — record who *would* know, and move on.
- Close by **reading the facts back** for confirmation before drafting.

**B. Forwardable form.** When the facts sit with someone outside the session — a colleague in technical sales, or the customer's own contact — assemble the *relevant unanswered* questions into a short document and give it to the requester to forward. Offer to produce it as a Word file (the `docx` skill) if it's going to be emailed. Keep it under one page: the floor questions plus the few Round 2 questions that matter for this case.

## Language

- With **Jan**, ask in **plain Danish**. He's a die-casting domain expert — manufacturing terms (tolerancer, forkromning, sprøjtehastighed, kassation) are fine. What must be translated is *web and marketing* jargon: never say "hero metric", "baseline", "proof artifact" or "CTA".
- Suggested Danish phrasings are marked **▸ DA** below. Use them as a starting point, not a script — natural conversation beats form-reading.

---

## Round 1 — the floor (required before drafting)

Without these four, the result is a brochure, not a case.

**1. The customer.** Who is it, what do they make, and roughly how big are they (people, sites, volumes — whatever conveys scale)? May we use their name and logo publicly, or does someone need to approve that first — and if so, who?
▸ DA: *"Hvem er kunden, og hvad laver de? Og må vi bruge deres navn og logo offentligt — eller skal nogen hos dem godkende det først?"*

**2. The part.** What did we make for them, and what does it do inside their product?
▸ DA: *"Hvilket emne lavede vi til dem — og hvad gør det inde i deres produkt?"*

**3. The problem and the stakes.** What was hard about it — why did they come to us rather than anyone else? And what would it have cost them if it hadn't been solved (stopped production, reklamationer, a delayed launch, a dropped design)?
▸ DA: *"Hvad var det svære ved opgaven — hvorfor kom de til os og ikke til andre? Og hvad ville det have kostet dem, hvis det ikke var blevet løst?"*

**4. The number.** What is the one number that best proves it worked? For example: how many parts a year, how many years in production, how large a share approved on the first pass, how few complaints. If nobody else could do the job at all, the number can be the *difficulty* instead: the tolerance, the spec, the constraint.
▸ DA: *"Hvad er det ene tal, der bedst viser, at det lykkedes? F.eks. hvor mange emner om året, hvor mange år i produktion, hvor stor en andel godkendt i første forsøg, hvor få reklamationer. Hvis ingen andre overhovedet kunne løfte opgaven, kan tallet i stedet være selve sværhedsgraden — tolerancen eller kravet."*

## Round 2 — deepeners (pick the 3–6 that close this case's gaps)

Each answered question makes the case harder to discount. Which ones to ask depends on what Round 1 produced:

**Got a clean before/after result?** Get *both* numbers and how they were measured — a "40% better" with no baseline and no method is easy to dismiss.
▸ DA: *"Hvordan så det ud før — og hvordan blev det målt?"*

**Got a hard-problem case (nobody else could)?** Get the difficulty in numbers, and whether other suppliers declined or failed first — and why it was hard.
▸ DA: *"Var der andre støberier, der sagde nej eller ikke kunne holde kravene? Hvad var det præcist, der gjorde det svært?"*

**The key decision.** Not everything we did — the *one* choice that made the difference, and what the alternative would have cost. This is where expertise shows.
▸ DA: *"Hvad var det ene valg undervejs, der gjorde forskellen — og hvad havde alternativet været?"*

**A real quote.** One sentence from the customer, in their own words — verbatim if it exists, otherwise: who could give one, and would they go on record?
▸ DA: *"Har kunden sagt noget om samarbejdet, vi kan citere? Ellers — hvem hos dem kunne give os én sætning?"*

**Proof to show.** A photo of the actual part, real production data, a spec table. Check `public/images/cases/` first — several candidate photos may already exist.
▸ DA: *"Har vi et godt foto af selve emnet — eller data, vi kan vise frem?"*

**The relationship.** Since when have we delivered, at what volumes, and is it ongoing? Longevity is proof of its own.
▸ DA: *"Hvor længe har vi leveret til dem, hvor meget om året — og kører det stadig?"*

## Spec fields (feed the metric line and the technical detail)

Quick factual fill-ins — one line each. These make the case concrete for the engineer reading it:

```
Component / product name:
Application (what it does in their product):
Annual volume:
Alloy:
Key tolerances:
Surface finish / treatment:
Services involved (→ prototyping / die-casting / post-processing /
                    surface-treatment / quality / assembly):
Year started / years in production:
```

## Logistics

- **Permission**: name + logo — yes / no / who needs to ask? Record the answer and date in the fact sheet.
- **Anything off the record?** Whatever the customer wants kept private stays out of the case *and out of the repo entirely*.

## Numbers that bite (when the interviewee needs prompting)

Tolerances held (±X mm) · first-pass yield / kassationsprocent · field returns / reklamationer · parts per year · years in continuous production · number of suppliers who declined to quote · lead time · cost vs. the previous solution or supplier · batches delivered with consistent finish.

---

## After the questions

1. **Read the facts back** to the requester (in Danish for Jan) and get a confirmation — misheard numbers are fabrications with extra steps.
2. **Write the fact sheet** to `docs/cases/<slug>.md`: the confirmed facts, verbatim quotes with attribution, permission status with date, and a short *"Open gaps"* list naming what's missing and who could supply it.
3. **Draft only what the facts support.** A missing floor fact means that section isn't written confidently — a missing result number becomes the site's placeholder convention (see `site-integration.md`), never a plausible-sounding invention.
