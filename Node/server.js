const express = require('express');
const app = express();
const dotEnv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');

dotEnv.config({ path: './configenv/config.env' })


port = process.env.PORT || 5000;
hostname = process.env.HOST || 'http://localhost';
DB = process.env.MONGO_DB_LOCAL_URL;


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())



app.get('/', (req, res) => {
    res.send(`<h2>Express server loaded</h2>`)
});


mongoose.connect(process.env.MONGO_DB_LOCAL_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
}).then((response) => {
    console.log(`Connected to Mongo DB Successfully...........`);
}).catch((err) => {
    console.error(err);
    process.exit(1); // stop the node js process if unable to connect to mongodb
});


app.use('/api', require('./Routes/apiRouter'))

app.listen(port, () => {
    console.log(`Express Server is Started at a :${port}`);
})
