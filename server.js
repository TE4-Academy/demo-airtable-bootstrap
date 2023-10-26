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

app.delete('/contacts/:id', async (req, res) => {
    const id = req.params.id;
    console.log('Asked to deleted: ' + id);

    try {
        await base('contacts').destroy(id, (err, deletedRecord) => {
            if (err) {
                console.error(err);
                res.status(500).send('Server Error');
                return;
            }
            console.log('Airtable confirmed deletion of: ' + deletedRecord.id);
            res.json({ deletedRecordId: deletedRecord.id });
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

app.listen(4242, () => {
    console.log('Server up and running on 4242');
});
