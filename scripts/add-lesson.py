#!/usr/bin/env python3
"""Adds a lesson to the app (src/lessons/) and rebuilds the registry src/lessons/index.ts.

Usage:
  python3 scripts/add-lesson.py <lesson.ts | lesson.json | ->    (JSON can come from stdin: "-")

Data: { id: "YYYY-MM-DD-slug", date: "25 октября 2026", title: "…", phrases: [{ en, ru, ex }, …],
        shadowing?: [{ title: "…", lines: [{ who?, en, ru? }, …] }, …] }
(in .ts it is the same object `export const lesson: Lesson = {…}`, as in /workspace/lessons/*/src/lesson.ts).

If a lesson on the same topic already exists (same title or id), it is merged into that file:
- phrases: new ones are appended, duplicates (same English `en`) are skipped;
- shadowing: a section with the same title gets the new lines appended, other sections are appended
  as new ones; a line is skipped if its `en` already exists in the lesson's shadowing or equals any
  phrase `en`/`ex` (shadowing must use new sentences).
The lesson file is then re-rendered from the merged data.
`phrases` may be empty when merging shadowing only into an existing lesson.
Last stdout line: RESULT id=<id> mode=<new|merge> added=<n> skipped=<m> total=<k> shadow_added=<a> shadow_skipped=<b>
"""
import json, re, sys, pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
LDIR = ROOT / "src" / "lessons"
ID_RE = re.compile(r"^\d{4}-\d{2}-\d{2}-[a-z0-9-]+$")
STR = r'"((?:[^"\\]|\\.)*)"'


def norm(s: str) -> str:
    s = s.replace("’", "'").replace("‘", "'").lower()
    return re.sub(r"[^a-z0-9а-я]+", " ", s).strip()


def js_str(s: str) -> str:
    return json.loads('"' + s + '"')


def parse_ts(text: str) -> dict:
    sh_at = re.search(r"\bshadowing:\s*\[", text)
    head = text[: sh_at.start()] if sh_at else text

    def field(name):
        m = re.search(r"\b" + name + r":\s*" + STR, head)
        if not m:
            sys.exit(f"Field {name} not found in the data")
        return js_str(m.group(1))
    phrases = [
        {"en": js_str(a), "ru": js_str(b), "ex": js_str(c)}
        for a, b, c in re.findall(r"\{\s*en:\s*" + STR + r",\s*ru:\s*" + STR + r",\s*ex:\s*" + STR + r",?\s*\}", head)
    ]
    shadowing = []
    if sh_at:
        tail = text[sh_at.end():]
        parts = re.split(r"\btitle:\s*" + STR, tail)  # [junk, title1, body1, title2, body2, ...]
        for title, body in zip(parts[1::2], parts[2::2]):
            lines = []
            for who, en, ru in re.findall(
                    r"\{\s*(?:who:\s*" + STR + r",\s*)?en:\s*" + STR + r"(?:,\s*ru:\s*" + STR + r")?,?\s*\}", body):
                ln = {"en": js_str(en)}
                if who: ln["who"] = js_str(who)
                if ru: ln["ru"] = js_str(ru)
                lines.append(ln)
            shadowing.append({"title": js_str(title), "lines": lines})
    d = {"id": field("id"), "date": field("date"), "title": field("title"), "phrases": phrases}
    if shadowing:
        d["shadowing"] = shadowing
    return d


def load(src: str) -> dict:
    if src == "-":
        data = json.load(sys.stdin)
    else:
        p = pathlib.Path(src)
        text = p.read_text(encoding="utf-8")
        data = json.loads(text) if p.suffix == ".json" else parse_ts(text)
    for k in ("id", "date", "title", "phrases"):
        if k not in data:
            sys.exit(f"В данных нет поля {k}")
    if not ID_RE.match(data["id"]):
        sys.exit(f"id должен быть вида YYYY-MM-DD-slug (латиница, цифры, дефис): {data['id']!r}")
    if not data["phrases"] and not data.get("shadowing"):
        sys.exit("The lesson has no phrases")
    for i, ph in enumerate(data["phrases"]):
        if not all(isinstance(ph.get(k), str) and ph[k].strip() for k in ("en", "ru", "ex")):
            sys.exit(f"Phrase #{i + 1} has no en/ru/ex")
    for sec in data.get("shadowing") or []:
        if not (isinstance(sec.get("title"), str) and sec["title"].strip() and isinstance(sec.get("lines"), list)):
            sys.exit("Each shadowing section needs a title and lines")
        for ln in sec["lines"]:
            if not (isinstance(ln.get("en"), str) and ln["en"].strip()):
                sys.exit(f"Shadowing line without en in section {sec['title']!r}")
    return data


def phrase_line(ph: dict) -> str:
    q = lambda s: json.dumps(s, ensure_ascii=False)
    return f"    {{ en: {q(ph['en'])}, ru: {q(ph['ru'])}, ex: {q(ph['ex'])} }},\n"


def shadow_line(ln: dict) -> str:
    q = lambda s: json.dumps(s, ensure_ascii=False)
    who = f"who: {q(ln['who'])}, " if ln.get("who") else ""
    ru = f", ru: {q(ln['ru'])}" if ln.get("ru") else ""
    return f"        {{ {who}en: {q(ln['en'])}{ru} }},\n"


def render(d: dict) -> str:
    q = lambda s: json.dumps(s, ensure_ascii=False)
    out = ("// Единственный файл с содержимым урока. Остальной код от темы не зависит.\n"
           f'import type {{ Lesson }} from "./types";\n\nexport const lesson: Lesson = {{\n  id: {q(d["id"])},\n'
           f'  date: {q(d["date"])},\n  title: {q(d["title"])},\n  phrases: [\n'
           + "".join(phrase_line(p) for p in d["phrases"]) + "  ],\n")
    if d.get("shadowing"):
        out += "  shadowing: [\n"
        for sec in d["shadowing"]:
            out += f"    {{\n      title: {q(sec['title'])},\n      lines: [\n" + "".join(shadow_line(l) for l in sec["lines"]) + "      ],\n    },\n"
        out += "  ],\n"
    return out + "};\n"


def merge_shadowing(base: dict, incoming: list) -> tuple:
    """Appends incoming shadowing into base (in place). Returns (added, skipped)."""
    taken = {norm(p["en"]) for p in base["phrases"]} | {norm(p["ex"]) for p in base["phrases"]}
    secs = base.setdefault("shadowing", [])
    taken |= {norm(l["en"]) for s in secs for l in s["lines"]}
    added = skipped = 0
    for sec in incoming or []:
        target = next((s for s in secs if norm(s["title"]) == norm(sec["title"])), None)
        new = []
        for ln in sec["lines"]:
            if norm(ln["en"]) in taken:
                skipped += 1
            else:
                taken.add(norm(ln["en"])); new.append(ln); added += 1
        if not new:
            continue
        if target is None:
            secs.append({"title": sec["title"], "lines": new})
        else:
            target["lines"].extend(new)
    if not secs:
        base.pop("shadowing")
    return added, skipped


def existing():
    out = []
    for f in sorted(LDIR.glob("20*.ts")):
        t = f.read_text(encoding="utf-8")
        m = re.search(r"\btitle:\s*" + STR, t)
        out.append((f, f.stem, js_str(m.group(1)) if m else ""))
    return out


def write_registry():
    ids = sorted((f.stem for f in LDIR.glob("20*.ts")), reverse=True)
    var = lambda i: "l_" + re.sub(r"[^a-zA-Z0-9]", "_", i)
    lines = [
        "// Реестр уроков. Новый урок = файл данных в этой папке + строка import и строка в массиве ниже.",
        "// Файл генерирует scripts/add-lesson.py (см. README.md); можно править и руками.",
        'import type { Lesson } from "./types";',
    ]
    lines += [f'import {{ lesson as {var(i)} }} from "./{i}";' for i in ids]
    lines += ["", 'export type { Lesson, Phrase, ShadowLine, ShadowSection } from "./types";', "",
              "// Порядок = порядок в списке на главной (новые сверху).", "export const lessons: Lesson[] = ["]
    lines += [f"  {var(i)}," for i in ids]
    lines += ["];", "", "export const getLesson = (id: string) => lessons.find((l) => l.id === id);", ""]
    (LDIR / "index.ts").write_text("\n".join(lines), encoding="utf-8")


def main():
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    d = load(sys.argv[1])
    target = None
    for f, i, title in existing():
        if i == d["id"] or title.strip().casefold() == d["title"].strip().casefold():
            target = f
            break
    if target is None:
        if not d["phrases"]:
            sys.exit("A new lesson needs phrases")
        seen, phr = set(), []
        for ph in d["phrases"]:  # drop duplicates inside the lesson itself
            if norm(ph["en"]) not in seen:
                seen.add(norm(ph["en"])); phr.append(ph)
        base = {"id": d["id"], "date": d["date"], "title": d["title"], "phrases": phr}
        sh_added, sh_skipped = merge_shadowing(base, d.get("shadowing"))
        (LDIR / f"{d['id']}.ts").write_text(render(base), encoding="utf-8")
        write_registry()
        print(f"RESULT id={d['id']} mode=new added={len(phr)} skipped={len(d['phrases']) - len(phr)} total={len(phr)}"
              f" shadow_added={sh_added} shadow_skipped={sh_skipped}")
        return
    base = parse_ts(target.read_text(encoding="utf-8"))
    have = {norm(p["en"]) for p in base["phrases"]}
    add, skipped = [], 0
    for ph in d["phrases"]:
        n = norm(ph["en"])
        if n in have:
            skipped += 1
        else:
            have.add(n); add.append(ph)
    base["phrases"] += add
    sh_added, sh_skipped = merge_shadowing(base, d.get("shadowing"))
    if add or sh_added:
        target.write_text(render(base), encoding="utf-8")
    write_registry()
    print(f"RESULT id={target.stem} mode=merge added={len(add)} skipped={skipped} total={len(have)}"
          f" shadow_added={sh_added} shadow_skipped={sh_skipped}")


main()
