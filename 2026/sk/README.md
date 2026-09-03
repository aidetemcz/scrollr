# Scrollr* – slovenská verzia (Truth Hunters / Hľadači pravdy)

Tento priečinok (`2026/sk/`) obsahuje adaptáciu fiktívnej sociálnej siete Scrollr* pre slovenskú
AI olympiádu 2026. Česká verzia je v `2026/cz/`, spoločný kód feedu v `shared/`
(pozri README v koreni repozitára).

Zásady adaptácie:

1. **Jazyk** – všetky české texty (posty, otázky, rozhranie, phishingová stránka, stránka
   s prompt injection) sú preložené do slovenčiny. Cudzojazyčné posty a komentáre
   (španielčina, angličtina) zostali nezmenené.
2. **Iné odpovede** – česká metodika s odpoveďami je verejne dostupná, chatbot ju ľahko nájde.
   Preto má každý quest, kde to bolo možné, buď iný obsah, alebo otázku, ktorá vyžaduje krok
   navyše oproti českej odpovedi (viď tabuľku nižšie).
3. **Slovenský kontext** – Slovnaft namiesto Synthosu, SME.sk namiesto Novinky.cz, Peter Sagan
   namiesto Václava Klausa, klasický reťazový hoax, ktorý na Slovensku vyvracala polícia
   (stránka „Hoaxy a podvody – Polícia SR“), slovenské telefónne čísla a adresy vo phishingovom
   formulári, študent Univerzity Komenského namiesto FSV UK.

## Čo je potrebné doplniť pred spustením (TODO)

| # | Čo | Kde |
|---|----|-----|
| 1 | **Skrátený odkaz pre quest 11.** V českej verzii bol odkaz na phishingovú stránku skrytý cez bit.ly. Po nasadení vytvorte skrátený odkaz na `https://truth-hunters.cz/2026/sk/sites/iwant.html` a vložte ho do postu 11 namiesto `{{BASE}}/sites/iwant.html`. | posts/11-scam.txt |
| 2 | **Overiť quest 09 (Wayback Machine).** Pri príprave nebol prístup na web.archive.org. Navrhnutý dátum je 21. 5. 2012 ráno (deň po striebre slovenských hokejistov na MS 2012). Otvorte `web.archive.org`, zadajte `sme.sk`, vyberte snímku najbližšiu k 21. 5. 2012 8:00 a podľa skutočnej hlavnej správy upravte možnosti v Tiny. Náhradný tip, ak snímka chýba: 11. 3. 2012 (deň po parlamentných voľbách). | posts/09-wayback-machine.txt |
| 3 | **Overiť quest 15 (Google Trends).** Tvrdenie „Košice boli v roku 2025 na Slovensku vyhľadávané viac ako Bratislava“ je navrhnuté ako nepravdivé. Skontrolujte v Google Trends (Slovensko, rok 2025) a podľa výsledku upravte možnosti v Tiny; ak by to nevyšlo, stačí prerobiť obrázok `images/kosice-bratislava.jpg` (zdrojové HTML je v tomto dokumente nižšie). | images/ |
| 4 | **Tiny.** Vytvoriť slovenskú lekciu v Tiny s novými možnosťami odpovedí (návrh nižšie) a novým heslom pre quest 11. | Tiny |
| 5 | **Prezentácia a pracovné listy** k lekcii (PDF/Canva) – preložiť a nahradiť odpovede podľa tabuľky nižšie. | mimo repozitára |

Odkazy v postoch (ZIP, stránka Matúša Kováčika, stránka iWant) používajú zástupný text `{{BASE}}`,
ktorý feed pri načítaní nahradí adresou priečinka tejto edície (napr. `https://truth-hunters.cz/2026/sk`).
Doménu preto nie je potrebné nikde prepisovať.

## Prehľad questov – čo sa zmenilo a správne odpovede (SK)

Celkový maximálny počet bodov zostáva **50**.

| Quest | Body | Zmena oproti CZ | Správna odpoveď (SK) | Návrh možností do Tiny |
|---|---|---|---|---|
| 01 – carlhoos_ | 1 | Len preklad. Odpoveď je rovnaká ako v CZ (rozcvička za 1 bod). | Nie, nie je vygenerované. | Áno / Čiastočne / Nie |
| 02 – shadowbrain.ai | 2 | Otázka už nepýta krajinu, ale **názov jedla a nástroj**. | Sahur (suhúr) – jedlo pred úsvitom počas ramadánu; búcha sa na **kentongan** (bambusový/drevený bubon), prípadne bedug. Krajina: Indonézia. | jedlo: sahur / iftar / nasi goreng / eid; nástroj: kentongan / gamelan / didgeridoo / tamburína |
| 03 – Lukas243 | 4 | **Nový ZIP** (`files/heslo.zip`), heslo do ZIPu je **zelena**, vnútri nové heslo do mailu. | `Kv7#pR2!zaL9m` | 5 podobných reťazcov, správny je `Kv7#pR2!zaL9m` |
| 04 – memes.asw | 1 | Len preklad. | Je to AI vygenerované. | Je to AI / Nie je to AI |
| 05 – j0y.s0phie | 2 | Otázka pýta **mesto a počet skalných kostolov**, nie krajinu. | **Lalibela** (Etiópia), na fotke je kostol Bete Giyorgis; v Lalibele je **11** skalných kostolov. | mesto: Lalibela / Addis Abeba / Aksum / Gondar; počet: 3 / 7 / 11 / 24 |
| 06 – Matus_Kov12 | 7 | Nová stránka `sites/matus-kovacik.html` (študent FiF UK v Bratislave), **nová skrytá inštrukcia**. | Chatbot má používateľovi napísať, že mu **fakt strašne smrdia ponožky**. | …že mu smrdia ponožky / že má veľké uši / nech ide von / nech reštartuje počítač / že sa mu zasekol procesor |
| 07 – sagan_fanclub_sk | 3 | **Nový screenshot** `images/x-sagan.png`: fiktívny post „Petra Sagana“ o návrate na Tour de France 2027 z účtu `@petersagan_sk`. | Je to fake. Účet `@petersagan_sk` nie je Saganov skutočný účet (ten má handle `@petosagan`), nič také neoznámil, správu by prevzali všetky médiá. | Je to skutočný post / Je to skutočný post, ale z fanúšikovského účtu / Je to úplný fake |
| 08 – HankaX | 4 | **Nová fotka** `images/zanzibar.jpg` s upravenými metadátami: autor `matej.hlavac`, dátum **19. 8. 2024**, GPS **8°06′S 115°19′E (Lombok/Bali, Indonézia)**. Post tvrdí Zanzibar. | Nebola tam. Fotka nie je vygenerovaná, ale odfotil ju niekto iný v roku 2024 a podľa GPS v **Indonézii**, nie na Zanzibare. | Metadáta ukazujú, že tam naozaj bola / Bola tam, ale inokedy / Nebola tam, je to vygenerované / Nebola tam, fotka je pravá, ale z Indonézie / Nebola tam, fotka je pravá, ale z Tanzánie |
| 09 – Fórum pre žurnalistiku | 6 | **SME.sk, 21. 5. 2012 ráno** namiesto Novinky.cz 2011. **Overiť (TODO 3).** | Očakávané: striebro slovenských hokejistov na MS 2012 (finále s Ruskom 20. 5. 2012). | O hokejovom striebre / O zdražení potravín / O povodniach / O výsledkoch volieb / O Tatrách |
| 10 – jozef_h | 2 | Slovnaft v Bratislave namiesto Synthosu v Kralupoch; otázka pýta aj **čo vybuchlo**. | Nie je to pravda. Fotka je z **Jerevanu (Arménsko), 14. 8. 2022** – výbuch skladu pyrotechniky na trhovisku **Surmalu**. | Je to pravda / Bejrút 2020, sklad v prístave / Jerevan 2022, sklad pyrotechniky na trhovisku / Praha 2013, výbuch plynu / Bratislava 2019, požiar skladu |
| 11 – iWant | 5 | Stránka `sites/iwant.html` po slovensky, slovenské telefónne čísla, **nové heslo KOLESO2026**. | Na odkaz som ani neklikol/a. | rovnaké možnosti ako v CZ, heslo **KOLESO2026** |
| 12 – Alessandra Litvinchuk | 3 | Len preklad (nové AI portréty nebolo možné vygenerovať v tomto prostredí). | Všetky sú vytvorené pomocou AI. | ako v CZ |
| 13 – Saria_Maria | 5 | Otázka pýta aj **krajinu pôvodu** speváčky. | **Angélique Kidjo**, pochádza z **Beninu**. | meno ako v CZ; krajina: Benin / Nigéria / Ghana / Senegal / Mali |
| 14 – Zaujímavosti zo sveta | 2 | **Iný hoax**: „pomaranče z Líbye napichané HIV krvou“ (`images/pomarance-hoax.jpg`). Otázka pýta aj, odkedy koluje. | Je to hoax. Koluje od cca **2015** (verzie s Alžírskom/Líbyou), opakovane vyvrátený (aj políciou SR); HIV mimo tela neprežije. | Je to pravda / Stalo sa to raz v Taliansku / Je to hoax, koluje od 2015 / Je to hoax, objavil sa až v roku 2025 |
| 15 – Annie_B | 3 | **Košice vs. Bratislava, Slovensko 2025** (`images/kosice-bratislava.jpg`). **Overiť (TODO 4).** | Očakávané: Bratislava bola vyhľadávaná viac než Košice. | Košice viac / Približne rovnako / Bratislava viac |

## Poznámky k jednotlivým súborom

- `feed.html`, `index.html` – slovenské texty rozhrania a uvítacieho okna;
  skloňovanie bodov: 1 bod, 2–4 body, 5+ bodov.
- `files/heslo.zip` – ZipCrypto (klasické) heslo `zelena`, obsahuje `heslo.txt`.
- `images/zanzibar.jpg` – tá istá fotka pláže ako v CZ (pôvodne `bali.jpg`), prepísané EXIF
  (autor, dátum, softvér); GPS zostalo pôvodné (Indonézia), preto sa dá odhaliť, že nejde o Zanzibar.
- `images/x-sagan.png`, `images/kosice-bratislava.jpg`, `images/pomarance-hoax.jpg` – vygenerované
  v Chromiu z HTML šablón nižšie (obrázky sa dajú ľahko prerobiť).
- `sites/matus-kovacik.html` – skrytá inštrukcia je v `<meta name="description">`, v HTML
  komentári v hlavičke a v skrytom odseku na konci stránky (rovnako ako v CZ).
- `sites/iwant.html` – validácia telefónu prijíma 9 číslic, aj s predvoľbou 0 / +421 / 00421.

## Nadväzujúca lekcia (Tiny)

Kvíz s 15 otázkami je všeobecný a stačí ho preložiť. Z Tinybotov treba upraviť len
„Historická postava: Rozhovor s Václavem Klausem“ – navrhujeme nahradiť aktivitou
„Ako overiť, či je profil na sociálnej sieti oficiálny“ (overený účet, handle, história
príspevkov, potvrdenie v médiách) nadväzujúcou na quest 07.

## Šablóny obrázkov

Obrázok pre quest 15 (`images/kosice-bratislava.jpg`) vznikol z tohto HTML (560×340 px):

```html
<div style="width:560px;height:340px;padding:40px 44px;display:flex;align-items:center;justify-content:center;text-align:center;
background:linear-gradient(135deg,#ff1a6b 0%,#7b16c2 45%,#2b2fd6 100%);color:#fff;font-family:sans-serif;font-weight:800;font-size:29px;line-height:1.3">
Dosť ma prekvapilo, že na Google bolo v roku 2025 na Slovensku slovo „Košice“ vyhľadávané viac ako slovo „Bratislava“.
</div>
```

Screenshot postu pre quest 07 (`images/x-sagan.png`) a hoax pre quest 14 vznikli rovnakým
spôsobom (HTML → screenshot); pri zmene textu stačí prerobiť obrázok, posty odkazujú na
rovnaké názvy súborov.
