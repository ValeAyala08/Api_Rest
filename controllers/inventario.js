const Inventario = require('../models/inventario')
const { request, response } = require('express')
const Usuario = require('../models/usuario')
const Marca = require('../models/marca')

/* Mostrar Inventario */
const getInventarios = async (req, res) => {
    try{
        const inventario = await Inventario.find()
        .populate({
            path: 'usuario',
            match: { estado: true}
        })
        .populate({
            path: 'marca',
            match: { estado: true}
        })
        .populate({
            path: 'estado'
        })
        .populate({
            path: 'tipoEquipo'
        })
        res.json(inventario)

    } catch(e){
        console.log(e)
        return res.status(500).json({ error: 'Error: ' + e })
    }
}

/* Guaradar en Inventario */
const createInventario = async (req = request, res = response) => {
    try{
        const data = req.body;
        const { usuario, marca } = data;
        const usuarioBD = await Usuario.findOne({
            _id: usuario._id, estado: true
        })

        if(!usuarioBD){
            return res.status(400).json({ msj: 'Usuario no existe' })
        }

        const marcaBD = await Marca.findOne({
            _id: marca._id, estado: true
        })

        if(!marcaBD){
            return res.status(400).json({
                msj: 'Marca no existe'
            })
        }
        const inventario = new Inventario(data)
        await inventario.save()
        res.status(201).json(inventario)

    } catch(e){
        console.log(e)
        return res.status(500).json({msj: 'Error' + e})
    }
}

/* Consultar Inventario por ID */
const getInventarioByID = async (req = request, res = response) => {

    try{
        const { id } = req.params;
        const inventarioBD = await Inventario.findById(id)
        .populate({
            path: 'usuario',
            match: {estado: true}
        })
        res.json(inventarioBD)

    } catch(e){
        console.log(e)
        return res.status(500).json({msj: 'Error'})
    }
}

/* Actualizar Inventario */
const updateInventario = async (req = request, res = response) => {

    try{
        const { id } = req.params
        const data = req.body
        const inventario  = await Inventario.findByIdAndUpdate(id, data, {new: true})
        return res.status(201).json(inventario)
    } catch(e){
        console.log(e)
        return res.status(500).json({msj: 'Error'}) 
    }
}

/* Eliminar Inventario */
const deleteInventario = async (req = request, res = response) => {

    try{
        const { id } = req.params
        await Inventario.findByIdAndDelete(id)
        return res.status(200).json({ msg: 'Eliminado correctamente', id })

    } catch(e){
        console.log(e)
        return res.status(500).json({msj: 'Error'}) 
    }
}

module.exports = {
    getInventarios,
    createInventario,
    getInventarioByID,
    updateInventario,
    deleteInventario
}