---
description: Gem alle ændringer til hjemmesiden og udgiv dem
---

Du skal gemme alle ændringer og udgive dem til websitet. Kommunikér på dansk hele vejen igennem.

Følg disse trin i rækkefølge:

1. Kør `git fetch origin` og `git status -sb`. Hjemmesiden redigeres også fra Linimatics
   chat-baserede redigeringsværktøj, som udgiver til `master`. Er den lokale kopi bagud,
   så hent det nye ned (`git pull --rebase`) **før** du bygger, så to redigeringsveje ikke
   støder sammen.

2. Kør `npm run build` for at tjekke at alt virker korrekt. Dette tager typisk 30-60 sekunder — fortæl brugeren at du venter. Hvis der er fejl i bygningen, stop her og forklar problemet på enkel dansk uden tekniske termer.

3. Kør `git status` og `git diff --stat` for at se hvad der er ændret.

4. Lav en kort beskrivelse på engelsk af ændringerne baseret på hvad du så (til brug i commit-beskeden).

5. Kør `git add -A` for at tilføje alle ændringer.

6. Lav en commit: `git commit -m "din beskrivelse her"`

7. Kør `git push` for at sende ændringerne til GitHub.

8. Afslut med at fortælle brugeren på venlig dansk:
   - Hvad der blev gemt og udgivet
   - At hjemmesiden er opdateret på linimatic.eu inden for cirka 1-2 minutter

**Vigtigt:** Hjemmesiden er live siden 12. august 2026 — linimatic.eu viser dette projekt, og
linimatic.dk sender besøgende videre dertil. En udgivelse er altså synlig for kunder med det
samme. Sig det ligeud, og nævn at det tager cirka 1-2 minutter, før ændringen er slået igennem.
Selve domæne-opsætningen rører du aldrig — den er Marcs.
