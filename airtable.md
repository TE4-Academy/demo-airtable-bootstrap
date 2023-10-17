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
