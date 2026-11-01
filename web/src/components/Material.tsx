import { useEffect, useState } from 'preact/hooks';
import type { Example } from '../data/examples';
import { festivalText, surveyRows } from '../data/festival';
import { pathTo } from '../utils/paths';

interface Props {
  prompt?: string;
  material?: Example['material'];
}

export default function Material({ prompt, material }: Props) {
  const [ready, setReady] = useState(false);
  const [message, setMessage] = useState('');
  useEffect(() => setReady(true), []);
  const samplePath = pathTo('samples/neighborhood-festival/');
  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setMessage('Zkopírováno.');
    } catch {
      setMessage('Kopírování se nezdařilo. Označte a zkopírujte text ručně níže.');
    }
  };

  return <>
    {prompt && <div class="chat-prompt"><strong>Vy</strong><p>{prompt}</p></div>}
    {material === 'phone' && <section class="phone-message" aria-label="Příchozí zpráva"><div class="phone-heading">Neznámý kontakt</div><div class="phone-bubble">Jsem v maléru. Potřebuju peníze hned, prosím nikomu nevolej.</div><p>Hlas při hovoru vám připomínal dceru. Číslo nemáte uložené.</p></section>}
    {material === 'redaction' && <section class="material-document" aria-label="Detail objednávky"><strong>Detail objednávky · OBJ-DEMO-042</strong><p>Zákazník: <span class="redacted" aria-label="jméno začerněno">████████</span><br />E-mail: zakaznik@example.invalid</p><p><strong>Nafukovací plameňák</strong><br />Stav objednávky: doručeno</p><hr /><strong>Vaše recenze</strong><p>Večer plameňák stál, ráno z něj byla růžová palačinka. Po jednom použití splaskl. Tohle mě zklamalo.</p></section>}
    {material === 'survey' && <section class="material-document" aria-label="Odpovědi v anketě"><strong>Odpovědi v anketě</strong><div class="table-scroll"><table class="survey-table"><thead><tr><th scope="col">Č.</th><th scope="col">Odpověď</th></tr></thead><tbody>{surveyRows.map((row, index) => <tr key={index}><th scope="row">{index + 1}</th><td>{row[0]}{row[1] && <span class="injection-passage">{row[1]}</span>}</td></tr>)}</tbody></table></div></section>}
    {material === 'festival' && <section class="festival-preview" aria-label="Náhled stránky"><div class="browser-address">{samplePath}</div><iframe src={samplePath} title="Sousedská slavnost – stránka k posouzení" sandbox="" /><p><a href={samplePath}>Otevřít stránku samostatně ↗</a></p>{ready && <div class="copy-buttons"><button type="button" class="button secondary" onClick={() => copy(`${prompt}\n${new URL(samplePath, window.location.origin).href}`)}>Kopírovat zadání a adresu</button><button type="button" class="button secondary" onClick={() => copy(`${prompt}\n\n${festivalText}`)}>Kopírovat zadání a text stránky</button></div>}<p role="status">{message}</p><details><summary>Text pro ruční zkopírování</summary><p>{prompt}</p><p>{samplePath}</p><pre>{festivalText}</pre></details></section>}
  </>;
}