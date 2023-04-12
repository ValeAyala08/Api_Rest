import React from 'react'

export default function Modal({
  titulo, 
  guardar,
  element,
  change
}) {

  const guadarElement = (e) => {
    e.preventDefault();
    guardar()
  }

  const handleChange = e => {
    change(e)
  }

  return (
    <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Nuevo {titulo}</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={guadarElement}>
                <div className="mb-3">
                  <label for="recipient-name" className="col-form-label">Nombre:</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="recipient-name"
                    onChange={handleChange}
                    value={element.nombre}
                    name="nombre"
                  />
                  <label for="recipient-name" className="col-form-label">Email:</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="recipient-name"
                    onChange={handleChange}
                    value={element.email}
                    name="email"
                  />
                </div>
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                <button 
                  type="submit" 
                  className="btn btn-primary" 
                  disabled={element.nombre.length <= 0}
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
  )
}
