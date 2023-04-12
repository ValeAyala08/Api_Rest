import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { borrarEstadoPorID, crearEstado, editarEstadoPorID, obtenerEstado } from '../../services/EstadoService'
import HeaderTable from '../ui/HeaderTable'
import Modal from '../ui/Modal'

export default function Estados() {
  const [estados, setEstados] = useState([])
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState(true)
  const [error, setError] = useState(false)
  const [estado, setEstado] = useState({
    nombre: '',
    estado: true
  })
  const [errorSend, setErrorSend] = useState({
    status: false,
    msg: ''
  })
  //const [tipoId, setTipoId] = useState('')

  const listEstado= async () => {
    setLoading(true)
    try{
      setError(false)
      const { data } = await obtenerEstado(query)
      setEstados(data)
      setLoading(false)
    }catch(e){
      console.log(e)
      setError(true)
      setLoading(false)
    }
  }

  useEffect(() => {
    listEstado();
  }, [query])

  const cambiarSwitche = () => {
    setQuery(!query)
  }

  const guardarEstado = async () => {
    setErrorSend({status: false, msg: ''})
    setLoading(true)
    try{
      const res = await crearEstado(estado)
      console.log(res)
      setLoading(true)
      setEstado({nombre: ''})
      listEstado()
    }catch(e){
      const { data} = e.response;
      setErrorSend({status: true, msg: data.msg})
      console.log(e)
      setLoading(false)
    }
    
  }

  const handleChange = e => {
    setEstado({
      ...estado, 
      [e.target.name]: e.target.value
    })
  }

  const borrarEstado = async (e) => {
    setLoading(true)
    try{
      setError(false)
      const id = e.target.id
      console.log(id)
      const res = await borrarEstadoPorID(id)
      console.log(res)
      listEstado();
      setLoading(false)
    }catch(e){
      console.log(e)
      setError(true)
      setLoading(false)
    }
  }

  const editarEstado = async (e) => {
    e.preventDefault()
    setLoading(true)
    try{
      setError(false)
      const resp = await editarEstadoPorID(estado._id, estado);
      console.log(resp)
      resetEstado()
      listEstado()
    }catch(e){
      setLoading(false)
      console.log(e)
      setError(true)
    }

  }

  const setEstadoPorId = (e) => {
    console.log(e.target.id)
    const estadosFilter = estados.filter(t => t._id === e.target.id);
    const est = estadosFilter[0];
    console.log(est)
    setEstado(est)
  }

  const resetEstado =() => {
    setEstado({
      nombre: '',
      estado: true
    })
  }

  return (
      <div>
        <div className="modal fade" id="exampleModal2" tabIndex={-1} aria-labelledby="exampleModal2Label" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModal2Label">Editar Estado</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  data-bs-dismiss="modal" 
                  aria-label="Close"
                  onClick={resetEstado}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={editarEstado}>
                  <div className="mb-3">
                    <label for="recipient-name" className="col-form-label">Nombre:</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="recipient-name"
                      onChange={handleChange}
                      value={estado.nombre}
                      name="nombre"
                    />
                    <select 
                      class="form-select" 
                      aria-label="Default select example"
                      name="estado"
                      value={estado.estado}
                      onChange={handleChange}
                    >
                      <option value={false}>Inactivo</option>
                      <option value={true}>Activo</option>
                    </select>
                  </div>
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    data-bs-dismiss="modal"
                    onClick={resetEstado}
                  >
                    Cerrar
                  </button>
                  <button 
                    type="submit" 
                    className="btn btn-primary" 
                    disabled={estado.nombre.length <= 0}
                    data-bs-dismiss="modal"
                  >
                    Enviar
                  </button>
                </form>
              </div>
              <div className="modal-footer">
              </div>
            </div>
          </div>
        </div>
        <Modal 
          titulo={'Estado'}
          guardar={guardarEstado}
          element={estado}
          change={handleChange}
        />
        <button 
          type="button" 
          className="btn btn-primary" 
          data-bs-toggle="modal" 
          data-bs-target="#exampleModal" 
        >
          Nuevo
        </button>
        <div className="form-check form-switch">
          <input 
            className="form-check-input" 
            type="checkbox" 
            role="switch" 
            id="flexSwitchCheckChecked" 
            checked={query}
            onChange={cambiarSwitche}
          />
          <label className="form-check-label" hmtlFor="flexSwitchCheckChecked">( Inactivo / Activo )</label>
        </div>
        {
          loading && 
          (<div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          </div>)
        }
        {errorSend.status && (
        <div className="alert alert-danger" role="alert">
          {errorSend.msg}
          </div>)
        }
        {
        error && (
        <div className="alert alert-danger" role="alert">
          Error al cargar datos
          </div>)
        }
        <table className="table">
        <HeaderTable />
        <tbody>
          {
            estados.map((estado,index) => {
              return (
              <tr key={estado._id}>
                <th scope="row">{index + 1}</th>
                <td>{estado.nombre}</td>
                <td>{estado.estado ? 'Activo': 'Inactivo'}</td>
                <td>{dayjs(estado.fechaCreacion).format('YYYY-MM-DD')}</td>
                <td>{dayjs(estado.fechaActualizacion).format('YYYY-MM-DD')}</td>
                <td>
                  <button 
                    id={estado._id}
                    type="button" 
                    className="btn btn-success"
                    data-bs-toggle="modal" 
                    data-bs-target="#exampleModal2"
                    onClick={setEstadoPorId}
                  >
                    Editar
                  </button>
                  <button 
                    id={estado._id}
                    type="button" 
                    className="btn btn-danger"
                    onClick={borrarEstado}
                  >
                    Borrar
                  </button>
                </td>
              </tr>
              )
            })
          }
        </tbody>
        </table>
      </div>
  )
}
