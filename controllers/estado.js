const Estado = require('../models/estado')
const { request, response } = require('express')


/* Crear estadoEquipo  */
const createEstado = async (req = request, res = response) => {
    try{
        const nombre = (req.body.nombre) 
        ? req.body.nombre.toUpperCase() : '';
        const estadoDB = await Estado.findOne({ nombre })
        if(estadoDB){
            return res.status(400).json({msg: 'Estado ya existe'})
        }
        const datos = { nombre } 
        const estado = new Estado(datos)
        await estado.save()
        res.status(201).json(estado)

    } catch(e){
        console.log(e)
        return res.status(500).json({msg: e})
    }
}


/* Consultar estadosEquipo */
const getEstados = async (req = request, res = response) => {
    try{
        if (req.body.estado || req.body.estado == false) {
            const estado = req.body.estado
            const query = {estado: estado}
            const estadosDB = await Estado.find(query)
            return res.json(estadosDB)
        } else {
            const estadosDB = await Estado.find()
            return res.json(estadosDB)
        }

    } catch(e){
        console.log(e)
        return res.status(500).json({msg: e})  
    }
}

/* Consultar estadoEquipo */
const getEstadoByID = async (req = request, res = response) => {
    try{
        const id = req.params.id
        const query = {_id: id}
        const estadoDB = await Estado.findOne(query)
        return res.json(estadoDB)

    } catch(e){
        console.log(e)
        return res.status(500).json({msg: e})  
    }
}

/* Actualizar estadoEquipo */
const updateEstado = async (req = request, res = response) => {
    try{
        const id = req.params.id
        const data = req.body
        data.nombre = req.body.nombre.toUpperCase()
        data.fechaActualizacion = new Date()
        const estado = await Estado.findByIdAndUpdate(id, data, {new: true})
        return res.json(estado)

    } catch(e){
        console.log(e)
        return res.status(500).json({msg: e})  
    }
}

/* Eliminar estadoEquipo */
const deleteEstado = async (req = request, res = response) => {
    try{
        const id = req.params.id
        const estadoDB = await Estado.findById(id)
        if(!estadoDB){
            return res.status(404).json({msg: 'No existe el estado'})
        }
        await Estado.findByIdAndDelete(id)
        return res.status(200).json({msg: 'Eliminado correctamente', id})

    } catch(e){
        console.log(e)
        return res.status(500).json({msg: e})  
    }
}

module.exports = { 
    createEstado, 
    getEstados, 
    getEstadoByID,
    updateEstado,
    deleteEstado
}
