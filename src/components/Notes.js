import React,{useContext} from 'react'
import noteContext from '../context/notes/noteContext';
import Noteitems from './Noteitems';
import AddNotes from './AddNotes';
const Notes = () => {
    const context=useContext(noteContext);
  const {notes}= context;
  return (
    <>
    <AddNotes/>
    <div className="row my-3">
    <h2>Your Notes</h2>
    {Array.isArray(notes) && notes.map((notes)=>{
      return <Noteitems key={notes._id} notes={notes}/>;
    })}
    </div>
    </>
  )
}

export default Notes
