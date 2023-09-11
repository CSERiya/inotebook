// import react from "react";
import noteContext from "./noteContext";
import { useState } from "react";
const NoteState=(props)=>{
    const state1={
        "Name":"Riya Kumari",
        "Class":"B-Tech 3rd year"
    }
    const [state, setState]=useState(state1);
    const update=()=>{
setTimeout(()=>{
    setState({
"Name":"Priya Kumari",
"Class":"12A"
    })
},2000);
    }
    return (
        // <noteContext.Provider value={state1}>
        <noteContext.Provider value={{state,update}}>
{props.children}
</noteContext.Provider>
    )
}

export default NoteState;