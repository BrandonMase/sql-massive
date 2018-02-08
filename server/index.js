const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());


massive(process.env.CONNECTION_STRING).then(dbInstance => {
    app.set('db', dbInstance);
});

app.get('/api/heroes', (req, res) => {
    req.app.get('db').get_heroes().then(heroes => {
        console.log(heroes)
        res.status(200).json(heroes);
    }).catch(e => {
        
        console.log(e)
        res.status(500).end();
    });
})
const port = 4000;
app.listen(port, () => console.log(`Listening on port ${port}`))