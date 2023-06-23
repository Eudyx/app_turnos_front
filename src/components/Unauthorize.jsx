import React from 'react'

const Unauthorize = () => {
  return (
    <div>
        <h1>No autorizado</h1>
      <a href={`${window.location.origin}/#/login`}>
        Log in
      </a>
    </div>
  )
}

export default Unauthorize
