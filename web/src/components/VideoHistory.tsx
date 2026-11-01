import type { Example } from '../data/examples';

interface Props {
  video: NonNullable<Example['video']>;
}

export default function VideoHistory({ video }: Props) {
  if (!video.history) return null;

  return <div class="video-history">
    <h3>Proč právě Will Smith a špagety?</h3>
    <p>{video.history.introduction}</p>
    <ul>{video.history.links.map((link) => <li key={link.url}><a href={link.url}>{link.label} ↗</a><p>{link.detail}</p></li>)}</ul>
  </div>;
}