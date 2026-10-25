#!/usr/bin/env python3
"""Добавляет урок в приложение (src/lessons/) и пересобирает реестр src/lessons/index.ts.

Использование:
  python3 scripts/add-lesson.py <lesson.ts | lesson.json | ->    (JSON можно подать через stdin: «-»)

Формат данных: { id: "YYYY-MM-DD-slug", date: "25 октября 2026", title: "…", phrases: [{ en, ru, ex }, …] }
(в .ts — тот же объект `export const lesson: Lesson = {…}`, как в /workspace/lessons/*/src/lesson.ts).

Если урок на ту же тему уже есть (совпадает title или id), новые фразы дописываются в его файл
без дублей (дубль = тот же английский текст фразы), новый файл не создаётся.
В stdout последней строкой: RESULT id=<id> mode=<new|merge> added=<n> skipped=<m> total=<k>
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
    def field(name):
        m = re.search(r"\b" + name + r":\s*" + STR, text)
        if not m:
            sys.exit(f"В данных не найдено поле {name}")
        return js_str(m.group(1))
    phrases = [
        {"en": js_str(a), "ru": js_str(b), "ex": js_str(c)}
        for a, b, c in re.findall(r"\{\s*en:\s*" + STR + r",\s*ru:\s*" + STR + r",\s*ex:\s*" + STR + r"\s*\}", text)
    ]
    return {"id": field("id"), "date": field("date"), "title": field("title"), "phrases": phrases}


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
    if not data["phrases"]:
        sys.exit("В уроке нет фраз")
    for i, ph in enumerate(data["phrases"]):
        if not all(isinstance(ph.get(k), str) and ph[k].strip() for k in ("en", "ru", "ex")):
            sys.exit(f"Фраза №{i + 1} без en/ru/ex")
    return data


def phrase_line(ph: dict) -> str:
    q = lambda s: json.dumps(s, ensure_ascii=False)
    return f"    {{ en: {q(ph['en'])}, ru: {q(ph['ru'])}, ex: {q(ph['ex'])} }},\n"


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
    lines += ["", 'export type { Lesson, Phrase } from "./types";', "",
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
        q = lambda s: json.dumps(s, ensure_ascii=False)
        seen, phr = set(), []
        for ph in d["phrases"]:  # дубли внутри самого урока тоже убираем
            if norm(ph["en"]) not in seen:
                seen.add(norm(ph["en"])); phr.append(ph)
        body = (f'import type {{ Lesson }} from "./types";\n\nexport const lesson: Lesson = {{\n  id: {q(d["id"])},\n'
                f'  date: {q(d["date"])},\n  title: {q(d["title"])},\n  phrases: [\n'
                + "".join(phrase_line(p) for p in phr) + "  ],\n};\n")
        (LDIR / f"{d['id']}.ts").write_text(
            "// Единственный файл с содержимым урока. Остальной код от темы не зависит.\n" + body, encoding="utf-8")
        write_registry()
        print(f"RESULT id={d['id']} mode=new added={len(phr)} skipped={len(d['phrases']) - len(phr)} total={len(phr)}")
        return
    text = target.read_text(encoding="utf-8")
    have = {norm(en) for en in (js_str(x) for x in re.findall(r"\ben:\s*" + STR, text))}
    add, skipped = [], 0
    for ph in d["phrases"]:
        n = norm(ph["en"])
        if n in have:
            skipped += 1
        else:
            have.add(n); add.append(ph)
    if add:
        end = text.rindex("  ],\n};")
        text = text[:end] + "".join(phrase_line(p) for p in add) + text[end:]
        target.write_text(text, encoding="utf-8")
    write_registry()
    print(f"RESULT id={target.stem} mode=merge added={len(add)} skipped={skipped} total={len(have)}")


main()
