### För att sätta upp en bas i Airtable och interagera med den via deras API, följ dessa steg:

1. **Skapa ett Airtable-konto:**
   - Om du inte redan har ett Airtable-konto, gå till [Airtable's webbplats](https://airtable.com/) och registrera dig för ett konto.

2. **Skapa en ny bas:**
   - Logga in på ditt Airtable-konto och klicka på "Add a base" från din dashboard.
   - Du kan antingen starta från en mall, importera en befintlig bas eller starta från början. För det här exemplet, välj "Start from scratch".

3. **Namnge din bas och tabell:**
   - Ge din nya bas och tabell lämpliga namn, till exempel "Contacts Base" för basen och "Contacts" för tabellen.

4. **Lägg till fält:**
   - Inuti din "Contacts"-tabell, skapa två nya fält: "Name" och "Email". 
   - För "Name"-fältet, välj fälttypen "Single line text", och för "Email"-fältet, välj fälttypen "Email".

5. **Lägg till data:**
   - Lägg till några kontaktpersoner i din tabell genom att fylla i "Name" och "Email"-fälten.

6. **Hitta din API-nyckel, Base ID och Tabellnamn:**
   - För att hitta din API-nyckel, gå till [Airtable's account page](https://airtable.com/account) och kopiera din API-nyckel.
   - För att hitta din Base ID och Tabellnamn, gå till [Airtable's API page](https://airtable.com/api), välj din bas och du kommer att se ditt Base ID och Tabellnamn listade där.

7. **Konfigurera din Node.js-app:**
   - I din Node.js-app, använd API-nyckeln, Base ID, och Tabellnamn som du hittade ovan när du konfigurerar din Airtable klient. Till exempel:

```javascript
const base = new Airtable({ apiKey: 'YOUR_AIRTABLE_API_KEY' }).base('YOUR_BASE_ID');
```

## Exempelkod (inspiration)
För att bygga en enkel webbapplikation med Node.js och Express som interagerar med Airtable, behöver du först installera några paket. Se till att ha Node.js installerat på din dator och skapa sedan en ny mapp för ditt projekt. Gå till projektets mapp i din terminal och kör följande kommando för att initialisera ett nytt Node.js-projekt och installera nödvändiga paket:

```bash
npm init -y
npm install express airtable
```

Nedan finns en enkel kodsnutt som visar hur du kan läsa data från en Airtable-bas med hjälp av Airtable API:

### server.js:

```javascript
// Importera moduler
const express = require('express');
const Airtable = require('airtable');

// Konfigurera Express och Airtable
const app = express();
const base = new Airtable({ apiKey: 'YOUR_AIRTABLE_API_KEY' }).base('YOUR_BASE_ID');

// Definiera en route för att hämta kontaktpersoner
app.get('/contacts', (req, res) => {
    // Skapa en tom array för att lagra kontaktpersoner
    let contacts = [];
    
    // Hämta data från Airtable
    base('Contacts').select({
        view: 'Grid view'
    }).eachPage((records, fetchNextPage) => {
        // Lägg till varje post i contacts-arrayen
        records.forEach(record => {
            contacts.push({
                id: record.id,
                name: record.get('Name'),
                email: record.get('Email')
            });
        });
        // Hämta nästa sida med poster
        fetchNextPage();
    }, (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Server Error');
            return;
        }
        // Skicka kontaktpersonerna som ett JSON-svar
        res.json(contacts);
    });
});

// Starta servern
app.listen(4242, () => {
    console.log('Server is running on http://localhost:4242');
});
```

I ovanstående kod:

1. Vi importerar `express` och `airtable` modulerna.
2. Vi konfigurerar en ny Express-app och en Airtable-bas med din API-nyckel och bas-ID.
3. Vi definierar en route `/contacts` som kommer att hantera GET-förfrågningar och hämta kontaktpersoner från din Airtable-bas.
4. Inuti route-handlern, skapar vi en tom array `contacts` för att lagra kontaktpersoner, och använder `base().select().eachPage()` metoden för att hämta poster från Airtable.
5. För varje post, lägger vi till postdata i `contacts`-arrayen.
6. När alla poster har hämtats, skickar vi `contacts`-arrayen som ett JSON-svar till klienten.
7. Slutligen startar vi servern på port 4242.

Se till att ersätta `'YOUR_AIRTABLE_API_KEY'` och `'YOUR_BASE_ID'` med dina faktiska värden från Airtable.

## Fortsätt med en klientapplikation (inspiration)
Skapa en klient som skickar en förfrågan till servern, tar emot data och presenterar den, kan du använda HTML, CSS och JavaScript:

### index.html:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact List</title>
</head>
<body>

<div id="contacts"></div>

<script src="app.js"></script>
</body>
</html>
```

### app.js:

```javascript
// Definiera URL:en till din server
const url = 'http://localhost:4242/contacts';

// Använd fetch för att skicka en GET-förfrågan till servern
fetch(url)
    .then(response => {
        // Kontrollera om förfrågan var framgångsrik
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();  // Konvertera svaret till JSON
    })
    .then(data => {
        // Hämta div-elementet där kontaktpersonerna ska visas
        const contactsDiv = document.getElementById('contacts');

        // Skapa en ul-element för att lista kontaktpersonerna
        const ul = document.createElement('ul');

        // Loopa igenom datan och skapa ett li-element för varje kontaktperson
        data.forEach(contact => {
            const li = document.createElement('li');
            li.textContent = `${contact.name} - ${contact.email}`;
            ul.appendChild(li);
        });

        // Lägg till ul-elementet i div-elementet
        contactsDiv.appendChild(ul);
    })
    .catch(error => {
        // Logga eventuella fel till konsolen
        console.error('There has been a problem with your fetch operation:', error);
    });
```

I ovanstående kod:

1. Vi skapar en enkel HTML-fil (`index.html`) med ett `div`-element där vi kommer att visa kontaktpersonerna.
2. I `script.js`, definierar vi URL:en till vår server och använder `fetch`-funktionen för att skicka en GET-förfrågan till `/contacts`-routen på servern.
3. Vi använder `then`-metoden på det returnerade Promise-objektet för att hantera svaret. Om svaret var framgångsrikt, konverterar vi det till JSON med `response.json()`-metoden.
4. När JSON-svaret är klart, hämtar vi `div`-elementet från DOM med `document.getElementById`, skapar ett `ul`-element, och loopar igenom datan för att skapa ett `li`-element för varje kontaktperson.
5. Vi lägger till varje `li`-element i `ul`-elementet, och lägger sedan till `ul`-elementet i `div`-elementet för att visa kontaktpersonerna på sidan.
6. Om något fel uppstår, fångar vi det med `catch`-metoden och loggar det till konsolen.

Sätt nu upp din webbserver (skrivet i Node.js och Express som tidigare) att köra på `http://localhost:3000`, öppna `index.html` i din webbläsare och du bör se en lista över kontaktpersoner som hämtas från servern och visas på sidan.
