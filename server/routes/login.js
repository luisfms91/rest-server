const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const Usuario = require('../models/usuario')
const app = express()

app.post('/login',(req, res)=>{

    let body = req.body
    Usuario.findOne({email:body.email}, (err, usuarioBD)=>{
        if(err){
            return res.status(500).json({
                ok:false,
                err:err
            })
        }
        if(!usuarioBD){
            return res.status(400).json({
                err:{
                    message:"Usuario o contrasenia incorrectos"
                }
            })
        }

        if(!bcrypt.compareSync(body.password, usuarioBD.password)){
            return res.status(400).json({
                err:{
                    message:"Usuario o contrasenia incorrectos"
                }
            })
        }

        let token = jwt.sign({
            usuario:usuarioBD
        }, process.env.SEED, {expiresIn:process.env.CADUCIDAD_TOKEN})
        res.json({
            ok:true,
            usuario:usuarioBD,
            token:token
        })
    })
    
})


module.exports = app