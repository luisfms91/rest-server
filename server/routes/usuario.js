
const express = require('express')
const bcryp = require('bcrypt')
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
        password: bcryp.hashSync(body.password, 10),
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
    let body = req.body
    Usuario.findByIdAndUpdate(id, body, {new:true}, (err, usuarioDB) => {
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

app.delete('/usuario', function(req, res){
    res.json('delete usuario')
})

module.exports = app