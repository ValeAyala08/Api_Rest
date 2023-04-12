import { axiosConfig } from "../configuration/axiosConfig"

/**
 * Obtiene todos los usuarios
 */
const obtenerUsuario = (estado = true) => {
    return axiosConfig.get('usuario?estado='+estado, {
        headers: {
            'Content-type': 'application/json'
        }
    })
}

/**
 * Crea Usuario
 */
const crearUsuario = (data, email) => {
    return axiosConfig.post('usuario', data, email, {
        headers: {
            'Content-type': 'application/json'
        }
    })
}

/**
 * Actualizar usuario por id
 */
const editarUsuarioPorID = (usuarioId, data, ) => {
    return axiosConfig.put('usuario/'+usuarioId, data, {
        headers: {
            'Content-type': 'application/json'
        }
    })
}

/**
 * Borra usuario por ID
 */
 const borrarUsuarioPorID = (tipoId) => {
    return axiosConfig.delete('usuario/'+tipoId, {}, {
        headers: {
            'Content-type': 'application/json'
        }
    })
}

/**
 * Consulta usuario por ID
 */
 const obtenerUsuarioPorID = (tipoId) => {
    return axiosConfig.get('usuario/'+tipoId, {
        headers: {
            'Content-type': 'application/json'
        }
    })
}

export {
    obtenerUsuario,
    crearUsuario,
    editarUsuarioPorID,
    borrarUsuarioPorID,
    obtenerUsuarioPorID
}