const TipoEquipo = require('../models/tipoEquipo')
const { request, response } = require('express')


/* Crear tipo de equipo */
const createTipoEquipo = async (req, res) => {
    try {
        const nombre = req.body.nombre
        const nombreTipoEquipo = await TipoEquipo.findOne({ nombre })

        if (nombreTipoEquipo){
            return res.status(400).json({msg: 'Equipo con ese nombre ya existe'})
        }
        
        const datos = req.body
        const tipoEquipo = new TipoEquipo(datos)
        await tipoEquipo.save()
        res.status(201).json(tipoEquipo)

    } catch(e) {
      console.log(e)
      return res.status(500).json({msg: e})
    }
}

/* Consultar tipos de equipo */
const getTiposEquipo = async (req, res) => {
    try {
        if (req.body.estado || req.body.estado == false) {
            const estado = req.body.estado
            const query = {estado: estado}
            const tipoequiposDB = await TipoEquipo.find(query)
            return res.json(tipoequiposDB)
        } else {
            const tipoequiposDB = await TipoEquipo.find()
            return res.json(tipoequiposDB)
        }

    } catch(e) {
        console.log(e)
        return res.status(500).json({msg: e})  
    }
}

/* Consultar tipoEquipo por ID */
const getTipoEquipoByID = async (req = request,
    res = response) => {
    try {
        const id = req.params.id
        const query = {_id: id}
        const tipoequipoDB = await TipoEquipo.findOne(query)
        return res.json(tipoequipoDB)
    } catch(e) {
        console.log(e)
        return res.status(500).json({msg: e})  
    }
}

/* Actualizar tipoEquipo */
const updateTipoEquipo = async (req, res) => {
    try {
        const data = req.body
        const id = req.params.id
        const tipoequipoDB = await TipoEquipo.findById(id)
        
        if(!tipoequipoDB){
            return res.json({msg: 'No existe el tipo equipo'})
        }
        data.fechaActualizacion = new Date()
        const tipoEquipo = await TipoEquipo.findByIdAndUpdate(id, data, {new: true})
        return res.json(tipoEquipo)
    } catch(e) {
        console.log(e)
        return res.status(500).json({msg: e})  
    }
}

/* Eliminar tipoEquipo */
const deleteTipoEquipo = async (req = request,
    res = response) => {
    try {
        const id = req.params.id
        const tipoequipoDB = await TipoEquipo.findById(id)
        if(!tipoequipoDB){
            return res.status(404).json({msg: 'No existe el tipo equipo'})
        }
        await TipoEquipo.findByIdAndDelete(id)
        return res.status(200).json({msg: 'Eliminado correctamente', id})
    } catch(e) {
        console.log(e)
        return res.status(500).json({msg: e})  
    }
}

module.exports = { 
    createTipoEquipo, 
    getTiposEquipo, 
    getTipoEquipoByID,
    updateTipoEquipo,
    deleteTipoEquipo
}
