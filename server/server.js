
const express = require('express')
const app = express();

const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.get('/', function(req, res){
    res.json('Hello');
})

app.post('/usuario', function(req, res){
    let body = req.body
    console.log(body);
    res.json({body});
})

//url con prametros
app.get('/usuario/:id', function(req, res){
    let id = req.params.id
    console.log(id);
    //retornar codigos 
    //res.status(400);
    res.json({id});
})


app.listen(process.env.puerto, () => {
    console.log('listening ---');
});