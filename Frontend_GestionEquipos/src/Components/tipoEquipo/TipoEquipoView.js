import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { borrarTipoEquipoPorID, crearTipoEquipo, editarTipoEquipoPorID, obtenerTipoEquipo } from '../../services/TipoEquipoService'
import HeaderTable from '../ui/HeaderTable'
import Modal from '../ui/Modal'

export default function TipoEquipo() {

  const [tipoEquipos, setTipoEquipos] = useState([])
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState(true)
  const [error, setError] = useState(false)
  const [tipoEquipo, setTipoEquipo] = useState({
    nombre: '',
    estado: true
  })
  const [errorSend, setErrorSend] = useState({
    status: false,
    msg: ''
  })
  
  const listTipoEquipo = async () => {
    setLoading(true)
    try{
      setError(false)
      const { data } = await obtenerTipoEquipo(query)
      setTipoEquipos(data)
      setLoading(false)
    }catch(e){
      console.log(e)
      setError(true)
      setLoading(false)
    }
  }

  useEffect(() => {
    listTipoEquipo();
  }, [query])

  const cambiarSwitche = () => {
    setQuery(!query)
  }

  const guardarTipoEquipo = async () => {
    setErrorSend({status: false, msg: ''})
    setLoading(true)
    try{
      const res = await crearTipoEquipo(tipoEquipo)
      console.log(res)
      setLoading(true)
      setTipoEquipo({nombre: ''})
      listTipoEquipo()
    }catch(e){
      const {status: data} = e.response;
      /*if(status == 400){
        console.log(data.msg)
        
      }*/
      setErrorSend({status: true, msg: data.msg})
      console.log(e)
      setLoading(false)
    }
    
  }

  const handleChange = e => {
    setTipoEquipo({
      ...tipoEquipo, 
      [e.target.name]: e.target.value
    })
  }

  const borrarTipoEquipo = async (e) => {
    setLoading(true)
    try{
      setError(false)
      const id = e.target.id
      console.log(id)
      const res = await borrarTipoEquipoPorID(id)
      console.log(res)
      listTipoEquipo();
      setLoading(false)
    }catch(e){
      console.log(e)
      setError(true)
      setLoading(false)
    }
  }

  const editarTipoEquipo = async (e) => {
    e.preventDefault()
    setLoading(true)
    try{
      setError(false)
      const resp = await editarTipoEquipoPorID(tipoEquipo._id, tipoEquipo);
      console.log(resp)
      resetTipoEquipo()
      listTipoEquipo()
    }catch(e){
      setLoading(false)
      console.log(e)
      setError(true)
    }

  }

  const setTipoPorId = (e) => {
    console.log(e.target.id)
    const tiposFilter = tipoEquipos.filter(t => t._id === e.target.id);
    const tipo = tiposFilter[0];
    console.log(tipo)
    setTipoEquipo(tipo)
  }

  const resetTipoEquipo =() => {
    setTipoEquipo({
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
                <h5 className="modal-title" id="exampleModal2Label">Editar TipoEquipo</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  data-bs-dismiss="modal" 
                  aria-label="Close"
                  onClick={resetTipoEquipo}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={editarTipoEquipo}>
                  <div className="mb-3">
                    <label for="recipient-name" className="col-form-label">Nombre:</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="recipient-name"
                      onChange={handleChange}
                      value={tipoEquipo.nombre}
                      name="nombre"
                    />
                    <select 
                      class="form-select" 
                      aria-label="Default select example"
                      name="estado"
                      value={tipoEquipo.estado}
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
                    onClick={resetTipoEquipo}
                  >
                    Cerrar
                  </button>
                  <button 
                    type="submit" 
                    className="btn btn-primary" 
                    disabled={tipoEquipo.nombre.length <= 0}
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
          titulo={'Tipo de Equipo'}
          guardar={guardarTipoEquipo}
          element={tipoEquipo}
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
            tipoEquipos.map((tipoEquipo,index) => {
              return (
              <tr key={tipoEquipo._id}>
                <th scope="row">{index + 1}</th>
                <td>{tipoEquipo.nombre}</td>
                <td>{tipoEquipo.estado ? 'Activo': 'Inactivo'}</td>
                <td>{dayjs(tipoEquipo.fechaCreacion).format('YYYY-MM-DD')}</td>
                <td>{dayjs(tipoEquipo.fechaActualizacion).format('YYYY-MM-DD')}</td>
                <td>
                  <button 
                    id={tipoEquipo._id}
                    type="button" 
                    className="btn btn-success"
                    data-bs-toggle="modal" 
                    data-bs-target="#exampleModal2"
                    onClick={setTipoPorId}
                  >
                    Editar
                  </button>
                  <button 
                    id={tipoEquipo._id}
                    type="button" 
                    className="btn btn-danger"
                    onClick={borrarTipoEquipo}
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
