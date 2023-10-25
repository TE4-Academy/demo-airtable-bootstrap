const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const Airtable = require('airtable');
const base = new Airtable({apiKey: 'pat47w1lvZu5bF8Ac.c3e87e9af452ede6cccadf640ce9eb9a8b4dd0178dad669e123980238889ddf6'}).base('appftiYaMNci71Mcf');

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', (req,res) => {
    res.sendFile('index');
});

app.get('/data', (req,res) => {
    fs.readFile('data.json', 'utf-8', (err, data) => {
        res.json(JSON.parse(data));
    } );
});

app.get('/contacts',(req,res)=>{
    let contacts = [];
    
    base('Contacts').select({
        view: 'Grid view'
    }).eachPage((records, fetchNextPage) => {
        records.forEach(record => {
            contacts.push({
                id: record.id,
                name: record.get('name'),
                email: record.get('email')
            });
        });
        fetchNextPage();
    }, (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Server Error');
            return;
        }
        res.json(contacts);
    });
});

app.post('/contacts', (req,res)=>{
    base('contacts').create(req.body, function(err, record) {
        if (err) {
          console.error(err);
          return;
        }
        res.json({
            id: record.getId(),
            fields: record.fields
        });
      });
});


app.listen(4242, () => {
    console.log('Server up and running on 4242');
});
