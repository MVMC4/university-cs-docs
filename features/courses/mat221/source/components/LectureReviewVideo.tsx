type VideoConfig = {
  id: string;
  badge: string;
  title: string;
  description: string;
  file: string;
  poster: string;
  captions: string;
  aria: string;
  chapters: Array<[string, string]>;
};

const lesson5: VideoConfig = {
  id: "lesson-5-video-title",
  badge: "3 min 18 sec · narrated review",
  title: "Lesson 5: Reduction formulas",
  description: "Build each recurrence with integration by parts, reduce to a base case, then use the formula on the lecture examples.",
  file: "/videos/mat221-lesson5-review.mp4",
  poster: "/videos/mat221-lesson5-poster.png",
  captions: "/videos/mat221-lesson5-review.vtt",
  aria: "MAT221 Lesson 5 review: reduction formulas",
  chapters: [
    ["00:00", "Roadmap"], ["00:23", "Reduction workflow"], ["00:46", "Exponential recurrence"],
    ["01:11", "Evaluate I₃"], ["01:35", "Cosine recurrence"], ["02:01", "Evaluate I₅"],
    ["02:24", "Definite families"], ["02:54", "Retrieval check"],
  ],
};

const lesson67: VideoConfig = {
  id: "lesson-67-video-title",
  badge: "4 min 17 sec · narrated review",
  title: "Lessons 6–7: Trigonometric integrals",
  description: "Classify the powers, preserve the substitution factor, and choose the correct identity before integrating.",
  file: "/videos/mat221-lesson67-review.mp4",
  poster: "/videos/mat221-lesson67-poster.png",
  captions: "/videos/mat221-lesson67-review.vtt",
  aria: "MAT221 Lessons 6 and 7 review: certain trigonometric integrals",
  chapters: [
    ["00:00", "Roadmap"], ["00:23", "Sine and cosine rules"], ["00:48", "Example 1a"],
    ["01:12", "Examples 1b–d"], ["01:40", "Secant and tangent rules"], ["02:06", "Examples 2a–b"],
    ["02:30", "Examples 2c–h"], ["03:01", "Product-to-sum"], ["03:27", "Example 3"],
    ["03:53", "Retrieval check"],
  ],
};

function ReviewVideo({config}: {config: VideoConfig}) {
  return (
    <section id="video" className="review-video-section" aria-labelledby={config.id}>
      <div className="review-video-heading">
        <div>
          <span className="chip grn">{config.badge}</span>
          <h2 id={config.id}>{config.title}</h2>
          <p className="section-lead">{config.description}</p>
        </div>
        <a className="btn sm ghost" href={config.file} download>Download MP4</a>
      </div>
      <div className="review-video-shell">
        <video className="review-video" controls playsInline preload="metadata" poster={config.poster} aria-label={config.aria}>
          <source src={config.file} type="video/mp4" />
          <track kind="captions" src={config.captions} srcLang="en" label="English" />
          Your browser cannot play this video. <a href={config.file}>Download the MP4</a> instead.
        </video>
      </div>
      <details className="review-video-chapters">
        <summary>Video chapters</summary>
        <ol>{config.chapters.map(([time, label]) => <li key={time}><time>{time}</time><span>{label}</span></li>)}</ol>
      </details>
    </section>
  );
}

export default function LectureReviewVideo({slug}: {slug: string}) {
  if (slug === "parts") return <ReviewVideo config={lesson5} />;
  if (slug === "trig") return <ReviewVideo config={lesson67} />;
  return null;
}
