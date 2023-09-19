
import { useState } from "react";
import noteContext from "./noteContext";
const NoteState=(props)=>{
  
const notesInitial=[
    {
      "_id": "64fa1e3c2cbd760b32eb842a",
      "user": "64f5e6f9b5d6725249ac64fa",
      "title": "My Title1",
      "description": "Please sleep early in the night!",
      "tag": "Personal",
      "timestamp": "2023-09-07T19:02:20.726Z",
      "__v": 0
    },
    {
      "_id": "64fb3e7e9d879fb7e6828ffe",
      "user": "64f5e6f9b5d6725249ac64fa",
      "title": "My Title1",
      "description": "Please sleep early in the night!",
      "tag": "Personal",
      "timestamp": "2023-09-08T15:32:14.127Z",
      "__v": 0
    }
  ]
  const [notes,setNotes]=useState(notesInitial);

  // Add a Note
const addNote=(title, description, tag)=>{
// TODO: API Call
console.log("Adding a new note")
const note= {
  "_id": "64fb3e7e9d879fb7e6828ffs",
  "user": "64f5e6f9b5d6725249ac64fa",
  "title": title,
  "description":description,
  "tag":tag,
  "timestamp": "2023-09-08T15:32:14.127Z",
  "__v": 0
};
setNotes(notes.concat(note))
// we can also use setNotes(notes.push(note))  --It will not add but submit our solution.
}
  // Delete a Note
const deleteNote=(id)=>{
  // TODO: API Call
  console.log("Deleting the note with id= " +id);
  const newNotes=notes.filter((note)=>{return note._id!==id})
  setNotes(newNotes)
}
  // Edit a Note
  const editNote=(id,title,description,tag)=>{ 
    
  }

    return (
         <noteContext.Provider value={{notes,addNote,deleteNote,editNote}}>
{props.children}
</noteContext.Provider>
    )
    }

export default NoteState;