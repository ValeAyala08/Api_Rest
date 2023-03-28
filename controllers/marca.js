const Marca = require('../models/marca')
const { request, response } = require('express')
const usuario = require('../models/usuario')


/* Crear marca */
const createMarca = async (req, res) => {
    try{
        const nombre = req.body.nombre
        const marcaBD = await Marca.findOne({ nombre })
        if(marcaBD){
            return res.status(400).json({msg: 'Marca ya existe'})
        }
        const datos = req.body
        const marca = new Marca(datos)
        await marca.save()
        res.status(201).json(marca)
    } catch(e){
        console.log(e)
        return res.status(500).json({msg: e})
    }
}

/* Consulta marcas*/
const getMarcas = async (req, res) => {
    try{ 
        if (req.body.Marca || req.body.Marca == false){
            const estado = req.query.estado
            const query = { estado: estado }
            const marcas = await Marca.find(query)
            return res.json(marcas)
        }else{
            const marcaDB =await Marca.find()
            return res.json(marcaDB)
        }
    } catch(e){
        return res.status(500).json({msj: e})
    }
}

/* Consultar marca*/
const getMarcaByID = async (req, res) => {
    try{
        const id = req.params.id
        const marcaDB = await Marca.findById(id)
        return res.json(marcaDB)
    }catch(e){
        return res.status(500).json({msj: e})
    }
}

/* Actualizar marca*/
const updateMarca = async (req,  res) => {
    try{
        const id = req.params.id
        const data = req.body
        data.fechaActualizacion = new Date()
        const marca = await Marca.findByIdAndUpdate(id, data, {new: true})
        return res.status(201).json(marca)
    } catch(e){
        return res.status(500).json({msj: e})
    }  
}

/* Eliminar marca */
const deleteMarca = async (req = request, res = response) => {
    try{
        const id = req.params.id
        const marcaBD = await Marca.findById(id)
        if(!marcaBD){
            return res.status(404).json({msj: 'Marca no existe'})
        }
        await Marca.findByIdAndDelete(id)
        return res.status(200).json({msg: 'Eliminado correctamente', id})
    } catch(e){
        return res.status(500).json({msj: e})
    }
}

module.exports = { 
    createMarca, 
    getMarcas, 
    getMarcaByID,
    updateMarca,
    deleteMarca
}
