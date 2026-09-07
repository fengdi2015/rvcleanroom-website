import html
import json
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
PAGES = json.loads((ROOT / "app/_data/pages.json").read_text(encoding="utf-8"))

KEYWORDS = [
    ("A", "china cleanroom"),
    ("A", "chinese cleanroom"),
    ("A", "cleanroom manufacturer china"),
    ("A", "cleanroom manufacturer in china"),
    ("A", "modular cleanroom china"),
    ("A", "modular cleanroom manufacturer china"),
    ("A", "modular cleanroom project in china"),
    ("A", "cleanroom panels manufacture china"),
    ("A", "turnkey cleanroom project china"),
    ("A", "turnkey cleanroom project in china"),
    ("A", "china cleanroom turn-key project provider"),
    ("B", "prefabricated cleanroom china"),
    ("B", "cleanroom HVAC system china"),
    ("B", "GMP clean room china"),
    ("B", "ISO class cleanroom china"),
    ("B", "air shower manufacturer china"),
    ("B", "pass box manufacturer china"),
    ("B", "clean booth manufacturer china"),
    ("C", "clean bench manufacturer china"),
    ("C", "ISO class cleanroom manufacturer in china"),
    ("C", "medical clean room manufacturer in china"),
    ("C", "cleanroom door manufacturer china"),
    ("C", "cleanroom window manufacturer china"),
    ("D", "clean room partition panels china"),
    ("D", "cleanroom sandwich panel china"),
    ("D", "anti static wall panels cleanroom china"),
    ("D", "polycarbonate cleanroom panels china"),
    ("D", "acrylic cleanroom panels china"),
    ("D", "aluminum profile cleanroom system china"),
    ("D", "cleanroom ceiling grid system china"),
    ("D", "raised floor cleanroom china"),
    ("D", "conductive floor cleanroom china"),
]


def clean_markup(value: str) -> str:
    value = re.sub(r"<style\b[^>]*>.*?</style>", " ", value, flags=re.I | re.S)
    value = re.sub(r"<script\b[^>]*>.*?</script>", " ", value, flags=re.I | re.S)
    value = re.sub(r"<[^>]+>", " ", value)
    return re.sub(r"\s+", " ", html.unescape(value)).strip()


def normalize(value: str) -> str:
    value = html.unescape(value).lower().replace("&", " and ")
    value = re.sub(r"clean[ -]?rooms?", "cleanroom", value)
    value = re.sub(r"turn[ -]?key", "turnkey", value)
    value = re.sub(r"anti[ -]?static", "antistatic", value)
    value = value.replace("aluminium", "aluminum")
    value = re.sub(r"[^a-z0-9]+", " ", value)
    return re.sub(r"\s+", " ", value).strip()


records = []
for page in PAGES:
    markup = page["html"]
    headings = " ".join(
        clean_markup(match)
        for match in re.findall(r"<h[1-3]\b[^>]*>.*?</h[1-3]>", markup, flags=re.I | re.S)
    )
    records.append(
        {
            "route": page["route"],
            "title": page["title"],
            "description": page.get("description", ""),
            "headings": headings,
            "body": clean_markup(markup),
        }
    )

# These four pages are authored in app/solutions/[solution]/page.tsx rather than pages.json.
solution_source = (ROOT / "app/solutions/[solution]/page.tsx").read_text(encoding="utf-8")
for slug, title in re.findall(r"slug: '([^']+)'[\s\S]*?title: '([^']+)'", solution_source):
    block = solution_source.split(f"slug: '{slug}'", 1)[1].split("\n  },", 1)[0]
    strings = " ".join(re.findall(r"'([^']+)'", block))
    description_match = re.search(r"description: '([^']+)'", block)
    records.append(
        {
            "route": f"/solutions/{slug}/",
            "title": title,
            "description": description_match.group(1) if description_match else "",
            "headings": title,
            "body": strings,
        }
    )


for tier, keyword in KEYWORDS:
    needle = normalize(keyword)
    tokens = set(needle.split())
    hits = []
    for record in records:
        fields = [
            name
            for name in ("route", "title", "description", "headings", "body")
            if needle in normalize(record[name])
        ]
        if fields:
            hits.append((record["route"], "+".join(fields)))
    if hits:
        status = "EXACT"
        evidence = "; ".join(f"{route} [{fields}]" for route, fields in hits[:3])
    else:
        candidates = []
        for record in records:
            haystack = set(normalize(" ".join(record.values())).split())
            score = len(tokens & haystack) / len(tokens)
            if score >= 0.6:
                candidates.append((score, record["route"]))
        candidates.sort(reverse=True)
        status = "PARTIAL" if candidates else "MISSING"
        evidence = "; ".join(f"{route} ({score:.0%} tokens)" for score, route in candidates[:3]) or "-"
    print(f"{tier}\t{keyword}\t{status}\t{evidence}")
