const express = require('express');
const db = require('./database').getInstance();
db.setModels();

const router = require('./routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(router);

const PORT = 3000;

app.listen(PORT, () => console.log(`server is running on ${PORT}`));

process.on("unhandledRejection", reason => {
    console.log('Unhandled error');
    process.exit(0)
});
