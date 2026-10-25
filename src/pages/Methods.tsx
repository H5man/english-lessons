import { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Shell } from "@/components/Shell";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { methods, sections, summary, type Ev, type Method } from "@/methods-data";

type Tab = "methods" | "scenarios" | "plan";
const TABS: { id: Tab; label: string }[] = [
  { id: "methods", label: "Методы" },
  { id: "scenarios", label: "Сценарии для IT" },
  { id: "plan", label: "План" },
];
type Filter = "all" | "strong" | "fit";

export default function MethodsPage() {
  const { section } = useParams();
  const navigate = useNavigate();
  if (section && !TABS.some((t) => t.id === section)) return <Navigate to="/methods" replace />;
  const tab = (section ?? "methods") as Tab;
  return (
    <Shell
      title="Методики разговорного английского" meta={summary} wide
      nav={TABS} navLabel="Разделы" active={tab}
      onNav={(id) => navigate(`/methods/${id}`, { replace: true })}
    >
      <section className="panel" id="panel-methods" role="tabpanel" aria-labelledby="main-methods" hidden={tab !== "methods"}>
        <MethodsPanel />
      </section>
      <section className="panel" id="panel-scenarios" role="tabpanel" aria-labelledby="main-scenarios" hidden={tab !== "scenarios"}>
        <ScenariosPanel />
      </section>
      <section className="panel" id="panel-plan" role="tabpanel" aria-labelledby="main-plan" hidden={tab !== "plan"}>
        <PlanPanel />
      </section>
    </Shell>
  );
}

/* ---------- общие кусочки ---------- */

function Linkify({ text }: { text: string }) {
  const parts = text.split(/(https?:\/\/[^\s]+)/g);
  return <>{parts.map((p, i) => /^https?:\/\//.test(p)
    ? <a key={i} href={p} target="_blank" rel="noopener noreferrer">{p}</a> : <span key={i}>{p}</span>)}</>;
}

function Head({ heading, caption }: { heading: string; caption?: string }) {
  return (
    <div className="sec-head2">
      <h2 className="sec-h2">{heading}</h2>
      {caption && <p className="sec-cap">{caption}</p>}
    </div>
  );
}

const evVariant = (e: Ev) => (e === "Сильная" ? "strong" : e === "Слабая" ? "weak" : "mid") as "strong" | "weak" | "mid";
function EvBadge({ ev }: { ev: Ev }) { return <Badge variant={evVariant(ev)}>{ev}</Badge>; }

/** Таблица: на десктопе обычная, на телефоне каждая строка превращается в карточку (без горизонтального скролла). */
function DataTable({ columns, rows, endCols = [] }: { columns: string[]; rows: React.ReactNode[][]; endCols?: number[] }) {
  return (
    <table className="dt">
      <thead>
        <tr>{columns.map((c, i) => <th key={c} className={endCols.includes(i) ? "end" : ""}>{c}</th>)}</tr>
      </thead>
      <tbody>
        {rows.map((r, ri) => (
          <tr key={ri}>
            {r.map((cell, ci) => (
              <td key={ci} data-label={columns[ci]} className={(ci === 0 ? "first " : "") + (endCols.includes(ci) ? "end" : "")}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/* ---------- Методы ---------- */

function MethodsPanel() {
  const [f, setF] = useState<Filter>("all");
  const S = sections;
  const shown = methods.filter((m: Method) => (f === "all" ? true : f === "strong" ? m.ev === "Сильная" : m.fits));
  const opts: { v: Filter; label: string; n: number }[] = [
    { v: "all", label: "Все", n: methods.length },
    { v: "strong", label: "Сильная база", n: methods.filter((m) => m.ev === "Сильная").length },
    { v: "fit", label: "Влезают в 30 мин", n: methods.filter((m) => m.fits).length },
  ];
  return (
    <>
      <section>
        <Head heading={S.intro.heading} />
        {S.intro.texts.map((t: string, i: number) => <p className="txt" key={i}>{t}</p>)}
        <div className="callout">
          <strong>{S.intro.callout.lead}</strong>
          <p><Linkify text={S.intro.callout.text} /></p>
        </div>
      </section>

      <section>
        <Head heading={S.compare.heading} />
        <div className="seg" role="group" aria-label="Фильтр методов">
          {opts.map((o) => (
            <Button key={o.v} variant="seg" aria-pressed={f === o.v} onClick={() => setF(o.v)}>
              {o.label} <span className="segn">{o.n}</span>
            </Button>
          ))}
        </div>
        <DataTable columns={S.compare.columns}
          rows={shown.map((m) => [m.name, m.what, m.trains, <EvBadge key="b" ev={m.ev} />, m.min, m.diff, m.coco])} />
      </section>

      <section>
        <Head heading={S.cards.heading} caption={S.cards.caption} />
        <Accordion type="multiple" className="cards">
          {methods.map((m) => (
            <AccordionItem value={m.id} key={m.id} id={m.id}>
              <AccordionTrigger>
                <span className="mname">{m.name}</span>
                <EvBadge ev={m.ev} />
              </AccordionTrigger>
              <AccordionContent>
                <ul className="pts">{m.points.map((p, i) => <li key={i}>{p}</li>)}</ul>
                <ul className="links">
                  {m.links.map((l, i) => (
                    <li key={i}>
                      <a href={l.href} target="_blank" rel="noopener noreferrer">{l.title}</a>
                      <span className="site">{l.site}{l.date ? " · " + l.date : ""}</span>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      
      </section>
    </>
  );
}

/* ---------- Сценарии для IT ---------- */

function ScenariosPanel() {
  const S = sections.it;
  return (
    <section>
      <Head heading={S.heading} caption={S.caption} />
      <DataTable columns={S.columns} rows={S.rows} />
      {S.texts.map((t: string, i: number) => <p className="txt" key={i}>{t}</p>)}
    </section>
  );
}

/* ---------- План ---------- */

function PlanPanel() {
  const C = sections.candidates, P = sections.split, U = sections.upcoming, L = sections.plan;
  return (
    <>
      <section>
        <Head heading={C.heading} caption={C.caption} />
        <DataTable columns={C.columns} rows={C.rows} endCols={[2]} />
        {C.texts.map((t: string, i: number) => <p className="txt" key={i}>{t}</p>)}
      </section>

      <section>
        <Head heading={P.heading} />
        <div className="split">
          {P.rows.map((r: any, i: number) => (
            <div className="splitrow" key={i}>
              <span className="lead">{r.lead}</span>
              <div>
                <p className="stitle">{r.title}</p>
                <p className="sdetail">{r.detail}</p>
              </div>
              <span className="smeta">{r.meta}</span>
            </div>
          ))}
        </div>
        <ul className="pts">{P.bullets.map((b: string, i: number) => <li key={i}>{b}</li>)}</ul>
      </section>

      <section>
        <Head heading={U.heading} caption={U.caption} />
        <DataTable columns={U.columns} rows={U.rows} />
      </section>

      <section>
        <Head heading={L.heading} />
        {L.texts.map((t: string, i: number) => <p className="txt" key={i}>{t}</p>)}
        <ol className="steps">
          {L.steps.map((s: any, i: number) => (
            <li key={i}><strong>{s.title}</strong><span>{s.detail}</span></li>
          ))}
        </ol>
      </section>
    </>
  );
}
