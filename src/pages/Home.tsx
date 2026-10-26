import { Link } from "react-router-dom";
import { Shell } from "@/components/Shell";
import { lessons } from "@/lessons";

export default function Home() {
  return (
    <Shell title="Разговорный английский" home>
      <section className="panel">
        <h2 className="home-h">Уроки</h2>
        <ul className="llist">
          {lessons.map((l) => (
            <li key={l.id}>
              <Link className="llink" to={`/lesson/${l.id}`}>
                {l.id.slice(0, 10)} · {l.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </Shell>
  );
}
