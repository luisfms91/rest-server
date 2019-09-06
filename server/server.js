
const express = require('express')
const mongoose = require('mongoose')
require('./config/config')
const app = express();

const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use(require('./routes/usuario'))

mongoose.connect('mongodb://localhost:27017/cafe', (err, res) =>{
    if(err) throw err;
    console.log('bd onlinels')
})

app.listen(process.env.puerto, () => {
    console.log('listening ---' + process.env.puerto);
});