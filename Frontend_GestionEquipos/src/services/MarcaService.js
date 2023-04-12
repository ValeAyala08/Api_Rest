import { axiosConfig } from "../configuration/axiosConfig"

const obtenerMarca = (estado = true) => {
    return axiosConfig.get('marca?estado='+estado, {
        headers: {
            'Content-type': 'application/json'
        }
    })
}


const crearMarca = (data) => {
    return axiosConfig.post('marca', data, {
        headers: {
            'Content-type': 'application/json'
        }
    })
}


const editarMarcaPorID = (tipoId, data) => {
    return axiosConfig.put('marca/'+tipoId, data, {
        headers: {
            'Content-type': 'application/json'
        }
    })
}

 const borrarMarcaPorID = (tipoId) => {
    return axiosConfig.delete('marca/'+tipoId, {}, {
        headers: {
            'Content-type': 'application/json'
        }
    })
}

 const obtenerMarcaPorID = (tipoId) => {
    return axiosConfig.get('marca/'+tipoId, {
        headers: {
            'Content-type': 'application/json'
        }
    })
}

export {
    obtenerMarca,
    crearMarca,
    editarMarcaPorID,
    borrarMarcaPorID,
    obtenerMarcaPorID
}