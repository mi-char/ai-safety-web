import type { Example } from '../data/examples';
import { useState } from 'preact/hooks';

interface Props {
  activity: NonNullable<Example['activity']>;
}

export default function ScenarioExplorer({ activity }: Props) {
  const [selected, setSelected] = useState<string[]>([]);

  return <section class="scenario-explorer" aria-label={activity.title}>
    <div class="scenario-explorer-heading"><span class="scenario-indicator" aria-hidden="true"></span><strong>{activity.title}</strong></div>
    <div class="scenario-clues">{activity.items.map((item) => <details class="scenario-clue" key={item.label}>
      <summary>{item.label}<span aria-hidden="true">+</span></summary>
      <p>{item.text}</p>
    </details>)}</div>
    {activity.dataChoices && <div class="scenario-data">
      <fieldset><legend>Co byste pro návrh pozvánky vybrali?</legend>
        {activity.dataChoices.map((choice) => <label class="scenario-data-option" key={choice.label}>
          <input type="checkbox" checked={selected.includes(choice.label)} onChange={(event) => setSelected(event.currentTarget.checked ? [...selected, choice.label] : selected.filter((item) => item !== choice.label))} />
          <span>{choice.label}</span>
        </label>)}
      </fieldset>
      <div class="scenario-data-feedback" aria-live="polite">{activity.dataChoices.filter((choice) => selected.includes(choice.label)).map((choice) => <p key={choice.label}><strong>{choice.label}:</strong> {choice.guidance}</p>)}</div>
      <details class="scenario-clue"><summary>Co je dobré zvážit?<span aria-hidden="true">+</span></summary><ul>{activity.dataChoices.map((choice) => <li key={choice.label}><strong>{choice.label}:</strong> {choice.guidance}</li>)}</ul></details>
    </div>}
  </section>;
}