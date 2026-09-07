# Whole-site SEO and keyword coverage audit

Audit date: 2026-09-07  
Audited build: deployed v10 source (`869b9d8aec2f0f9acde954cd62515f6d73873b9b`)  
Scope: 60 imported routes, 4 custom solution routes, global metadata, JSON-LD, robots and sitemap

## Executive finding

Only **1 of the 30 supplied keyword groups is strongly addressed** by a dedicated page whose title/H1 carries the main commercial intent. **25 are partially addressed** by related pages or body copy but lack a strong combination of China, manufacturer and product/project intent in the title and H1. **4 are missing as meaningful topics**.

Definitions used in this audit:

- **Strong**: a dedicated, internally usable page has the main query intent in its URL/title/H1.
- **Partial**: a relevant page exists or the words occur in body/navigation text, but the title/H1 does not fully target the query or the page intent is weak.
- **Missing**: no useful page or substantive section addresses the topic.

An occurrence in navigation, footer copy, JSON-LD, or a meta-keywords field does not count as a strongly addressed search query.

## Keyword coverage

### A Tier — head terms

| Keyword group | Status | Best current page | Deficit / recommended target |
|---|---|---|---|
| china cleanroom | Partial | `/cleanroom/` | Phrase is present, but this is a thin/news-style page rather than the main commercial portal. Make `/` the authoritative China cleanroom manufacturer page. |
| chinese cleanroom | Partial | `/how-to-choose-a-reliable-chinese-cleanroom-supplier-for-your-project/` | Informational article coverage only. Support the homepage with natural supplier/manufacturer wording; do not create a near-duplicate page solely for “Chinese.” |
| cleanroom manufacturer china | Partial | `/` and `/cleanroom/` | Homepage H1 says manufacturer but omits China; `/cleanroom/` has weaker page intent. Target the homepage. |
| cleanroom manufacturer in china | Partial | `/` and `/modular-cleanroom-manufacturer-in-china-turnkey-cleanroom-solutions/` | Exact wording appears in body copy, but the general homepage title/H1 lacks the geographic modifier. |
| modular cleanroom (manufacturer) china | **Strong** | `/modular-cleanroom-manufacturer-in-china-turnkey-cleanroom-solutions/` | Dedicated title and H1 already match the buying intent. Refine description and internal links rather than creating another page. |
| modular cleanroom project in china | Partial | Same modular page | Topic appears in body copy but not in title/H1 as project intent. Add a project/case-study section and supporting case pages. |
| cleanroom panels manufacture china | Partial | `/china-cleanroom-panel/` and `/clean-room-panels/` | Two overlapping hubs split authority. Choose `/clean-room-panels/` as the canonical manufacturer hub and consolidate/redirect the competing page if their intent remains the same. |
| turnkey cleanroom project china | Partial | `/cleanroom-project/` | Strong project page exists but title/H1 omit China and turnkey. Target this page. |
| turnkey cleanroom project in china | Partial | `/cleanroom-project/` | Same intent as the preceding query; use one page to avoid cannibalization. |
| china cleanroom turn-key project provider | Partial | `/cleanroom-project/` | Related words occur across the site, but no focused title/H1 addresses provider + China + turnkey project intent. |

### B Tier — category and solution terms

| Keyword | Status | Best current page | Deficit / recommended target |
|---|---|---|---|
| prefabricated cleanroom china | **Missing** | Modular page is the closest | “Prefabricated” is absent. Add a substantive section to the modular page and use it as a synonym; create a separate URL only if the product/process differs materially. |
| cleanroom HVAC system china | Partial | `/hvac/` | Excellent topical page, but title/H1/description omit China and manufacturer/engineering location. |
| GMP clean room china | Partial | `/solutions/gmp-cleanrooms/` | Dedicated solution exists but title/H1 omit China and supplier/manufacturer intent. |
| ISO class cleanroom china | Partial | `/solutions/iso-class-5-cleanrooms/` | Strong technical page, but it targets only ISO Class 5 and omits China. Consider a broader ISO classification hub with links to class-specific pages. |
| air shower manufacturer china | Partial | `/air-shower/` | Dedicated product page exists; title is “for Cleanroom Applications” and omits manufacturer + China. |
| pass box manufacturer china | Partial | `/pass-box/` | Dedicated product page exists; title/H1 omit manufacturer + China. |
| clean booth manufacturer china | Partial | `/clean-booth/` | Dedicated product page exists; title/H1 omit manufacturer + China. |

### C Tier — long-tail product and industry terms

| Keyword | Status | Best current page | Deficit / recommended target |
|---|---|---|---|
| clean bench manufacturer china | Partial | `/clean-bench/` | Dedicated product page exists but lacks manufacturer + China in title/H1. |
| ISO class cleanroom manufacturer in china | Partial | `/solutions/iso-class-5-cleanrooms/` | The page is class-specific and lacks the manufacturer/location wording. Build a broader ISO cleanroom hub if multiple classes are supplied. |
| medical clean room manufacturer in china | **Missing** | GMP solution is only adjacent coverage | “Medical clean room” is absent as a substantive topic. Add `/solutions/medical-cleanrooms/` only if RVCS has real medical-device/healthcare capability and evidence. |
| cleanroom door manufacturer china | Partial | `/door-window/` | Combined product page has manufacturer in the title but omits China; door and window intent is not differentiated in headings. |
| cleanroom window manufacturer china | Partial | `/door-window/` | Description focuses on doors. Add a distinct window section with specifications, options and proof, or split the page if enough content exists. |

### D Tier — component and material terms

| Keyword | Status | Best current page | Deficit / recommended target |
|---|---|---|---|
| clean room partition panels china | Partial | `/clean-room-panels/` | Partition wording is present, but no focused title/H1 and China intent is absent. |
| cleanroom sandwich panel china | Partial | `/clean-room-panels/` | Sandwich panels are discussed; title/H1 lack sandwich + China. Use clear material/type subsections. |
| anti static wall panels cleanroom china | Partial | `/clean-room-panels/` | Anti-static wording appears, but there is no focused section that explains construction, performance and applications. |
| polycarbonate cleanroom panels china | **Missing** | None | “Polycarbonate” is absent. Add only if it is an actual supplied system, with specifications and original imagery. |
| acrylic cleanroom panels china | **Missing** | None | “Acrylic” is absent. Add only if it is an actual supplied system, with specifications and original imagery. |
| aluminum profile cleanroom system china | Partial | `/aluminium-profile/` | Relevant page exists under British spelling. Include both “aluminium” and natural “aluminum” wording, plus China/system intent. |
| cleanroom ceiling grid system china | Partial | `/ceiling/` | The page mentions grid solutions in its description, but title/H1 omit grid system + China. |
| raised floor / conductive floor cleanroom china | Partial | `/floor-treatment/` | Raised floor and anti-static floor are present; “conductive floor” is absent. Expand only around systems actually supplied. |

## Whole-site deficits

### 1. The current hosted build is private

The deployed Sites project is owner-only/custom access. Public search engines cannot crawl a private deployment. Keyword work cannot produce organic rankings until the intended production domain is publicly accessible.

### 2. The sitemap submits low-value and unrelated URLs

The sitemap currently includes every imported route plus all four solution pages: **64 URLs total**. It therefore submits:

- the 404 page;
- cart, checkout, account and shop utility pages;
- duplicate privacy and terms URLs;
- duplicate product URLs;
- **19 unrelated metalworking demo product pages** (benders, mallets, notchers, brakes and rollers).

These URLs should be removed from the sitemap. Utility and error pages should be `noindex`; duplicates should be redirected or canonicalized; unrelated demo products should be removed or redirected if they have no legitimate cleanroom purpose.

### 3. The homepage is not yet the China/manufacturer portal

The homepage title is strong for services—“Turnkey Modular Cleanrooms & HVAC Engineering”—and its H1 includes “Cleanroom Manufacturer,” but neither uses China. The supplied head-term cluster should be mapped to the homepage with one readable title/H1 rather than repeating every variation.

Suggested direction:

- Title: `Cleanroom Manufacturer in China | Turnkey Modular Cleanrooms | RVCS`
- H1: `China Cleanroom Manufacturer for Turnkey Modular Projects`
- Description: mention design, manufacture, HVAC, installation, ISO/GMP applications and export/project support in natural prose.

### 4. Commercial modifiers are missing from most category pages

The existing architecture is usable: there are dedicated URLs for HVAC, air showers, pass boxes, clean booths, clean benches, doors/windows, ceiling, floors and profiles. Most titles were written as generic product descriptions and omit “manufacturer” and “China.” Each query cluster should have one owner page, a unique title/H1, useful specifications, FAQs, proof and internal links.

### 5. Overlapping pages create cannibalization risk

The clearest conflict is `/china-cleanroom-panel/` versus `/clean-room-panels/`. Several generic pages also overlap: `/`, `/cleanroom/`, `/services/`, `/cleanroom-project/`, and the modular cleanroom page. Assign one search intent to each page and consolidate pages that cannot support a distinct purpose.

### 6. Duplicate metadata exists

Five duplicate title groups exist in the imported data, including cart/checkout, duplicate privacy URLs and three duplicate demo-product pairs. A generic description—“Cleanroom design, manufacturing, installation and validation services.”—is reused across 26 routes. Search-facing pages need unique descriptions; utility/demo pages should not be indexed.

### 7. Canonical and sitemap consistency needs tightening

Imported content pages receive canonical URLs, but the homepage has no explicit canonical. The sitemap declares `https://rvcleans.com` even though the reviewed hosted build uses a different domain. This is correct only when the final public site is actually served at `https://rvcleans.com`; the production host, canonicals, JSON-LD URLs, robots sitemap URL and Search Console property must all agree.

### 8. Structured data is a good foundation, not keyword coverage

Organization JSON-LD now describes RVCS as a cleanroom engineering/manufacturing company and lists appropriate expertise. The four custom solution pages include Service schema. Add breadcrumb schema and page-specific Product/Service data where the visible page provides matching facts. Do not treat `knowsAbout`, schema fields, or the `keywords` metadata array as substitutes for visible, useful landing-page content.

### 9. Content proof is thin on several product pages

Many product pages have only a generic introduction. To compete for manufacturer queries, add factual specifications, configuration choices, standards, factory/project evidence, export/service scope, original images with descriptive alt text, FAQs and related case studies. Avoid adding claims, certifications, materials or performance figures that RVCS cannot document.

## Recommended keyword-to-page map

| Target page | Primary cluster |
|---|---|
| `/` | china cleanroom; cleanroom manufacturer in China; Chinese cleanroom manufacturer |
| `/modular-cleanroom-manufacturer-in-china-turnkey-cleanroom-solutions/` | modular and prefabricated cleanroom manufacturer China |
| `/cleanroom-project/` | turnkey cleanroom project/provider China |
| `/clean-room-panels/` | cleanroom panel manufacturer China; partition/sandwich/material panel terms |
| `/hvac/` | cleanroom HVAC system China |
| `/solutions/gmp-cleanrooms/` | GMP clean room China |
| `/solutions/iso-class-5-cleanrooms/` plus a future ISO hub if warranted | ISO Class cleanroom manufacturer China |
| `/air-shower/`, `/pass-box/`, `/clean-booth/`, `/clean-bench/` | matching equipment manufacturer China queries |
| `/door-window/` | cleanroom door and window manufacturer China |
| `/aluminium-profile/` | aluminum/aluminium profile cleanroom system China |
| `/ceiling/` | cleanroom ceiling grid system China |
| `/floor-treatment/` | raised, anti-static and conductive cleanroom flooring China |
| Future `/solutions/medical-cleanrooms/` if supported by evidence | medical clean room manufacturer China |

## Implementation order

1. Make the production site publicly crawlable on the intended canonical domain.
2. Clean the sitemap and add `noindex`/redirects for utility, duplicate and unrelated demo URLs.
3. Rework the homepage around the A-tier general manufacturer cluster.
4. Assign one owner URL to every cluster and resolve the panel/general-page overlaps.
5. Rewrite titles, descriptions and H1s for the existing B/C/D category pages.
6. Add substantive specifications, FAQs, project evidence and internal links.
7. Add missing topics only where real products and evidence exist.
8. Submit the cleaned sitemap and validate representative URLs in Search Console.
