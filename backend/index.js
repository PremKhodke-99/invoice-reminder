require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectToDb } = require('./db/dbConfig');

connectToDb();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/', () => {
    console.log('Server Started');
})

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log('Server listening at', PORT);
})