const { Schema, model } = require("mongoose");

const TipoEquipoSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'Nombre equipo requerido']
    },
    estado:{
        type: Boolean,
        default: true,
        required: false
    },
    fechaCreacion:{
        type: Date,
        default: new Date()
    },
    fechaActualizacion:{
        type: Date,
        default: new Date()
    }
})

module.exports = model('TipoEquipo', TipoEquipoSchema)