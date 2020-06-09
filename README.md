<h1>Discord Bot</h1>
În primul rând, vreau să spun că ceea ce am făcut aici este doar pentru a putea practica noduri. Vreau să învăț prin această metodă.

Ce urmează să fac: 
- [ ] Sistemul de ban
- [ ] Sistemul de kick
- [ ] Sistemul de mute

Ce am terminat:<br>
- [x] Set Activity la bot<br>
- [x] Comenzile funcționează printr-un prefix setat de tine în variabila `const prefix="!"`<br>
- [x] Comanda avatar este de două tipuri.Când vei scrie `!avatar` fără niciun argument o să apară avatarul tău, iar dacă o să scrieți `!avatar nume` o să apară avatarul celui pe care l-ați menționat<br>
- [x] Comanda `idle`.Dacă ai gradul de `ADMINISTRATOR` vei putea dirija botul în așa fel încât statusul la bot să se seteze automat pe IDLE.Dacă nu ai acest grad, vei primii un mesaj de la bot cu mesajul `nu ai functia de Administrator`<br>
- [x] Funcția `guildMemberAdd`.Adică atunci când un jucător va intra pe server o să se ducă pe canalul `welcome` care apropo se poate modifica de aici: `ch => ch.name === 'welcome'`.<br>
- [x] Sistemul de loguri.La fiecare comandă folosită (cele importante) se va creea un fișier numit `logs.txt`.Vă recomand să aveți programul `Notepad++` pentru a putea vedea logurile aranjate cum trebuie.<br>
- [x] Comanda `prost`.
<li>
  
<h1>Cum îl instalez?<h1>
  1. Instalezi NodeJS de pe site-ul official.Îți las un link: https://nodejs.org/en/download/.Este foarte simplu.Vei selecta versiunea Windows.<br>
  2. După ce ai instalat NodeJS vei intra în CMD și vei intra în folderul unde ai descărcat proiectul.<br>
  3. După ce ai intrat în proiect vei scrie următoarea comandă(în cmd) : `npm init -y` , `npm install discord.js --save`, `npm install fs --save`<br>
  4. Veți intra în `index.js` și veți modifica tokenul `const botToken`.<br>
  5. După ce ați făcut toate astea veți tasta node index.js<br>
  Dacă aveți alte probleme contactați-mă pe contul meu de discord: Adryan#0870<br>
    
