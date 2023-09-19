
import { useState } from "react";
import noteContext from "./noteContext";
const NoteState=(props)=>{
    // const state1={
    //     "Name":"Riya Kumari",
    //     "Class":"B-Tech 3rd year"
    // }
    // const [state, setState]=useState(state1);
//     const update=()=>{
// setTimeout(()=>{
//     setState({
// "Name":"Priya Kumari",
// "Class":"12A"
//     })
// },1000);
//     }

// We will bring notes using our API but for now we are hardcoding it..
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
    return (
        //    <noteContext.Provider value={state1}>
        //  <noteContext.Provider value={{state,update}}>
         <noteContext.Provider value={{notes,setNotes}}>
{props.children}
</noteContext.Provider>
    )
    }

export default NoteState;