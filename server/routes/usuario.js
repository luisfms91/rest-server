
const express = require('express')
const Usuario = require('../models/usuario');

const app = express()

app.get('/', function(req, res){
    res.json('Hello');
})

app.post('/usuario', function(req, res){
    let body = req.body

    let usuario = new Usuario({
        nombre:body.nombre,
        edad:body.edad,
        img:body.img,        
        password: body.password,
        role:body.role,
        email:body.email
    })

    usuario.save((err, usuarioDB)=>{

        if(err){
            return res.status(400).json({
                ok:true,
                error: err
            })
        }

        res.json({
            ok:true,
            usuario:usuarioDB
        })

    });        
})

//url con prametros
app.get('/usuario/:id', function(req, res){
    let id = req.params.id
    console.log(id);
    //retornar codigos 
    //res.status(400);
    res.json({id});
})

app.put('/usuario/:id', function(req, res){
    let id = req.params.id
    res.json({
        id
    });
})

app.delete('/usuario', function(req, res){
    res.json('delete usuario')
})

module.exports = app