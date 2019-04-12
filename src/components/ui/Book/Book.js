import React from 'react'

export default function(props) {
    return(<li className="list-item list-group-item d-flex align-items-center">
    <strong className="title">{props.title}</strong>

    <div className="author">{props.author}</div>

    <div className="buttons">

      <button type="button" className="btn btn-success" onClick={props.handleClickSelect}>
        Hämta
    </button>
      <button type="button" className="btn btn-danger" onClick={props.getApiKey}>
        Hämta ny API-nyckel
    </button>
    </div>
  </li>)
}