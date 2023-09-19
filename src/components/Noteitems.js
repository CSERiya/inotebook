import React from 'react'

const Noteitems = (props) => {
    const {notes}=props;
  return (
    <div className='col-md-3'>
      <div className="card my-3">
  <div className="card-body">

    <div className="d-flex align-items-center justify-content-between">
    <h5 className="card-title">{notes.title}</h5>
    <div className="d-flex align-items-center">
        <i className="far fa-trash-alt mx-1"></i>
        <i className="far fa-edit mx-1"></i>
    </div>
</div>

    <p className="card-text">{notes.description}</p>
  </div>
</div>
    </div>
  )
}

export default Noteitems
   