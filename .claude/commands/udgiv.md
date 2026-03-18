---
description: Gem alle ændringer og udgiv dem til linimatic.dk
---

Du skal gemme alle ændringer og udgive dem til websitet. Kommunikér på dansk hele vejen igennem.

Følg disse trin i rækkefølge:

1. Kør `npm run build` for at tjekke at alt virker korrekt. Dette tager typisk 30-60 sekunder — fortæl brugeren at du venter. Hvis der er fejl i bygningen, stop her og forklar problemet på enkel dansk uden tekniske termer.

2. Kør `git status` og `git diff --stat` for at se hvad der er ændret.

3. Lav en kort beskrivelse på engelsk af ændringerne baseret på hvad du så (til brug i commit-beskeden).

4. Kør `git add -A` for at tilføje alle ændringer.

5. Lav en commit: `git commit -m "din beskrivelse her"`

6. Kør `git push` for at sende ændringerne til GitHub.

7. Afslut med at fortælle brugeren på venlig dansk:
   - Hvad der blev gemt og udgivet
   - At websitet vil være opdateret inden for cirka 1-2 minutter
   - At de bare kan genindlæse linimatic.dk for at se ændringerne
