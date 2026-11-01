import { useEffect, useState } from 'preact/hooks';
import EmailMessage from './EmailMessage';
import ScenarioExplorer from './ScenarioExplorer';
import VideoMessage from './VideoMessage';
import VideoHistory from './VideoHistory';
import type { Example } from '../data/examples';
import { pathTo } from '../utils/paths';

export type Answer = number | number[] | null;

export function isCorrectAnswer(answer: Answer, correctOption: number) {
  return Array.isArray(answer) ? answer.length === 1 && answer[0] === correctOption : answer === correctOption;
}

interface Props {
  question: string;
  options: { label: string; feedback: string }[];
  correctOption: number;
  prompt?: string;
  email?: Example['email'];
  activity?: Example['activity'];
  portraits?: Example['portraits'];
  video?: Example['video'];
  revealExplanation?: { explanation: string; action: string };
  selected?: Answer;
  onSelect?: (answer: Answer) => void;
  showAnswerStatus?: boolean;
}

export default function ChoicePanel({ question, options, correctOption, prompt, email, activity, portraits, video, revealExplanation, selected: controlledSelection, onSelect, showAnswerStatus = false }: Props) {
  const [localSelection, setLocalSelection] = useState<Answer>(null);
  const [portraitSelection, setPortraitSelection] = useState<number[]>(() => Array.isArray(controlledSelection) ? controlledSelection : []);
  const [ready, setReady] = useState(false);
  const selected = controlledSelection === undefined ? localSelection : controlledSelection;
  const correct = isCorrectAnswer(selected, correctOption);
  const feedback = Array.isArray(selected)
    ? selected.length === 1 ? options[selected[0]].feedback : 'Ne všechny označené portréty jsou fotografie. Ověřte původ jednotlivých snímků ve vysvětlení.'
    : selected === null ? '' : options[selected].feedback;

  const selectAnswer = (answer: Answer) => {
    setLocalSelection(answer);
    onSelect?.(answer);
  };

  useEffect(() => setReady(true), []);

  return (
    <div class={`choice-panel ${portraits ? 'has-portraits' : ''} ${video ? 'has-video' : ''}`}>
      {prompt && <div class="agent-prompt"><div class="step-label">UKÁZKOVÉ ZADÁNÍ PRO ASISTENTA</div><p>{prompt}</p></div>}
      {email && <EmailMessage email={email} />}
      {activity && <ScenarioExplorer activity={activity} />}
      {video && <VideoMessage video={video} />}
      <fieldset>
        <legend>{question}</legend>
        <div class={portraits ? 'portrait-grid' : 'choice-list'}>
          {options.map((option, index) => (
            <label class={`choice-option ${portraits ? 'portrait-option' : ''} ${(portraits ? portraitSelection.includes(index) : selected === index) ? `is-selected ${selected === null ? 'is-pending' : correct ? 'is-correct' : 'is-incorrect'}` : ''}`} key={option.label}>
              {portraits && <img src={pathTo(portraits[index].src)} alt={portraits[index].alt} width={portraits[index].width} height={portraits[index].height} loading="lazy" />}
              <span class="choice-control"><input type={portraits ? 'checkbox' : 'radio'} name="choice" checked={portraits ? portraitSelection.includes(index) : selected === index} onChange={() => {
                if (portraits) {
                  setPortraitSelection(portraitSelection.includes(index) ? portraitSelection.filter((item) => item !== index) : [...portraitSelection, index]);
                  if (selected !== null) selectAnswer(null);
                } else selectAnswer(index);
              }} /><span>{option.label}</span></span>
            </label>
          ))}
        </div>
      </fieldset>
      {portraits && ready && <button type="button" class="button primary portrait-confirm" disabled={portraitSelection.length === 0 || selected !== null} onClick={() => selectAnswer(portraitSelection)}>Potvrdit odpověď</button>}
      {portraits && <details class="portrait-alternative"><summary>Textová alternativa</summary><p>Popisy portrétů nejsou důkazem jejich původu. Praktický závěr: původ obrázku a důležitá tvrzení ověřujte nezávisle na tom, jak obrázek působí.</p></details>}
      {ready && <div class={`choice-feedback ${selected === null ? '' : correct ? 'is-correct' : 'is-incorrect'}`} aria-live="polite" aria-atomic="true">{selected !== null && <><strong>{correct ? 'Správně, dobrý postřeh!' : showAnswerStatus || portraits || video ? 'Nesprávná odpověď: nápověda' : 'Nápověda'}</strong><p>{feedback}</p></>}</div>}
      {!ready && <div class="fallback-feedback"><p>Vysvětlení jednotlivých možností:</p>{options.map((option) => <details key={option.label}><summary>{option.label}</summary><p>{option.feedback}</p></details>)}</div>}
      {revealExplanation && <details class="explanation choice-explanation" open={selected !== null}><summary>Vysvětlení a praktický krok</summary><p>{revealExplanation.explanation}</p>{video && <VideoHistory video={video} />}<div class="action-card"><div class="step-label">PRAKTICKÝ KROK</div><p>{revealExplanation.action}</p><small>Doporučení není zárukou bezpečí.</small></div></details>}
    </div>
  );
}