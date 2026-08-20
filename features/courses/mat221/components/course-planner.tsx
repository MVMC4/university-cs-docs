import { mat221Topics } from '../manifest';

export function Mat221CoursePlanner() {
  return (
    <ol className="mat221-planner">
      {mat221Topics.map((item) => (
        <li key={item.slug}>
          <span>Week {item.order}</span>
          <strong>{item.title}</strong>
          <small>{item.objectives.join(' · ')}</small>
        </li>
      ))}
    </ol>
  );
}
