const chapters = [
  ["00:00", "Roadmap"],
  ["00:23", "Reverse derivatives"],
  ["00:50", "Why + C?"],
  ["01:18", "Integral notation"],
  ["01:46", "FTC Part 1"],
  ["02:18", "FTC Part 2"],
  ["02:50", "Power rule"],
  ["03:20", "Worked checks"],
  ["03:54", "Retrieval check"],
];

export default function FoundationsReviewVideo() {
  return (
    <section id="video" className="review-video-section" aria-labelledby="foundations-video-title">
      <div className="review-video-heading">
        <div>
          <span className="chip grn">4 min 30 sec · narrated review</span>
          <h2 id="foundations-video-title">Recognize, reverse, verify</h2>
          <p className="section-lead">Watch once without taking notes. Then replay the worked checks and say each next step before it appears.</p>
        </div>
        <a className="btn sm ghost" href="/videos/mat221-foundations-review.mp4" download>Download MP4</a>
      </div>
      <div className="review-video-shell">
        <video
          className="review-video"
          controls
          playsInline
          preload="metadata"
          poster="/videos/mat221-foundations-poster.png"
          aria-label="Foundations review: antiderivatives and the Fundamental Theorem of Calculus"
        >
          <source src="/videos/mat221-foundations-review.mp4" type="video/mp4" />
          <track kind="captions" src="/videos/mat221-foundations-review.vtt" srcLang="en" label="English" />
          Your browser cannot play this video. <a href="/videos/mat221-foundations-review.mp4">Download the MP4</a> instead.
        </video>
      </div>
      <details className="review-video-chapters">
        <summary>Video chapters</summary>
        <ol>
          {chapters.map(function (chapter) {
            return <li key={chapter[0]}><time>{chapter[0]}</time><span>{chapter[1]}</span></li>;
          })}
        </ol>
      </details>
    </section>
  );
}
