import {useContext, useEffect} from 'react'
import noteContext from '../context/notes/noteContext'

const About = () => {
    const a= useContext(noteContext)
    useEffect(()=>{
       // a.update();
        //eslint-disable-next-line
    },[])
  return (
    <div>
    {/* This is about {a.Name} and she studies in class {a.Class}     */}
    This is About page..
    </div>
  )
}

export default About
