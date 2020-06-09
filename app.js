require('dotenv').config();
const express = require('express');
const db = require('./database').getInstance();
db.setModels();

const router = require('./routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(router);


app.listen(process.env.PORT || 3000, () => console.log(`server is running on ${process.env.PORT || 3000}`));

process.on("unhandledRejection", reason => {
    console.log('Unhandled error');
    process.exit(0)
});
