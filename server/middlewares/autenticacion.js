const jwt = require('jsonwebtoken')

let verificaToken = (req, res, next) => {
    let token = req.get('token')
    
    jwt.verify(token, process.env.SEED, (err, decode) => {
        if(err){
            return res.status(401).json({
                ok:false,
                err:err
            })
        }
        req.usuario  = decode.usuario
        next()
    })

}

let vericaAdmin_Role = (req, res, next) => {

    let usuario = req.usuario
    if(usuario.role === 'ADMIN_ROLE'){
        next()
    }else{
        return res.json({
            ok:false,
            err:{
                message:'El usuario no es administracion'
            }
        })
    }
}

module.exports = {
    verificaToken,
    vericaAdmin_Role
}