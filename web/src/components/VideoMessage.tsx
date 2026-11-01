import type { Example } from '../data/examples';
import { pathTo } from '../utils/paths';

interface Props {
  video: NonNullable<Example['video']>;
}

export default function VideoMessage({ video }: Props) {
  return <div class="video-message">
    <video controls preload="none" playsInline aria-label="Video k posouzení původu">
      <source src={pathTo(video.src)} type="video/mp4" />
      Váš prohlížeč nepodporuje přehrávání videa.
    </video>
    <p>Video je bez zvuku.</p>
    <details><summary>Textová alternativa</summary><p>{video.description}</p></details>
  </div>;
}