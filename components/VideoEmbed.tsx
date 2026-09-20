/**
 * Responsive 16:9 video embed for article pages. Server component, no client JS.
 * YouTube goes through youtube-nocookie.com so the page sets no tracking cookie until the reader presses play.
 */
type Props = {
  youtubeId: string
  title: string
  caption?: React.ReactNode
}

export default function VideoEmbed({ youtubeId, title, caption }: Props) {
  return (
    <figure className="video-embed">
      <div className="video-embed-frame">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0`}
          title={title}
          loading="lazy"
          allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
      {caption && <figcaption className="video-embed-caption">{caption}</figcaption>}
    </figure>
  )
}
