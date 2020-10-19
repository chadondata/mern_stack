const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const dbConfig = require('./database/db');

const studentRoute = require('./routes/Student');

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.db, {
    useNewUrlParser : true
}).then(() => {
    console.log('Database successfully connected');
}, error => {
    console.log('Error connecting to database : ' + error);
    console.log(process.env.MONGODB_URL);
});

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {
    extended : true
}));
app.use(cors());
app.use('/students', studentRoute);

const port = 4000;
const server = app.listen(port, () => {
    console.log('Listening on port ' + port);
});

app.use((req, res, next) => {
    next(createError(404));
});

app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});
