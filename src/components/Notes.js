import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitems from "./Noteitems";
import AddNotes from "./AddNotes";
const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getNotes } = context;
  useEffect(() => {
    getNotes();
    // eslint-disable-next-line
  }, []);
  const ref = useRef(null)
  const[note,setNotes]=useState({etitle:"",edescription:"",etag:""})
  const handleClick=(e)=>{
    console.log("Updating the note...",note);
    e.preventDefault();
// addNote(note.title,note.description,note.tag);
}

const onChange=(e)=>{
setNotes({...note,[e.target.name]:e.target.value})
}
  const updateNote = (currentNote) => {
ref.current.click();
setNotes({etitle:currentNote.title, edescription:currentNote.description, etag:currentNote.tag});
  }
 
  return (
    <>
      <AddNotes />
      {/* Button trigger modal  */}
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>

      {/* Modal  */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">

            <form className='my-3'>
            <div className="mb-3">
    <label htmlFor="title" className="form-label">Title</label>
    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="description" className="form-label">Description</label>
    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange}/>
  </div>

  <div className="mb-3">
    <label htmlFor="tag" className="form-label">Tag</label>
    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange}/>
  </div>

</form>

            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2>Your Notes</h2>
        {Array.isArray(notes) &&
          notes.map((notes) => {
            return (
              <Noteitems key={notes._id} updateNote={updateNote} notes={notes}/>
            );
          })}
      </div>
    </>
  );
};

export default Notes;
