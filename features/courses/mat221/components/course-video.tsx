type CourseVideoProps = {
  title: string;
  description: string;
  src: string;
  poster: string;
  captions: string;
};

export function Mat221CourseVideo({ title, description, src, poster, captions }: CourseVideoProps) {
  return (
    <figure className="mat221-course-video">
      <div className="mat221-course-video__heading">
        <div>
          <p>Recorded review</p>
          <h2>{title}</h2>
        </div>
        <a href={src} download>
          Download video
        </a>
      </div>
      <p>{description}</p>
      <video controls preload="metadata" poster={poster}>
        <source src={src} type="video/mp4" />
        <track kind="captions" src={captions} srcLang="en" label="English" default />
        Your browser cannot play this video. Use the download link above instead.
      </video>
      <figcaption>
        English captions are included. <a href={captions}>Open the caption file</a>.
      </figcaption>
    </figure>
  );
}
