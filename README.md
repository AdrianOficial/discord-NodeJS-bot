<h1>Discord Bot</h1>
În primul rând, vreau să spun că ceea ce am făcut aici este doar pentru a putea practica NodeJS. Vreau să învăț prin această metodă.<br>
Ce urmează să fac:

Ce am terminat:<br>
- [x] Set Activity la bot<br>
- [x] Comenzile funcționează printr-un prefix setat de tine în variabila `const prefix="!"`<br>
- [x] Comanda avatar este de două tipuri.Când vei scrie `!avatar` fără niciun argument o să apară avatarul tău, iar dacă o să scrieți `!avatar nume` o să apară avatarul celui pe care l-ați menționat<br>
- [x] Comanda `idle`.Dacă ai gradul de `ADMINISTRATOR` vei putea dirija botul în așa fel încât statusul la bot să se seteze automat pe IDLE.Dacă nu ai acest grad, vei primii un mesaj de la bot cu mesajul `nu ai functia de Administrator`<br>
- [x] Funcția `guildMemberAdd`.Adică atunci când un jucător va intra pe server o să se ducă pe canalul `welcome` care apropo se poate modifica de aici: `ch => ch.name === 'welcome'`.<br>
- [x] Sistemul de loguri.La fiecare comandă folosită (cele importante) se va creea un fișier numit `logs.txt`.Vă recomand să aveți programul `Notepad++` pentru a putea vedea logurile aranjate cum trebuie.<br>
- [x] Comanda `prost`.
- [x] Adăugată comanda `restart`, pe care doar Administratorii setați în variabila `const admin` o pot executa.
- [x] Adăugată comanda `kick` și `ban`.Ca să puteți da kick sau ban trebuie să aveți într-un rol permisiunea `BAN_MEMBERS` și `KICK_MEMBERS` activată.
- [x] Adăugat un sistem de `level`.Este un sistem basic cu XP, nu este cine știe ce, însă este foarte bun pentru început.Sistemul funcționează foarte bine.Conceptul este că levelul pe care îl ai se înmulțește cu 10.Atunci când XP-ul o să ajungă mai mare de cât levelul înmulțit cu 10, respectivul o să aibe level up
- [x] Adăugat un sistem de filtrarea cuvintelor vulgare.Alte cuvinte le puteți adăuga voi în variabila `const blacklist`
- [x] A fost adăugat un sitem de `dume` destul de complex.Ce înseamnă un sistem de dume? Voi veți adăuga dume(rekt-uri etc) prin comanda `/adduma [args]` (atenție trebuie să aveți administrator din funcția `const admin`).O dată ce ați adăugat duma(rekt-ul etc), jucătorii vor folosii comanda `/duma` sau `/duma @nume`. Dacă o să folosiți comanda `/duma` simplu fără niciun argument, botul o să vă dea vouă rekt-ul.Dacă adăugați cu argument, o să dea duma respectivului.

<hr>  
<h1>Cum îl instalez?</h1>
  1. Instalezi NodeJS de pe site-ul official.Îți las un link: https://nodejs.org/en/download/. Este foarte simplu.Vei selecta versiunea Windows (dacă folosești windows).<br>
  2. După ce ai instalat NodeJS vei intra în CMD și vei intra în folderul unde ai descărcat proiectul.<br>
  3. După ce ai intrat în proiect vei scrie următoarea comandă(în cmd) : npm install , npm install discord.js --save, npm install fs --save<br>
  4. Veți intra în index.js și veți modifica tokenul const botToken.<br>
  5. După ce ați făcut toate astea veți tasta node index.js<br>
  Dacă aveți alte probleme contactați-mă pe contul meu de discord: Adryan#0870<br>
<hr>
  <h1>Video Tutorial</h1>
  Tutorial pentru <a href="https://www.youtube.com/watch?v=lXWJKSfSTTU">Youtube / Windows</a><br>
  Tutorial pentru Youtube / Ubuntu / Debian
