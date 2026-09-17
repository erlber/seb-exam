# KVN SEB-portal

Startsiden åpnes i vanlig nettleser. **Elevportal** viser en dialog med oppstart med eller uten Word. **Lærerportal** åpner `teacher.html` i samme nettleser med eksisterende Microsoft-innlogging og ansattkontroll.

## Testbranch: web-seb-launcher

Nettvalget er implementert. Full SEB-flyt krever oppdaterte konfigurasjonsfiler før utrulling.

### SEB-filene må eksporteres på nytt

De eksisterende `SebEksamen.seb` og `SebEksamenWord.seb` har prefikset `pwcc` etter gzip-dekomprimering: kryptert klientkonfigurasjon. De er bevart uendret. Startadressene kan ikke kontrolleres eller endres uten å åpne filene med riktig passord i SEB Configuration Tool.

1. Åpne hver fil i SEB Configuration Tool med eksisterende passord.
2. Sett Start URL direkte til elevportalen:
   - Uten Word: `https://erlber.github.io/seb-exam/student.html?config=default`
   - Med Word: `https://erlber.github.io/seb-exam/student.html?config=word`
3. Velg **Use SEB settings file for: starting an exam** ved lagring.
4. Behold skolens eksisterende restriksjoner, avslutningsinnstillinger og beskyttelse. Kontroller at riktige ressurser er tillatt i hver variant.
5. Erstatt filene med samme navn på testbranchen. Ikke legg passord eller dekrypterte innstillinger i Git.
6. Hvis eksamenssystemet validerer Browser Exam Key / Config Key, oppdater disse for de nye filene.

Start URL skal ikke peke til `index.html`: det ville sende eleven tilbake til oppstartsvalget inne i SEB. Parameteren `config` styrer synlige ressurslenker; SEB-filens regler håndhever begrensningene.

Filformat: https://safeexambrowser.org/developer/seb-file-format.html

## Test uten å bytte produksjon

En Git-branch får ikke automatisk sin egen GitHub Pages-adresse. Eksisterende produksjonsside viser ikke disse endringene før de publiseres.

For å prøve startsiden: hent testbranchen og server repository-roten lokalt, eksempelvis med `python -m http.server 5501 --bind 127.0.0.1`. Åpne `http://localhost:5501/`. Ikke bruk `file://` for full funksjonstest.

- Elevportal skal åpne dialogen uten å navigere eller logge inn.
- Prøv begge valgene. HTTPS bruker `sebs://`, lokal HTTP bruker `seb://`, og filene hentes fra samme mappe som siden.
- Escape, lukkeknappen og klikk utenfor dialogen skal lukke den. Tastaturfokus skal gå tilbake til Elevportal.
- Prøv smal skjerm og tastaturnavigasjon.
- Lærerportal skal åpne `teacher.html` uten å starte SEB.
- Nedlastingslenkene er reservevei hvis nettleseren ikke åpner SEB.

Full ende-til-ende-test må gjøres på en testmaskin med skolens SEB-versjon og oppdaterte filer. En lokal launcher med eksisterende filer kan fortsatt åpne produksjonsportalen eller endre klientinnstillinger; det er ikke en isolert eksamenstest.

For et separat HTTPS-testmiljø må begge SEB-startadressene og Microsoft redirect URI-ene i elev- og lærersidene tilpasses testadressen, og redirect URI-ene registreres i Entra. Dagens sider bruker også produksjonens Firestore; bruk et separat Firebase-prosjekt hvis testen skal isoleres fra reelle elevregistreringer. Ingen hosting-, Entra-, Firestore- eller Intune-innstillinger er endret i denne branchen.

Etter vellykket pilot kan Intune distribuere én snarvei til startsiden og fortsatt håndtere installasjon/oppdatering av SEB.
