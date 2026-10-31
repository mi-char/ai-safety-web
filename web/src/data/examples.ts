export interface Source {
  name: string;
  organization: string;
  url: string;
  detail: string;
}

export interface Example {
  slug: string;
  number: string;
  category: string;
  title: string;
  description: string;
  duration: string;
  preview?: boolean;
  draftReplacement?: boolean;
  situation: string;
  question: string;
  options: { label: string; feedback: string }[];
  explanation: string;
  action: string;
  sources: Source[];
}

export const sources = {
  police: {
    name: 'Umělá inteligence a prevence podvodů',
    organization: 'Policie České republiky',
    url: 'https://policie.gov.cz/kyberkriminalita/umela-inteligence-a-prevence-podvodu',
    detail: 'Zdrojový kontext k ověřování požadavků; datum vydání a konkrétní použití je třeba ověřit.',
  },
  ftc: {
    name: 'Scammers use AI to enhance their family emergency schemes',
    organization: 'Federal Trade Commission',
    url: 'https://consumer.ftc.gov/consumer-alerts/2023/03/scammers-use-ai-enhance-their-family-emergency-schemes',
    detail: 'Březen 2023, anglicky. Doporučení zavolat dotyčnému na dříve známé číslo; převod a aktuálnost ověřit.',
  },
  owasp: {
    name: 'LLM01: Prompt Injection',
    organization: 'OWASP',
    url: 'https://genai.owasp.org/llmrisk/llm01-prompt-injection/',
    detail: 'Zdrojový kontext k cizím pokynům v obsahu; konkrétní použití a aktuálnost ověřit.',
  },
  nukib: {
    name: 'Rizika spojená s využíváním umělé inteligence',
    organization: 'NÚKIB',
    url: 'https://osveta.nukib.gov.cz/mod/page/view.php?id=4725',
    detail: 'Zdrojový kontext k používání AI a sdílení dat; konkrétní použití a aktuálnost ověřit.',
  },
  incident: {
    name: 'Než půjdete na policii',
    organization: 'Policie České republiky',
    url: 'https://policie.gov.cz/kyberkriminalita/nez-pujdete-na-policii',
    detail: 'Zdrojový kontext k postupu po incidentu; datum vydání a konkrétní doporučení ověřit.',
  },
} satisfies Record<string, Source>;

export const examples: Example[] = [
  {
    slug: 'urgent-phone-call', number: '01', category: 'Doma a rodina',
    title: 'Naléhavý telefonát',
    description: 'Známý hlas žádá o rychlou pomoc. Jak si ověřit, s kým mluvíte?',
    duration: '1–2 min', preview: true,
    situation: 'Volá vám někdo, kdo zní jako člen rodiny. Tvrdí, že je v problémech, a žádá vás o rychlé zaslání peněz. Tento příběh je fiktivní; nevíme, zda byl hlas vytvořen pomocí AI.',
    question: 'Co byste v této situaci udělali?',
    options: [
      { label: 'Peníze hned odešlu.', feedback: 'Naléhavost a známý hlas samy nepotvrzují totožnost. Před platbou je bezpečnější požadavek nezávisle ověřit.' },
      { label: 'Zavolám na číslo, které mi volající nadiktuje.', feedback: 'Číslo z hovoru nemusí vést k dotyčnému. Pro ověření použijte kontakt, který jste znali už dříve.' },
      { label: 'Ukončím hovor a zavolám příbuznému na známé číslo.', feedback: 'To je nezávislý způsob ověření. Pokud se nedovoláte, zkuste jiného důvěryhodného člověka.' },
    ],
    explanation: 'Známý hlas ani naléhavý příběh nestačí k ověření totožnosti. Důležité je získat potvrzení jinou, dříve známou cestou.',
    action: 'Ukončete hovor a ověřte požadavek přes dříve známý kontakt.',
    sources: [sources.police, sources.ftc],
  },
  {
    slug: 'checking-ai-answers', number: '02', category: 'Ověřování informací',
    title: 'Je odpověď AI podložená?',
    description: 'I přesvědčivá odpověď se zdrojem může původní doporučení zkreslit.',
    duration: '2 min',
    situation: 'Představte si záměrně vymyšlenou odpověď: „Podle FTC stačí u naléhavé žádosti o peníze poznat hlas volajícího.“ Nejde o skutečný výstup konkrétní AI služby.',
    question: 'Jak byste si tvrzení ověřili?',
    options: [
      { label: 'Budu odpovědi věřit, protože uvádí zdroj.', feedback: 'Samotná citace nestačí. Je potřeba zjistit, co původní zdroj skutečně říká.' },
      { label: 'Otevřu původní zdroj a porovnám doporučení.', feedback: 'Zdroj doporučuje zavolat dotyčnému na číslo, o kterém víte, že je jeho. Vymyšlená odpověď toto doporučení zkresluje.' },
      { label: 'Požádám stejnou AI o potvrzení.', feedback: 'Další odpověď může pomoci s hledáním, ale nenahrazuje kontrolu původního zdroje.' },
    ],
    explanation: 'Přesvědčivé znění ani odkaz samy o sobě nezaručují, že odpověď zdroj správně interpretuje.',
    action: 'Otevřete původní zdroj a porovnejte jej s tvrzením.',
    sources: [sources.ftc],
  },
  {
    slug: 'unknown-document-instruction', number: '03', category: 'Práce a AI',
    title: 'Neznámý pokyn v dokumentu',
    description: 'Asistent shrnuje cizí dokument, který obsahuje také požadavek na změnu úkolu.',
    duration: '2 min',
    situation: 'Máte asistenta, který má shrnout dokument. V dokumentu se objeví cizí požadavek, aby asistent změnil úkol nebo provedl jinou akci. Jde o ilustrativní situaci bez živého asistenta.',
    question: 'Co je důležité v této situaci rozlišit?',
    options: [
      { label: 'Požadavek v dokumentu je automaticky nové zadání.', feedback: 'Dokument je cizí obsah, nikoli automaticky nový pokyn jeho uživatele.' },
      { label: 'Asistent má zůstat u původního úkolu a mít přiměřená oprávnění.', feedback: 'Je užitečné oddělit obsah od zadání, omezit přístup a citlivé akce schvalovat.' },
      { label: 'Přítomnost požadavku znamená, že data už unikla.', feedback: 'Samotná přítomnost požadavku neprokazuje úspěšný útok ani únik dat.' },
    ],
    explanation: 'Model může hranici mezi zadáním a cizím obsahem zaměnit. Dopad závisí také na jeho možnostech a dalších kontrolách; samotná instrukce není zárukou ochrany.',
    action: 'Cizí obsah je podklad, nikoli automaticky váš pokyn; kontrolujte oprávnění.',
    sources: [sources.owasp],
  },
  {
    slug: 'sharing-with-ai', number: '04', category: 'Práce a data',
    title: 'Co sdílet s AI?',
    description: 'Pracovní návrh náhradní ukázky o tom, jak přemýšlet o sdílených údajích.',
    duration: '2 min', draftReplacement: true,
    situation: 'Potřebujete pomoci s obecným návrhem e-mailu. Přemýšlíte, zda do AI služby vložit celý pracovní dokument se jmény a dalšími údaji. Situace je fiktivní.',
    question: 'Jak byste k zadání přistoupili?',
    options: [
      { label: 'Vložím celý dokument, i když údaje nejsou potřeba.', feedback: 'Před sdílením má smysl zvážit, zda jsou údaje k úkolu nezbytné a zda je jejich vložení povolené.' },
      { label: 'Popíšu úkol obecně a použiji jen nezbytné údaje.', feedback: 'Omezení sdílených údajů může snížit množství informací předaných službě. Je také důležité ověřit její podmínky a firemní pravidla.' },
      { label: 'Budu předpokládat, že všechny AI služby s daty zacházejí stejně.', feedback: 'Podmínky závisejí na konkrétní službě, produktu a jeho nastavení.' },
    ],
    explanation: 'Před sdílením zvažte citlivost a nezbytnost údajů. Podmínky zpracování se mohou lišit podle konkrétní služby a nastavení.',
    action: 'Sdílejte pouze potřebné údaje a ověřte pravidla konkrétní služby.',
    sources: [sources.nukib],
  },
];