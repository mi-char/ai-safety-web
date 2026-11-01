# Pokyny pro projekt webu Bezpečnost AI

## Zadání a pracovní postup

- Web doplňuje přednášku o bezpečnosti AI. Je určen veřejnosti a netechnickým návštěvníkům včetně podnikatelů; piš česky, srozumitelně, věcně a bez zbytečného strašení.
- Před prací si přečti `docs/website-content.md` a ověř aktuální zadání uživatele. Místní podklad je samostatný pracovní plán, nikoli automaticky schválené zadání. Při nejasnostech nebo rozporu s novým zadáním požádej uživatele o upřesnění; práci nepodmiňuj přístupem k souborům jiného projektu.
- Potvrď výběr ukázek, údaje o akci, registraci, média a provozovatele před jejich zveřejněním. Nevymýšlej datum, cenu, kontakty, adresy ani jiné neznámé údaje. Zachovávej označení návrhů a nejistot.
- Web a jeho podklady udržuj v tomto repozitáři. Bez příslušného pokynu neupravuj jiné projekty; tento plán se s nimi automaticky nesynchronizuje.
- Nepřepisuj existující uživatelské změny a bez výslovného pokynu neprováděj commit ani veřejné nasazení.

## Obsah a zdroje

- Vytvoř oddělenou pozvánku a přestávkový rozcestník se společnými ukázkami a zdroji. Ukázky jsou dobrovolné, mají vlastní stabilní adresy a zůstávají dostupné i po akci.
- Vycházej z potvrzeného rozsahu; čtyři ukázky v podkladu jsou doporučením, nikoli schváleným výběrem. Další témata jsou zásobník nápadů.
- Každá ukázka má jednoduché zadání, srozumitelné vysvětlení, praktický závěr a zdroj. Umožni změnit volbu nebo zobrazit vysvětlení i bez odpovědi. Dobrovolný test může počítat body a zobrazit výsledek; ten není zárukou bezpečí. Nevytvářej žebříčky ani časové limity.
- Navržené krátké mise mají části situace, volba a vysvětlení s kartou praktického kroku. Po každé volbě ukaž věcnou zpětnou vazbu bez hodnocení návštěvníka; karta je dostupná i bez odpovědi a není zárukou bezpečí. Mise i jejich označení zůstávají k potvrzení.
- Vizuální ukázku a naléhavý telefonát označ jako ochutnávku tématu po přestávce. Před zveřejněním vizuální ukázky dolož konkrétní médium a práva; jinak použij schválenou náhradu. Z rozcestníku a telefonátu odkazuj na praktický postup při incidentu.
- Odlišuj fiktivní scénáře, doložené případy, odborná doporučení a interpretace. Před zveřejněním ověř konkrétní tvrzení, funkčnost a aktuálnost zdrojů; uveď jejich název, instituci, URL, datum a omezení, pokud jsou známé. Nepředstírej, že zdroj ověřuje tvrzení, které nepodporuje.
- Bez návodů k útokům, funkčních škodlivých promptů, phishingových šablon, aktivních podvodných odkazů a citlivých údajů. Neukazuj obavu o neveřejný výzkum jako prokázanou krádež dat.
- Před použitím každého média dolož původ, autora, práva a licenci. U zvuku a videa připrav přepis či titulky a textovou alternativu; automaticky je nepřehrávej. Rozpoznání jedné ukázky nevydávej za spolehlivý způsob rozpoznání všech deepfake.

## Vzhled a interakce

- Navazuj na stávající vzhled ve `web/src/styles/global.css` a opakovaně používej společné komponenty ukázek a testu. Zachovej světlé pozadí, tmavý text, systémové písmo, výraznější nadpisy, jemné dělicí linky a střídmé zelené a červenooranžové akcenty; nepřidávej externí fonty ani nesouvisející vizuální styl.
- Ukázky a test uspořádej přehledně: situace, případné médium či podklady, otázka s volbami, věcná zpětná vazba a rozbalitelné vysvětlení s praktickým krokem a zdroji. Doplňkové informace prezentuj ve stejném stylu jako existující úlohy, bez vnořených dekorativních karet.
- V testu a hodnotících ukázkách označ správnou zvolenou odpověď zeleně a nesprávnou červeně, včetně odpovídající zpětné vazby. Správnost sděl také textem a nespoléhej jen na barvu; neodpovězený či nepotvrzený stav ponech neutrální a neposuzuj návštěvníka.
- U výběru více možností umožni označení i odznačení před potvrzením. Vyhodnocení a případné body zobraz až po potvrzení; při změně volby zruš předchozí vyhodnocení a umožni nové potvrzení. Skóre po změně odpovědi přepočítej.
- Před odpovědí nenapovídej správnou možnost formulací zadání, voleb, popisků ani textové alternativy. Alternativa má věcně popsat podstatný obsah, zůstat přístupná bez přehrání a nepředpokládat původ média. Vysvětlení a zdroje umožni otevřít i bez odpovědi.
- U situací se zadáním pro AI ukaž krátký, srozumitelný příklad uživatelova promptu. U mediálních či historických ukázek ve vysvětlení podle potřeby nabídni kontext a odkazy k porovnání, jasně odliš skutečný záznam od vytvořeného a přiznej neověřený původ.
- Obsah vybírej pro veřejnou přednášku: používej přiměřené, nenásilné ukázky a neodváděj pozornost zbytečně nápadnými efekty. Zachovej responzivní rozložení, dostatečně velké ovládací prvky, viditelný fokus a stabilní rozměry médií.

## Technická a bezpečnostní pravidla

- Web je staticky generovaný: používej sémantické HTML, vlastní CSS a klientský JavaScript pro interakce, včetně dohodnutého Preactu. Nepřidávej serverovou AI, databázi, účty ani další framework bez konkrétní potřeby a dohody.
- Soubory a složky webu i slugy adres pojmenovávej anglicky; návštěvnický obsah ponech česky.
- Odpovědi a stav mise drž pouze v paměti zobrazené stránky, nikam je neodesílej ani neukládej. Nepoužívej volná pole na odpovědi ani nahrávání souborů. Nepřidávej vlastní analytiku, měřicí pixely, externí fonty ani vložené přehrávače třetích stran.
- Externí zdroj nebo registraci otevírej až na přání návštěvníka. Informace o soukromí přizpůsob skutečnému provozovateli a hostingu; neslibuj absolutní anonymitu.
- Web má být hostován na GitHub Pages na uživatelově účtu. Před nasazením ověř podmínky, limity a soukromí; používej cesty fungující i v podadresáři a ověř přímé adresy. Účet, repozitář a veřejnou adresu nedoplňuj odhadem.
- Navrhuj pro mobil a pomalejší síť. Bez JavaScriptu musí zůstat zadání, vysvětlení, karta praktického kroku a zdroje čitelné. Web vyžaduje internet a přednáška na něm nesmí záviset.
- Zachovej ovládání dotykem i klávesnicí, viditelný fokus, čitelný kontrast, zvětšitelný text a textové alternativy. Ověř relevantní kritéria WCAG 2.2, ale bez odpovídajícího auditu netvrď úplnou shodu.

## Ověření před předáním

- Otestuj obě vstupní stránky, přímé odkazy na ukázky, všechny volby a zpětné vazby, změnu volby, kartu i vysvětlení bez odpovědi, obnovení stránky a dostupnost při vypnutém JavaScriptu.
- Zkontroluj úzký i běžný displej, klávesnici, kontrast, alternativy médií, pomalejší připojení a běh z podadresáře. V čistém profilu prohlížeče zkontroluj síťové požadavky a jejich obsah i cookies, Local Storage, Session Storage, IndexedDB a případnou cache; volby ani postup se nesmí odesílat nebo ukládat.
- Před zveřejněním ověř finální odkazy, údaje o akci, zdroje a práva k médiím. QR kód vytvářej až pro ověřenou přestávkovou adresu; doplň čitelnou adresu a vyzkoušej načtení z projekce telefonem.
- Uveď provedené kontroly, známá omezení a neověřené nebo dosud nepotvrzené položky.