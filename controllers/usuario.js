const Usuario = require('../models/usuario')
const { request, response } = require('express')


/* Crear  usuario */
const createUser = async (req, res) => {
    try {
        const data = req.body
        const email = data.email
        const usuarioBD = await Usuario.findOne({ email })
        if(usuarioBD){
            return res.status(400).json({msg: 'Ya existe usuario'})
        }
        const usuario = new Usuario(data)
        await usuario.save()
        return res.status(201).json(usuario)
    } catch(e) {
        console.log(e)
        return res.status(500).json({e})
    }
}

/* Consultar usuarios */
const getUsers = async (req, res) => {
    try {
        if (req.body.estado || req.body.estado == false) {
            const estado = req.body.estado
            const query = {estado: estado}
            const usuariosDB = await Usuario.find(query)
            return res.json(usuariosDB)
        } else {
            const usuariosDB = await Usuario.find()
            return res.json(usuariosDB)
        }
    } catch(e) {
        return res.status(500).json({msj: e})
    }
}

/* Consultar usuario por ID */
const getUserByID = async (req, res) => {
    try {
        const id = req.params.id
        const filter = { _id: id}
        const usuarioDB = await Usuario.findOne(filter)
        return res.json(usuarioDB)
    } catch(e) {
        return res.status(500).json({msj: e})
    }
}

/* Actualizar usuario */
const updateUser = async (req, res) => {
    try {
        const id = req.params.id
        const data = req.body
        data.fechaActualizacion = new Date()
        console.log(data)
        const usuario = await Usuario.findByIdAndUpdate(id, data, {new: true})
        return res.status(201).json(usuario)
    } catch(e) {
        return res.status(500).json({msj: e})
    }  
}

/* Eliminar usuario */
const deleteUser = async (req=request, res=response) => {
    try {
        const id = req.params.id
        const usuarioBD = await Usuario.findById(id)
        if(!usuarioBD){
            return res.status(404).send({"message": 'No existe usuario'})
        } else {
            await Usuario.findByIdAndDelete(id)
            console.log(id)
            return res.status(200).send({"message": 'Eliminado correctamente'})
        }
        
        
    } catch(e) {
        return res.status(500).send({"message": e})
    }
}

module.exports = { 
    createUser, 
    getUsers, 
    getUserByID,
    updateUser,
    deleteUser
}
