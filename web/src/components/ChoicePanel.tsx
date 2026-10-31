import { useEffect, useState } from 'preact/hooks';
import EmailMessage from './EmailMessage';
import ScenarioExplorer from './ScenarioExplorer';
import type { Example } from '../data/examples';
import { pathTo } from '../utils/paths';

interface Props {
  question: string;
  options: { label: string; feedback: string }[];
  correctOption: number;
  email?: Example['email'];
  activity?: Example['activity'];
  portraits?: Example['portraits'];
  revealExplanation?: { explanation: string; action: string };
  selected?: number | null;
  onSelect?: (index: number) => void;
}

export default function ChoicePanel({ question, options, correctOption, email, activity, portraits, revealExplanation, selected: controlledSelection, onSelect }: Props) {
  const [localSelection, setLocalSelection] = useState<number | null>(null);
  const [ready, setReady] = useState(false);
  const selected = controlledSelection === undefined ? localSelection : controlledSelection;

  useEffect(() => setReady(true), []);

  return (
    <div class="choice-panel">
      {email && <EmailMessage email={email} />}
      {activity && <ScenarioExplorer activity={activity} />}
      <fieldset>
        <legend>{question}</legend>
        <div class={portraits ? 'portrait-grid' : 'choice-list'}>
          {options.map((option, index) => (
            <label class={`choice-option ${portraits ? 'portrait-option' : ''} ${selected === index ? 'is-selected' : ''}`} key={option.label}>
              {portraits && <img src={pathTo(portraits[index].src)} alt={portraits[index].alt} width={portraits[index].width} height={portraits[index].height} loading="lazy" />}
              <span class="choice-control"><input type="radio" name="choice" checked={selected === index} onChange={() => { setLocalSelection(index); onSelect?.(index); }} /><span>{option.label}</span></span>
            </label>
          ))}
        </div>
      </fieldset>
      {portraits && <details class="portrait-alternative"><summary>Textová alternativa</summary><p>Popisy portrétů nejsou důkazem jejich původu. Praktický závěr: původ obrázku a důležitá tvrzení ověřujte nezávisle na tom, jak obrázek působí.</p></details>}
      {ready && <div class="choice-feedback" aria-live="polite" aria-atomic="true">{selected !== null && <><strong>{selected === correctOption ? 'Správně, dobrý postřeh!' : 'Nápověda'}</strong><p>{options[selected].feedback}</p></>}</div>}
      {!ready && <div class="fallback-feedback"><p>Vysvětlení jednotlivých možností:</p>{options.map((option) => <details key={option.label}><summary>{option.label}</summary><p>{option.feedback}</p></details>)}</div>}
      {revealExplanation && <details class="explanation choice-explanation" open={selected !== null}><summary>Vysvětlení a praktický krok</summary><p>{revealExplanation.explanation}</p><div class="action-card"><div class="step-label">PRAKTICKÝ KROK</div><p>{revealExplanation.action}</p><small>Doporučení není zárukou bezpečí.</small></div></details>}
    </div>
  );
}