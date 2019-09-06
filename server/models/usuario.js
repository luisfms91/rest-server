const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

let Schema = mongoose.Schema

let rolesValidos = {
    values:['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol valido'
};

let usuarioSchema = new Schema({
    nombre: {
        type:String,
        required:[true, 'EL nombre es necesario']
    },
    edad: {
        type:String,
        required:[true, 'la edad es necesario']
    },
    email: {
        type:String,
        unique:true,
        required:[true, 'el email es necesario']
    },
    
    password:{
        type:String,
        required:[true, 'La contraseña es obligatoria']
    },
    img:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:'USER_ROLE',
        enum: rolesValidos
    },
    estado:{
        type:Boolean,
        default:true
    },
    google:{
        type: Boolean,
        default:false
    }
});

usuarioSchema.plugin(uniqueValidator,{message:'{PATH} debe de ser unico'})

module.exports = mongoose.model('Usuario', usuarioSchema)