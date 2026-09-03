# Scrollr* / Truth Hunters

Fiktivní sociální síť pro aktivitu **Truth Hunters (Hledači pravdy)** z AI olympiády
([aidetem.cz/ai-olympiada](https://aidetem.cz/ai-olympiada/)). Čistě statický web, žádný build,
žádný server. Nasazuje se z větve `main` na truth-hunters.cz.

## Struktura

```
index.html            rozcestník ročníků a zemí (truth-hunters.cz)
shared/               společné jádro pro všechny edice
  scrollr.css         styly feedu
  scrollr.js          logika feedu (načítá posts/*.md, komentáře, lightbox, uvítací okno)
  vendor/js-yaml      parser YAML hlavičky postů (hostovaný lokálně, žádné CDN)
  icons/, *.svg       ikony
2026/cz/              česká edice 2026
2026/sk/              slovenská edice 2026 (README.md = klíč odpovědí a TODO)
  index.html          úvodní stránka („Nevěř. Přemýšlej.“)
  feed.html           kostra feedu + texty rozhraní v daném jazyce
  posts/              jednotlivé questy (markdown s YAML hlavičkou) + index.json (pořadí)
  avatars/ images/ videos/ comments/ thumbnails/   média postů
  files/heslo.zip     zaheslovaný ZIP pro quest 03
  sites/              podvodné stránky (phishing iWant, prompt injection)
feed.html, sites/, files/   přesměrování ze starých adres české verze 2026 (bit.ly, záložky)
```

Každá edice je **samostatná složka se všemi svými médii**. Změna v jedné edici nikdy nerozbije
jinou, staré ročníky zůstávají online jako archiv. Společné je jen jádro ve `shared/`.

## Odkazy v postech

Cesty k médiím (`img`, `src`, `photo`) jsou relativní ke složce edice, například
`avatars/me.png`. Odkazy v textu postu, které musí být absolutní (ZIP, podvodné stránky),
používají zástupný text `{{BASE}}`:

```yaml
text: "zip je tady: {{BASE}}/files/heslo.zip"
```

Feed ho při načtení nahradí adresou složky edice (`https://truth-hunters.cz/2026/cz`).
Web tak funguje na libovolné doméně i lokálně, nic se nepřepisuje.

## Nová edice (další rok nebo země)

1. Zkopírujte složku nejbližší edice, např. `cp -r 2026/cz 2027/cz`.
2. Upravte `feed.html`: `<html lang>`, texty rozhraní v `window.SCROLLR_UI`, text uvítacího okna.
3. Upravte `index.html` (slogan a tlačítko) a posty v `posts/`.
4. Vyměňte média, vytvořte nový `files/heslo.zip` (`zip -P heslo heslo.zip heslo.txt`)
   a upravte hesla v `sites/`.
5. Přidejte odkaz do rozcestníku v kořenovém `index.html`.

Do `posts/index.json` patří seznam souborů v pořadí, v jakém se mají zobrazit.
Body se skloňují automaticky podle `points` v `SCROLLR_UI` (1 / 2–4 / 5 a více).

## Lokální spuštění

Feed načítá posty přes `fetch`, proto je potřeba webserver (ne otevření souboru):

```
npx http-server -p 8080 .
# http://localhost:8080/2026/cz/
```

## Nasazení na Webglobe (truth-hunters.cz)

Hosting je Nginx bez `.htaccess`, pro statické soubory není potřeba nic nastavovat.
Document root: `/www/hosting/truth-hunters.cz/www`. Obsah repozitáře (větev `main`) patří přímo
do document rootu, tedy `www/index.html`, `www/shared/…`, `www/2026/…`.

1. **Git v administraci Webglobe:** přidat repozitář `https://github.com/aidetemcz/scrollr`,
   větev `main`, cílový adresář document root. Repozitář je veřejný, deploy key není potřeba.
   Po každém pushi do `main` spustit deploy (v panelu, nebo přes webhook, který panel nabídne).
   Alternativa bez Gitu: nahrát obsah repozitáře přes FTP nebo správce souborů.
2. **Subdoména `www`:** dnes je nastavená jako *Přesměrování* (na Vercel). Přesměrování zrušit
   a nechat `www` mířit na stejný document root, případně přesměrovat `www` na doménu bez `www`.
3. **DNS:** doména používá nameservery Webglobe, takže stačí zkontrolovat, že záznamy A / AAAA
   pro `truth-hunters.cz` a `www` míří na hosting Webglobe a ne na Vercel (žádný CNAME na
   `*.vercel-dns.com`, žádná A na `76.76.21.21`).
4. **SSL:** Let's Encrypt je aktivní s automatickým obnovením, nic dalšího není potřeba.
5. Po přepnutí smazat projekt na Vercelu.

Zkrácené odkazy (bit.ly) pro phishingový quest 11 musí mířit na novou adresu edice,
např. `https://truth-hunters.cz/2026/sk/sites/iwant.html`. Starý český odkaz
`truth-hunters.cz/sites/iwant.html` dál funguje díky přesměrování v kořeni.

## Poznámky

- Videa jsou H.264 (`libx264`, `faststart`), aby hrála ve všech prohlížečích včetně Firefoxu.
  Komprese: `ffmpeg -i in.mp4 -vf "fps=24,scale=480:-2" -c:v libx264 -preset slow -crf 31
  -pix_fmt yuv420p -c:a aac -b:a 48k -ac 1 -movflags +faststart out.mp4`
- `images/gandhi.png` (uvítací post) má 9 MB a čeká na zmenšení.
- Google Analytics (`G-MVLPR98SN6`) je ve všech stránkách, statistiky jsou tedy společné.
