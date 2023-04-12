import React from 'react'
import notfound from './notfound.png'

export default function NotFound() {
  return (
    <div>
        <h2>Página no encontrada</h2>
        <img 
            className="figure img img-fluid d-block"
            alt=""
            src={notfound}
        />
    </div>
  )
}
