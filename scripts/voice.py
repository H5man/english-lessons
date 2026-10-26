#!/usr/bin/env python3
"""Озвучка фраз и примеров урока(ов) голосом Ryan (en-GB). usage: voice.py <lesson-id|all> ...
Файлы: public/audio/<slug>.mp3 (slug = slugify(текста), как в src/lib/audio.ts); список — src/audio-manifest.ts"""
import json, re, subprocess, sys, pathlib
ROOT = pathlib.Path(__file__).resolve().parent.parent
VOICE, RATE = "en-GB-RyanNeural", "-10%"
def slug(t): return re.sub(r"^-|-$", "", re.sub(r"[^a-z0-9]+", "-", t.lower()))
def texts(f):
    s = f.read_text()
    out = []
    for m in re.finditer(r'\b(?:en|ex):\s*"((?:[^"\\]|\\.)*)"', s):
        out.append(json.loads('"' + m.group(1) + '"'))
    return out
ids = sys.argv[1:] or ["all"]
files = sorted((ROOT/"src/lessons").glob("20*.ts"))
if ids != ["all"]: files = [f for f in files if f.stem in ids]
(ROOT/"public/audio").mkdir(exist_ok=True)
for f in files:
    for t in texts(f):
        out = ROOT/"public/audio"/(slug(t)+".mp3")
        if out.exists(): continue
        spoken = t.replace("…", ",").replace("...", ",")
        subprocess.run([sys.executable, "-m", "edge_tts", "--voice", VOICE, f"--rate={RATE}", "--text", spoken, "--write-media", str(out)], check=True, capture_output=True)
        print("tts", out.name)
names = sorted(p.stem for p in (ROOT/"public/audio").glob("*.mp3"))
(ROOT/"src/audio-manifest.ts").write_text("// Генерируется scripts/voice.py: тексты, для которых есть озвучка (public/audio/<slug>.mp3)\nexport const audioSlugs = new Set<string>(" + json.dumps(names, indent=1) + ");\n")
