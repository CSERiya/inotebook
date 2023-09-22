
import { useState } from "react";
import noteContext from "./noteContext";
const NoteState=(props)=>{
  const host="http://localhost:5000"
const notesInitial=[]
  const [notes,setNotes]=useState(notesInitial);

  // Get all Notes
  const getNotes=async ()=>{
    //  API Call
    const response= await fetch(`${host}/api/notes/fetchallnotes`, {
      method:'GET',
      headers:{
        'Content-Type':'application/json',
        'auth-token':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRmNWU2ZjliNWQ2NzI1MjQ5YWM2NGZhIn0sImlhdCI6MTY5Mzk4MTg0OX0.2VMA5CfzNJcqv-u3pqUzKl9Bt9JoBwL-fmmgYdhNevA"
      }
    });
    const json=await response.json()
    console.log(json);
    setNotes(json);
    }

  // Add a Note
const addNote=async (title, description, tag)=>{
//  API Call
const response= await fetch(`${host}/api/notes/addnote`, {
  method:'POST',
  headers:{
    'Content-Type':'application/json',
    'auth-token':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRmNWU2ZjliNWQ2NzI1MjQ5YWM2NGZhIn0sImlhdCI6MTY5Mzk4MTg0OX0.2VMA5CfzNJcqv-u3pqUzKl9Bt9JoBwL-fmmgYdhNevA"
  },
  body:JSON.stringify({title, description,tag})
});

const json=await response.json();
console.log(json);

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
}
  // Delete a Note
const deleteNote=async(id)=>{
  // API Call
  const response= await fetch(`${host}/api/notes//deletenote/${id}`, {
  method:'DELETE',
  headers:{
    'Content-Type':'application/json',
    'auth-token':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRmNWU2ZjliNWQ2NzI1MjQ5YWM2NGZhIn0sImlhdCI6MTY5Mzk4MTg0OX0.2VMA5CfzNJcqv-u3pqUzKl9Bt9JoBwL-fmmgYdhNevA"
  }
});
const json= await response.json();
console.log(json);
  const newNotes=notes.filter((note)=>{return note._id!==id})
  setNotes(newNotes)
}
  // Edit a Note or Update a note
  const editNote=async (id,title,description,tag)=>{ 
    // API Call
const response= await fetch(`${host}/api/notes//updatenote/${id}`, {
  method:'PUT',
  headers:{
    'Content-Type':'application/json',
    'auth-token':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRmNWU2ZjliNWQ2NzI1MjQ5YWM2NGZhIn0sImlhdCI6MTY5Mzk4MTg0OX0.2VMA5CfzNJcqv-u3pqUzKl9Bt9JoBwL-fmmgYdhNevA"
  },
  body:JSON.stringify({title,description,tag})
});
const json= await response.json();
console.log(json);
let newNote=JSON.parse(JSON.stringify(notes))
    // Logic added to edit in client
    for (let index = 0; index < newNote.length; index++) {
      const element = newNote[index];
      if(element._id===id){
        newNote[index].title=title;
        newNote[index].description=description;
        newNote[index].tag=tag;
        break;
      }
    }
    setNotes(newNote);
  }

    return (
         <noteContext.Provider value={{notes,addNote,deleteNote,editNote,getNotes}}>
{props.children}
</noteContext.Provider>
    )
    }

export default NoteState;