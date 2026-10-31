import type { Example } from '../data/examples';

interface Props {
  email: NonNullable<Example['email']>;
}

export default function EmailMessage({ email }: Props) {
  return <div class="email-message">
    <div class="email-header"><p><strong>Od:</strong> {email.sender}</p><p><strong>Předmět:</strong> {email.subject}</p></div>
    <div class="email-content">
      <p>{email.greeting}</p>
      <p>{email.body}</p>
      <p class="email-hidden">{email.hiddenText}</p>
      <p lang="es">{email.spanishText}</p>
      <p>{email.signoff}</p>
    </div>
    <details class="email-reveal"><summary>Zobrazit e-mail jako prostý text</summary><p>{email.greeting}</p><p>{email.body}</p><p>{email.hiddenText}</p><p lang="es">{email.spanishText}</p><p>{email.signoff}</p></details>
  </div>;
}