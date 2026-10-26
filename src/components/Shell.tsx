import { useEffect, type ReactNode } from "react";
import { useLocation } from "react-router-dom";

export type NavItem = { id: string; label: string; badge?: number };

/** Каркас страницы: полноширинная шапка, левое меню (на мобильном — липкое верхнее), контент. */
export function Shell({
  title, docTitle, nav, active, onNav, navLabel, children,
}: {
  title: ReactNode; docTitle?: string;
  nav?: NavItem[]; active?: string; onNav?: (id: string) => void; navLabel?: string;
  children: ReactNode;
}) {
  const { pathname } = useLocation();
  useEffect(() => { document.title = docTitle ?? (typeof title === "string" ? title : ""); }, [docTitle, title]);
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);

  return (
    <div className="app">
      <header className="top">
        <p className="kicker">Разговорный английский</p>
        <h1 className="title">{title}</h1>
      </header>

      <div className="body">
        {nav && (
          <aside className="side">
            <nav className="nav" role="tablist" aria-label={navLabel} aria-orientation="vertical">
              {nav.map((t) => (
                <button key={t.id} role="tab" className="navitem" id={`main-${t.id}`} aria-selected={active === t.id}
                  aria-controls={`panel-${t.id}`} onClick={() => onNav?.(t.id)}>
                  {t.label}
                  {t.badge !== undefined && <small>{t.badge}</small>}
                </button>
              ))}
            </nav>
          </aside>
        )}
        <main className="content">{children}</main>
      </div>
    </div>
  );
}
