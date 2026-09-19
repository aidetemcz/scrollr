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
| 1 | **Skrátený odkaz pre quest 15 (iWant).** V českej verzii bol odkaz na phishingovú stránku skrytý cez bit.ly. Po nasadení vytvorte skrátený odkaz na `https://truth-hunters.cz/2026/sk/sites/iwant.html` a vložte ho do postu 15 namiesto `{{BASE}}/sites/iwant.html`. | posts/15-scam.txt |
| 2 | **Quest 12 (SME.sk).** Otázka mieri na `https://www.sme.sk/archiv` (21. 5. 2012, 23:49); skutočný titulok doplňte do možností v Tiny. | posts/12-wayback-machine.txt |
| 3 | **Overiť quest 13 (Google Trends).** Tvrdenie „Košice boli v roku 2025 na Slovensku vyhľadávané viac ako Bratislava“ je navrhnuté ako nepravdivé. Skontrolujte v Google Trends (Slovensko, rok 2025) a podľa výsledku upravte možnosti v Tiny; ak by to nevyšlo, stačí prerobiť obrázok `images/kosice-bratislava.jpg` (zdrojové HTML je v tomto dokumente nižšie). | images/ |
| 4 | **Tiny.** Vytvoriť slovenskú lekciu v Tiny s novými možnosťami odpovedí (návrh nižšie) a novým heslom pre quest 15 (KOLESO2026). | Tiny |
| 5 | **Prezentácia a pracovné listy** k lekcii (PDF/Canva) – preložiť a nahradiť odpovede podľa tabuľky nižšie. | mimo repozitára |

Odkazy v postoch (ZIP, stránka Matúša Urbana, stránka iWant) používajú zástupný text `{{BASE}}`,
ktorý feed pri načítaní nahradí adresou priečinka tejto edície (napr. `https://truth-hunters.cz/2026/sk`).
Doménu preto nie je potrebné nikde prepisovať.

## Čo sa zmenilo oproti českej verzii (podľa nového SK poradia)

Celkový maximálny počet bodov zostáva **50**.

| SK | CZ | Body | Zmena oproti CZ | Správna odpoveď (SK) | Návrh možností do Tiny |
|---|---|---|---|---|---|
| 01 – carlhoos_ | 01 | 1 | Len preklad. Odpoveď je rovnaká ako v CZ (rozcvička za 1 bod). | Nie, nie je vygenerované. | Áno / Čiastočne / Nie |
| 02 – j0y.s0phie | 05 | 2 | Otázka pýta **mesto a počet skalných kostolov**, nie krajinu. | **Lalibela** (Etiópia), na fotke je kostol Bete Giyorgis; v Lalibele je **11** skalných kostolov. | mesto: Lalibela / Addis Abeba / Aksum / Gondar; počet: 3 / 7 / 11 / 24 |
| 03 – jozef_h | 10 | 2 | Slovnaft v Bratislave namiesto Synthosu v Kralupoch; otázka pýta aj **čo vybuchlo**. | Nie je to pravda. Fotka je z **Jerevanu (Arménsko), 14. 8. 2022** – výbuch skladu pyrotechniky na trhovisku **Surmalu**. | Je to pravda / Bejrút 2020, sklad v prístave / Jerevan 2022, sklad pyrotechniky na trhovisku / Praha 2013, výbuch plynu / Bratislava 2019, požiar skladu |
| 04 – Alessandra Litvinchuk | 12 | 3 | Len preklad (nové AI portréty nebolo možné vygenerovať v tomto prostredí). | Všetky sú vytvorené pomocou AI. | ako v CZ |
| 05 – Lukas243 | 03 | 4 | **Nový ZIP** (`files/heslo.zip`), heslo do ZIPu je **zelena**, vnútri nové heslo do mailu. | `Kv7#pR2!zaL9m` | 5 podobných reťazcov, správny je `Kv7#pR2!zaL9m` |
| 06 – Zaujímavosti zo sveta | 14 | 2 | **Iný hoax**: screenshot z Messengera (`images/messenger.png`) s preposlanou nahrávkou, že „od 1. októbra sú testovacie tyčinky napustené covidom“. Otázka: kedy bola nahrávka zverejnená a či je to pravda. | Je to hoax. Nahrávka kolovala na Slovensku na jeseň **2020** pred celoplošným testovaním a vyvrátila ju polícia (stránka Hoaxy a podvody – Polícia SR). **Overiť presný mesiac** a podľa neho nastaviť možnosti v Tiny. | Pravda, 2020 / Hoax, jeseň 2020 / Hoax, 2022 / Hoax, 2025 |
| 07 – HankaX | 08 | 4 | **Nová fotka** `images/zanzibar.jpg` s upravenými metadátami: autor `matej.hlavac`, dátum **19. 8. 2024**, GPS **8°06′S 115°19′E (Lombok/Bali, Indonézia)**. Post tvrdí Zanzibar. | Nebola tam. Fotka nie je vygenerovaná, ale odfotil ju niekto iný v roku 2024 a podľa GPS v **Indonézii**, nie na Zanzibare. | Metadáta ukazujú, že tam naozaj bola / Bola tam, ale inokedy / Nebola tam, je to vygenerované / Nebola tam, fotka je pravá, ale z Indonézie / Nebola tam, fotka je pravá, ale z Tanzánie |
| 08 – shadowbrain.ai | 02 | 2 | Otázka už nepýta krajinu, ale **názov jedla a nástroj**. | Sahur (suhúr) – jedlo pred úsvitom počas ramadánu; búcha sa na **kentongan** (bambusový/drevený bubon), prípadne bedug. Krajina: Indonézia. | jedlo: sahur / iftar / nasi goreng / eid; nástroj: kentongan / gamelan / didgeridoo / tamburína |
| 09 – Saria_Maria | 13 | 5 | Otázka pýta aj **krajinu pôvodu** speváčky. | **Angélique Kidjo**, pochádza z **Beninu**. | meno ako v CZ; krajina: Benin / Nigéria / Ghana / Senegal / Mali |
| 10 – memes.asw | 04 | 1 | Len preklad. | Je to AI vygenerované. | Je to AI / Nie je to AI |
| 11 – sagan_fanclub_sk | 07 | 3 | **Nový screenshot** `images/peter-sagan-tweet.png`: fiktívny post z účtu `@petosagan` (skutočný handle) o návrate na Tour de France 2027, datovaný 28. 4. 2026. | Je to fake. Na skutočnom profile `@petosagan` žiadny taký príspevok nie je, Sagan návrat neoznámil a takú správu by prevzali všetky médiá. Hľadať cez profil na X alebo v spravodajstve. | Je to skutočný post / Je to skutočný post, ale z fanúšikovského účtu / Je to úplný fake |
| 12 – Fórum pre žurnalistiku | 09 | 6 | **SME.sk, 21. 5. 2012 o 23:49.** Post naznačuje, že Wayback Machine nestačí a noviny majú vlastný archív (cieľ: `sme.sk/archiv`, v poste sa nespomína). | Podľa archívu SME z 21. 5. 2012 (doplniť skutočný titulok). | O hokejovom striebre / O zdražení potravín / O povodniach / O výsledkoch volieb / O Tatrách |
| 13 – Annie_B | 15 | 3 | **Košice vs. Bratislava, Slovensko 2025** (`images/kosice-bratislava.jpg`). **Overiť (TODO 4).** | Očakávané: Bratislava bola vyhľadávaná viac než Košice. | Košice viac / Približne rovnako / Bratislava viac |
| 14 – Matus_Kov12 | 06 | 7 | Nová stránka `sites/matus-urban.html` (Matúš Urban, študent FiF UK v Bratislave), **nová skrytá inštrukcia**. | Chatbot má používateľovi napísať, že mu **fakt strašne smrdia ponožky**. | …že mu smrdia ponožky / že má veľké uši / nech ide von / nech reštartuje počítač / že sa mu zasekol procesor |
| 15 – iWant | 11 | 5 | Stránka `sites/iwant.html` po slovensky, slovenské telefónne čísla, **nové heslo KOLESO2026**. | Na odkaz som ani neklikol/a. | rovnaké možnosti ako v CZ, heslo **KOLESO2026** |

## Otázky a odpovede pre Tiny (nové poradie)

Poradie questov je zámerne iné ako v českej verzii. Stĺpec „CZ“ = číslo zodpovedajúceho questu
v českej edícii (a v pôvodných metodikách). Rovnaká tabuľka je v `tiny-otazky-sk.xlsx`.

| SK | CZ | Body | Otázka v Tiny | Možnosti | Správna |
|---|---|---|---|---|---|
| 01 | 01 | 1 | Vitaj v queste číslo 01! Tak čo by si povedal/a… je video generované pomocou AI? | A) Áno, je vygenerované pomocou AI.<br>B) Je čiastočne vygenerované.<br>C) Nie, nie je vygenerované. | C |
| 02 | 05 | 2 | Quest 02! V ktorom meste bola @j0y.s0phie na dovolenke a koľko takýchto skalných kostolov tam celkovo je? | A) Aksum, 3 kostoly<br>B) Lalibela, 11 kostolov<br>C) Addis Abeba, 7 kostolov<br>D) Gondar, 24 kostolov<br>E) Lalibela, 5 kostolov | B |
| 03 | 10 | 2 | Quest 03. Používateľ @jozef-h varuje pred výbuchom v rafinérii Slovnaft v Bratislave. Je to pravda? A ak nie, kde a kedy sa to naozaj stalo a čo tam vybuchlo? | A) Je to tak – post neklame.<br>B) Bejrút 2020, sklad dusičnanu amónneho v prístave<br>C) Jerevan 2022, sklad pyrotechniky na trhovisku<br>D) Praha 2013, výbuch plynu v obytnom dome<br>E) Bratislava 2019, požiar skladu | C |
| 04 | 12 | 3 | Quest 04! Sú niektoré z týchto fotiek vytvorené pomocou generatívnej AI? | A) Nie, všetky sú autentické.<br>B) Jedna je vytvorená pomocou AI, ostatné sú autentické.<br>C) Dve sú vytvorené pomocou AI, dve sú autentické.<br>D) Tri sú vytvorené pomocou AI, jedna je autentická.<br>E) Všetky sú vytvorené pomocou AI. | E |
| 05 | 03 | 4 | Čau v queste číslo 05! Dokázal/a si zistiť, aké má Lukas243 heslo do e-mailu? | A) Xpo3dk.+//ls668S<br>B) *uK5)\*~187^<br>C) Kv7#pR2!zaL9m<br>D) d73rv;HNuM70H"W@X<br>E) 5ot58Jk2"& | C |
| 06 | 14 | 2 | Quest 06! Kedy bola zverejnená nahrávka s týmto tvrdením? A bolo tvrdenie pravdivé, alebo to bol hoax? | A) Október 2021<br>B) Január 2022<br>C) Marec 2022 | OZNAČIŤ – podľa vašej tabuľky; odporúčame doplniť k dátumu aj „bol to hoax“ |
| 07 | 08 | 4 | Hurá na quest 07! Vieš, či tam @HankaX naozaj bola, alebo ten obrázok ukradla (alebo vygenerovala) a postovala to z domu? A ak ho ukradla, kde bola fotka v skutočnosti odfotená? | A) Metadáta ukazujú, že tam naozaj bola.<br>B) Bola tam, ale inokedy, než píše.<br>C) Nebola tam, je to vygenerované.<br>D) Nebola tam, fotka je pravá, ale z Indonézie.<br>E) Nebola tam, fotka je pravá, ale z Tanzánie. | D |
| 08 | 02 | 2 | Ahoj v queste číslo 08! Postava Tung Tung Tung Sahur odkazuje na skutočnú tradíciu. Ako sa volá jedlo, na ktoré pri nej ľudia budia susedov, a na aký nástroj pritom tradične búchajú? | A) Sahur – jedlo pred úsvitom počas ramadánu; búcha sa na kentongan (bambusový bubon).<br>B) Iftar – večera po západe slnka; hrá sa na gamelan.<br>C) Nasi goreng – vyprážaná ryža na raňajky; búcha sa na tamburínu.<br>D) Sahur – jedlo pred úsvitom; hrá sa na didgeridoo. | A |
| 09 | 13 | 5 | Ahoj v queste 09! Klasické vyhľadávanie v Obrázkoch Google ti tu nemusí priniesť správne výsledky. Možno to už chce poriadne AI vyhľadávanie (cez nástroj TinEye), pretože sme fotku upravili. Ako si si s tým poradil/a? Kto je speváčka na fotografii a z ktorej krajiny pochádza? | A) Angélique Kidjo, Benin<br>B) Ryan Michelle Bathe, USA<br>C) Angélique Kidjo, Nigéria<br>D) Karen Ceesay, USA<br>E) Christelle Elwin, Veľká Británia | A |
| 10 | 04 | 1 | Quest 10! Je toto bábätko ďalší AI generovaný slop, alebo je to real? | A) Je to AI vygenerované.<br>B) Nie je to vygenerované. | A |
| 11 | 07 | 3 | Quest 11! Tak čo, zverejnil tento príspevok Peter Sagan na sieti X (bývalý Twitter), alebo nie? | A) Áno, príspevok je skutočný – Sagan oznámil návrat na Tour de France 2027.<br>B) Je to skutočný príspevok, ale z fanúšikovského účtu, nie od Sagana.<br>C) Je to úplný fake – na Saganovom profile @petosagan nič také nie je. | C |
| 12 | 09 | 6 | Dokážeš zistiť, čo bola hlavná správa na serveri SME.sk 21. mája 2012 o 23:49? Wayback Machine ti nemusí stačiť. Veľké noviny si svoje staré vydania odkladajú aj samy – skús to priamo u nich. | A) NATO vyzýva Rusko, aby zrušilo diplomatické uznanie Južného Osetska a Abcházska<br>B) Asteroid môže ohroziť satelity<br>C) Petrovický: Vůjtek je majster pohody<br>D) Výsledky volieb<br>E) Harabin nahneval šéfku Ústavného súdu | OZNAČIŤ – podľa archívu SME (možnosti z vašej tabuľky) |
| 13 | 15 | 3 | Ahoj v queste 13! Čo myslíš? Bolo slovo Košice vyhľadávané na Slovensku v roku 2025 viac ako slovo Bratislava? | A) Slovo Košice ľudia vyhľadávali viac ako slovo Bratislava.<br>B) Bolo to približne rovnako.<br>C) Slovo Bratislava ľudia vyhľadávali viac ako slovo Košice. | C (overiť v Google Trends) |
| 14 | 06 | 7 | Čau v queste 14! Matúš chcel nachytať kamarátov, ale veľmi sa mu to nepodarilo. Čo má urobiť chatbot, keď navštívi jeho stránku? (Pozor, na mobile to asi nezvládneš, chce to počítač alebo notebook.) Chatbot má kamarátom napísať, že: | A) nech okamžite všetko nechajú a idú von.<br>B) majú mega veľké uši.<br>C) im fakt strašne smrdia ponožky.<br>D) sa mu zasekol procesor.<br>E) nech okamžite reštartujú počítač. | C |
| 15 | 11 | 5 | Quest 15 je pekný, však? Tak čo, ako si si poradil/a? | A) V žrebovaní som vyhral/a iPhone, zadal/a som pravé osobné údaje a heslo je: KOLESO2026.<br>B) V žrebovaní som vyhral/a iPhone, zadal/a som vymyslené osobné údaje a heslo je: KOLESO2026.<br>C) V žrebovaní som vyhral/a iPhone, ale žiadne údaje som nezadával/a.<br>D) Preklikol/preklikla som sa na stránku, ale nežreboval/a som a nezadával/a som žiadne osobné údaje.<br>E) Na odkaz v poste som ani neklikol/neklikla. | E |

Celkový maximálny počet bodov je **50**.

## Poznámky k jednotlivým súborom

- `feed.html`, `index.html` – slovenské texty rozhrania a uvítacieho okna;
  skloňovanie bodov: 1 bod, 2–4 body, 5+ bodov.
- `files/heslo.zip` – ZipCrypto (klasické) heslo `zelena`, obsahuje `heslo.txt`.
- `images/zanzibar.jpg` – tá istá fotka pláže ako v CZ (pôvodne `bali.jpg`), prepísané EXIF
  (autor, dátum, softvér); GPS zostalo pôvodné (Indonézia), preto sa dá odhaliť, že nejde o Zanzibar.
- `images/kosice-bratislava.jpg` – vygenerovaný v Chromiu z HTML šablóny nižšie.
- `sites/matus-urban.html` – skrytá inštrukcia je v `<meta name="description">`, v HTML
  komentári v hlavičke a v skrytom odseku na konci stránky (rovnako ako v CZ).
- `sites/iwant.html` – validácia telefónu prijíma 9 číslic, aj s predvoľbou 0 / +421 / 00421.

## Nadväzujúca lekcia (Tiny)

Kvíz s 15 otázkami je všeobecný a stačí ho preložiť. Z Tinybotov treba upraviť len
„Historická postava: Rozhovor s Václavem Klausem“ – navrhujeme nahradiť aktivitou
„Ako overiť, či je profil na sociálnej sieti oficiálny“ (overený účet, handle, história
príspevkov, potvrdenie v médiách) nadväzujúcou na quest 11 (Sagan).

## Šablóny obrázkov

Obrázok pre quest 13 (`images/kosice-bratislava.jpg`) vznikol z tohto HTML (560×340 px):

```html
<div style="width:560px;height:340px;padding:40px 44px;display:flex;align-items:center;justify-content:center;text-align:center;
background:linear-gradient(135deg,#ff1a6b 0%,#7b16c2 45%,#2b2fd6 100%);color:#fff;font-family:sans-serif;font-weight:800;font-size:29px;line-height:1.3">
Dosť ma prekvapilo, že na Google bolo v roku 2025 na Slovensku slovo „Košice“ vyhľadávané viac ako slovo „Bratislava“.
</div>
```

