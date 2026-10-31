# Bezpečnost AI: web k akci

## Česky

Tento repozitář obsahuje podklady a plán připravovaného webu k přednášce o bezpečnosti AI pro veřejnost a netechnické návštěvníky. Web má nabídnout pozvánku, dobrovolné krátké ukázky o přestávce a praktické zdroje dostupné i po akci.

## English

This repository contains the materials and implementation plan for a website accompanying a public talk on AI safety, intended for a general, non-technical audience. The website is planned to provide an event invitation, optional short interactive examples during the break, and practical resources available after the event.

An initial local prototype is available in `web/`. Its content and scope are still subject to confirmation and it is not ready for publication.

## Stav

Projekt obsahuje první lokální testovací verzi webu. Obsah a rozsah realizace podléhají potvrzení; nezveřejňovat neověřené údaje o akci ani smyšlené registrační odkazy.

Výchozím podkladem je místní pracovní plán webu. Projekt je samostatný; k práci nepotřebuje soubory jiného projektu. Změny plánů v jiných projektech se sem nepřenášejí automaticky.

- [Pokyny pro práci na projektu](AGENTS.md)
- [Pracovní plán a podklady pro web](docs/website-content.md)

Podklady obsahují detailní plán implementace, návrhy čtyř krátkých misí, reakce na jednotlivé volby, postup při incidentu, zdroje k ověření a kontrolní podmínky před spuštěním. Zaznamenávají také dosud nepotvrzené údaje a podmínky pro použití médií. Jde o pracovní návrhy, nikoli schválený obsah.

## Zamýšlené řešení

- Statický web s oddělenou pozvánkou a přestávkovým rozcestníkem, které sdílejí ukázky a zdroje.
- Dobrovolné krátké mise s vysvětlením a kartou praktického kroku, bez skóre, soutěžení či ukládání postupu.
- Statické generování pomocí Astro, vlastní CSS a malé interaktivní komponenty v Preactu; bez účtů, databáze a serverové AI.
- Přístupné ovládání, použitelnost na telefonu a dostupný obsah i bez JavaScriptu.
- Odpovědi návštěvníků zpracovávat pouze v prohlížeči, bez ukládání a odesílání.
- Hostování je plánováno na GitHub Pages na uživatelově účtu; konkrétní repozitář a adresu je třeba určit a před nasazením ověřit podmínky služby.

Konkrétní stránky, ukázky, zdroje, média a údaje o akci vzniknou až při navazující realizaci podle aktuálního a potvrzeného zadání.

## Lokální spuštění

Ve složce `web/` spusťte `npm install` a následně `npm run dev`. Produkční statické soubory vzniknou příkazem `npm run build` ve složce `web/dist/`; `npm run preview` spustí jejich místní náhled. Pro ověření umístění v podadresáři lze při sestavení nastavit proměnnou `SITE_BASE`, například na `/ai-safety-web/`.

Testovací obsah včetně náhradní ukázky není schválený k publikaci. Před zveřejněním je nutné potvrdit výběr ukázek, údaje, zdroje, případná média a provozovatele a provést kontroly uvedené v podkladech.

## Publikace na GitHub Pages

Workflow `.github/workflows/deploy.yml` sestaví obsah složky `web/` pro adresu nastavenou v GitHub Pages. Spouští se výhradně ručně z karty Actions; samotný push web nezveřejní. Před jeho spuštěním je nutné potvrdit obsah, provést kontroly před zveřejněním a odsouhlasit nasazení. Aby bylo workflow v GitHubu dostupné, musí být nejprve součástí výchozí větve repozitáře.