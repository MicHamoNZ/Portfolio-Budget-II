const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');

const app = express();

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

const PORT = process.env.PORT || 5001;

app.get('/', (req, res) => {
    res.json({ info: 'node.js, Express, and Postgres API' });
});

const envelopesRouter = require('./routes/envelopes');
app.use(envelopesRouter);


app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});
