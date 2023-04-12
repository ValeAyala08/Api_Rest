import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { borrarMarcaPorID, crearMarca, editarMarcaPorID, obtenerMarca } from '../../services/MarcaService'
import HeaderTable from '../ui/HeaderTable'
import Modal from '../ui/Modal'

export default function Marca() {

  const [Marcas, setMarcas] = useState([])
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState(true)
  const [error, setError] = useState(false)
  const [Marca, setMarca] = useState({
    nombre: '',
    estado: true
  })
  const [errorSend, setErrorSend] = useState({
    status: false,
    msg: ''
  })

  const listMarca = async () => {
    setLoading(true)
    try{
      setError(false)
      const { data } = await obtenerMarca(query)
      setMarcas(data)
      setLoading(false)
    }catch(e){
      console.log(e)
      setError(true)
      setLoading(false)
    }
  }

  useEffect(() => {
    listMarca();
  }, [query])

  const cambiarSwitche = () => {
    setQuery(!query)
  }

  const guardarMarca = async () => {
    setErrorSend({status: false, msg: ''})
    setLoading(true)
    try{
      const res = await crearMarca(Marca)
      console.log(res)
      setLoading(true)
      setMarca({nombre: ''})
      listMarca()
    }catch(e){
      const { data} = e.response;
      /*if(status == 400){
        console.log(data.msg)
        
      }*/
      setErrorSend({status: true, msg: data.msg})
      console.log(e)
      setLoading(false)
    }
    
  }

  const handleChange = e => {
    setMarca({
      ...Marca, 
      [e.target.name]: e.target.value
    })
  }

  const borrarMarca = async (e) => {
    setLoading(true)
    try{
      setError(false)
      const id = e.target.id
      console.log(id)
      const res = await borrarMarcaPorID(id)
      console.log(res)
      listMarca();
      setLoading(false)
    }catch(e){
      console.log(e)
      setError(true)
      setLoading(false)
    }
  }

  const editarMarca = async (e) => {
    e.preventDefault()
    setLoading(true)
    try{
      setError(false)
      const resp = await editarMarcaPorID(Marca._id, Marca);
      console.log(resp)
      resetMarca()
      listMarca()
    }catch(e){
      setLoading(false)
      console.log(e)
      setError(true)
    }

  }

  const setTipoPorId = (e) => {
    console.log(e.target.id)
    const tiposFilter = Marca.filter(t => t._id === e.target.id);
    const tipo = tiposFilter[0];
    console.log(tipo)
    setMarca(tipo)
  }

  const resetMarca =() => {
    setMarca({
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
                <h5 className="modal-title" id="exampleModal2Label">Editar Marca</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  data-bs-dismiss="modal" 
                  aria-label="Close"
                  onClick={resetMarca}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={editarMarca}>
                  <div className="mb-3">
                    <label for="recipient-name" className="col-form-label">Nombre:</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="recipient-name"
                      onChange={handleChange}
                      value={Marca.nombre}
                      name="nombre"
                    />
                    <select 
                      class="form-select" 
                      aria-label="Default select example"
                      name="estado"
                      value={Marca.estado}
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
                    onClick={resetMarca}
                  >
                    Cerrar
                  </button>
                  <button 
                    type="submit" 
                    className="btn btn-primary" 
                    disabled={Marca.nombre.length <= 0}
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
          titulo={'Marca de Equipo'}
          guardar={guardarMarca}
          element={Marca}
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
            Marcas.map((marca,index) => {
              return (
              <tr key={marca._id}>
                <th scope="row">{index + 1}</th>
                <td>{marca.nombre}</td>
                <td>{marca.estado ? 'Activo': 'Inactivo'}</td>
                <td>{dayjs(marca.fechaCreacion).format('YYYY-MM-DD')}</td>
                <td>{dayjs(marca.fechaActualizacion).format('YYYY-MM-DD')}</td>
                <td>
                  <button 
                    id={marca._id}
                    type="button" 
                    className="btn btn-success"
                    data-bs-toggle="modal" 
                    data-bs-target="#exampleModal2"
                    onClick={setTipoPorId}
                  >
                    Editar
                  </button>
                  <button 
                    id={marca._id}
                    type="button" 
                    className="btn btn-danger"
                    onClick={borrarMarca}
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
