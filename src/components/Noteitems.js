import React,{useContext} from 'react'
import noteContext from '../context/notes/noteContext';

const Noteitems = (props) => {
  const context=useContext(noteContext);
  const {deleteNote}=context;
    const {notes,updateNote}=props;
  return (
    <div className='col-md-3'>
      <div className="card my-3">
  <div className="card-body">

    <div className="d-flex align-items-center justify-content-between">
    <h5 className="card-title">{notes.title}</h5>
    <div className="d-flex align-items-center">
        <i className="far fa-trash-alt mx-1" onClick={()=>{
          deleteNote(notes._id)
        }}></i>
        <i className="far fa-edit mx-1" onClick={()=>{
          updateNote(notes)
        }}></i>
    </div>
</div>

    <p className="card-text">{notes.description}</p>
  </div>
</div>
    </div>
  )
}

export default Noteitems
   