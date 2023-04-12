import { axiosConfig } from "../configuration/axiosConfig"


const obtenerEstado = (estado = true) => {
    return axiosConfig.get('estado?estado='+estado, {
        headers: {
            'Content-type': 'application/json'
        }
    })
}


const crearEstado = (data) => {
    return axiosConfig.post('estado', data, {
        headers: {
            'Content-type': 'application/json'
        }
    })
}


const editarEstadoPorID = (estadoId, data) => {
    return axiosConfig.put('estado/'+estadoId, data, {
        headers: {
            'Content-type': 'application/json'
        }
    })
}


 const borrarEstadoPorID = (tipoId) => {
    return axiosConfig.delete('estado/'+tipoId, {}, {
        headers: {
            'Content-type': 'application/json'
        }
    })
}


 const obtenerEstadoPorID = (tipoId) => {
    return axiosConfig.get('estado/'+tipoId, {
        headers: {
            'Content-type': 'application/json'
        }
    })
}

export {
    obtenerEstado,
    crearEstado,
    editarEstadoPorID,
    borrarEstadoPorID,
    obtenerEstadoPorID
}