import { useEffect, useState } from 'preact/hooks';

interface Props {
  question: string;
  options: { label: string; feedback: string }[];
}

export default function ChoicePanel({ question, options }: Props) {
  const [selected, setSelected] = useState<number | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => setReady(true), []);

  return (
    <div class="choice-panel">
      <fieldset>
        <legend>{question}</legend>
        <div class="choice-list">
          {options.map((option, index) => (
            <label class={`choice-option ${selected === index ? 'is-selected' : ''}`} key={option.label}>
              <input type="radio" name="choice" checked={selected === index} onChange={() => setSelected(index)} />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      </fieldset>
      {ready && <div class="choice-feedback" aria-live="polite" aria-atomic="true">{selected !== null && <><strong>K zamyšlení</strong><p>{options[selected].feedback}</p></>}</div>}
      {!ready && <div class="fallback-feedback"><p>Vysvětlení jednotlivých možností:</p>{options.map((option) => <details key={option.label}><summary>{option.label}</summary><p>{option.feedback}</p></details>)}</div>}
    </div>
  );
}