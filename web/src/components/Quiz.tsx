import { useEffect, useRef, useState } from 'preact/hooks';
import ChoicePanel, { isCorrectAnswer, type Answer } from './ChoicePanel';
import EmailMessage from './EmailMessage';
import ScenarioExplorer from './ScenarioExplorer';
import type { Example } from '../data/examples';

interface Props {
  examples: Example[];
  basePath: string;
}

export default function Quiz({ examples, basePath }: Props) {
  const [ready, setReady] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>(() => examples.map(() => null));
  const hasNavigated = useRef(false);

  useEffect(() => setReady(true), []);
  useEffect(() => {
    if (ready && hasNavigated.current) {
      document.getElementById(step === examples.length ? 'result-title' : 'quiz-title')?.focus();
    }
  }, [step, ready, examples.length]);

  const goTo = (nextStep: number) => {
    hasNavigated.current = true;
    setStep(nextStep);
  };

  if (!ready) {
    return <div class="quiz-fallback">
      <p>Pro počítání bodů zapněte JavaScript. Zadání a vysvětlení jsou dostupná i bez něj.</p>
      {examples.map((example) => <section key={example.slug} class="quiz-fallback-item">
        <h2>{example.title}</h2><p>{example.situation}</p>
        {example.prompt && <div class="agent-prompt"><div class="step-label">UKÁZKOVÉ ZADÁNÍ PRO ASISTENTA</div><p>{example.prompt}</p></div>}
        {example.email && <EmailMessage email={example.email} />}
        {example.activity && <ScenarioExplorer activity={example.activity} />}
        {example.portraits && <div class="portrait-grid">{example.portraits.map((portrait, index) => <figure class="portrait-fallback" key={portrait.src}><img src={`${basePath}${portrait.src}`} alt={portrait.alt} width={portrait.width} height={portrait.height} loading="lazy" /><figcaption>Portrét {String.fromCharCode(65 + index)}</figcaption></figure>)}</div>}
        <p><strong>{example.question}</strong></p>
        <ul>{example.options.map((option) => <li key={option.label}>{option.label}</li>)}</ul>
        <h3>Vysvětlení</h3><p>{example.explanation}</p><p><strong>Praktický krok:</strong> {example.action}</p>
        <p><a href={`${basePath}examples/${example.slug}/`}>Otevřít ukázku a zdroje ↗</a></p>
      </section>)}
    </div>;
  }

  const completed = step === examples.length;
  const answered = answers.filter((answer) => answer !== null).length;
  const score = answers.reduce<number>((total, answer, index) => total + (isCorrectAnswer(answer, examples[index].correctOption) ? 1 : 0), 0);

  if (completed) {
    return <section class="quiz-result" aria-labelledby="result-title">
      <div class="step-label">VÝSLEDEK TESTU</div>
      <h2 id="result-title" tabIndex={-1}>Vaše odpovědi<span class="title-dot">.</span></h2>
      <div class="result-score"><strong>{score}</strong><span>z {examples.length} bodů</span></div>
      <p>Odpovězeno {answered} z {examples.length} otázek. Výsledek se týká jen těchto situací a není zárukou bezpečí ani univerzálním testem rozpoznání podvodů.</p>
      <p>{score === examples.length ? 'Ve všech situacích jste vybrali doporučený postup.' : 'U zbývajících situací si můžete projít doporučený postup a odpovědi změnit.'}</p>
      <div class="result-list">{examples.map((example, index) => <div class={`result-item ${answers[index] === null ? '' : isCorrectAnswer(answers[index], example.correctOption) ? 'is-correct' : 'is-incorrect'}`} key={example.slug}>
        <div><span class="step-label">{answers[index] === null ? 'BEZ ODPOVĚDI' : isCorrectAnswer(answers[index], example.correctOption) ? 'SPRÁVNÁ ODPOVĚĎ' : 'NESPRÁVNÁ ODPOVĚĎ'}</span><h3>{example.title}</h3><p>{example.action}</p></div>
        <button type="button" class="text-button" onClick={() => goTo(index)}>Upravit odpověď</button>
      </div>)}</div>
      <button type="button" class="button primary" onClick={() => { setAnswers(examples.map(() => null)); goTo(0); }}>Začít znovu <span aria-hidden="true">↻</span></button>
    </section>;
  }

  const example = examples[step];
  return <section class="quiz-step" aria-labelledby="quiz-title">
    <div class="quiz-progress"><span>OTÁZKA {step + 1} Z {examples.length}</span><span>{answered} ZODPOVĚZENO</span></div>
    <progress max={examples.length} value={step + 1} aria-label={`Otázka ${step + 1} z ${examples.length}`} />
    <div class="example-meta"><span>{example.category}</span><span>{example.portraits ? 'Skutečné a vytvořené snímky' : 'Fiktivní situace'}</span>{example.preview && <span>Ochutnávka tématu po přestávce</span>}</div>
    <h2 id="quiz-title" tabIndex={-1}>{example.title}<span class="title-dot">{example.title.endsWith('?') ? '' : '.'}</span></h2>
    <p class="quiz-situation">{example.situation}</p>
    <ChoicePanel key={example.slug} question={example.question} options={example.options} correctOption={example.correctOption} prompt={example.prompt} email={example.email} activity={example.activity} portraits={example.portraits} selected={answers[step]} showAnswerStatus onSelect={(index) => setAnswers(answers.map((answer, answerIndex) => answerIndex === step ? index : answer))} />
    <details class="quiz-explanation" open={answers[step] !== null}><summary>Vysvětlení a praktický krok</summary><p>{example.explanation}</p><div class="action-card"><div class="step-label">PRAKTICKÝ KROK</div><p>{example.action}</p><small>Doporučení není zárukou bezpečí.</small></div>{example.sources.map((source) => <p key={source.url}><a href={source.url}>{source.organization}: {source.name} ↗</a><br /><small>{source.detail}</small>{source.licenseUrl && <> <a href={source.licenseUrl}>Licence CC BY-SA 4.0 ↗</a></>}</p>)}</details>
    <div class="quiz-controls"><button type="button" class="button secondary" disabled={step === 0} onClick={() => goTo(step - 1)}>← Zpět</button><button type="button" class="button primary" onClick={() => goTo(step + 1)}>{step === examples.length - 1 ? 'Zobrazit výsledek' : answers[step] === null ? 'Přeskočit' : 'Další otázka'} <span aria-hidden="true">→</span></button></div>
  </section>;
}