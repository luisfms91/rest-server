
const express = require('express')
const bcryp = require('bcrypt')
const _ = require('underscore')
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
app.get('/usuario', function(req, res){
    
    let page = req.query.page || 0;
    page = Number(page)


    Usuario.find({}).skip(page).limit(5).exec((err,usuarios) => {
        if(err){
            return res.status(400).json({
                ok:false,
                err:err
            })
        }else{
            res.json({
                ok:true,
                usuarios:usuarios
            })
        }
    }) 

})

app.put('/usuario/:id', function(req, res){
    let id = req.params.id
    let body = _.pick( req.body, ['nombre', 'email', 'img', 'role', 'estado'])
    Usuario.findByIdAndUpdate(id, body, {new:true, runValidators:true}, (err, usuarioDB) => {
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