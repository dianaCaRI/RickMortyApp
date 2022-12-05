import React from 'react'
import Navbar from '../components/Navbar'
import { useState, useEffect } from 'react'
import { doc, setDoc, collection, getDocs  } from 'firebase/firestore'
import { db } from '../firebase-config'


export default function Character() {

    const [nombre, setNombre] = useState('')

const [link , setLink ] = useState('')
const [especie , setEspecie ] = useState('')
const [localizacion , setLocalizacion ] = useState('')
const [origen , setOrigen ] = useState('')
const [estado, setEstado] = useState('')
const [documento , setDocumento ] = useState([])
const charRef = collection(db, "character");

const getGames = async () => {
    const querySnapshot = await getDocs(collection(db, "character"));
    let document = [];
    querySnapshot.forEach((doc) => {
      document.push({...doc.data() ,id: doc.id});
    });
    setDocumento(document)
    }

    useEffect(() => {
        getGames()
      }, [])
      console.log(documento);

const registerChar = async () => {
    try {
     setDoc(doc(charRef),{
        Especie:especie,Link:link, Estado:estado, Nombre:nombre, Localizacion:localizacion,Origen:origen
     })
      console.log('Juego creado en bd')
    }catch(error){
      console.error(error)
    }
}

  return (
    <div className='bg-gradient-to-tr from-lime-600 via-lime-500 to-emerald-700'>
    <Navbar></Navbar>
   
  <form>
      <div className="form-group mb-6 ">
        <input type="text" className="form-control 
          w-full
         
          text-base
          font-normal
          text-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInput123"
          aria-describedby="emailHelp123" placeholder="Nombre"
          onChange={(event) =>{
            setNombre(event.target.value);
          }}
          />
      
      <div className="form-group mb-6">
        <input type="text" className="form-control
          block
          w-full
          px-3
          py-1.5
          text-base
          font-normal
          text-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInput124"
          aria-describedby="emailHelp124" placeholder="Estado"
          onChange={(event) =>{
            setEstado(event.target.value);
          }}
          />
      </div>
    </div>
    <div className="form-group mb-6">
      <input type="text" className="form-control block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInput125"
        placeholder="link imagen"
        onChange={(event) =>{
            setLink(event.target.value);
          }}
        />
    </div>
    <div className="form-group mb-6">
      <input type="text" className="form-control block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInput126"
        placeholder="Localizacion"
        onChange={(event) =>{
            setLocalizacion(event.target.value);
          }}
        />
    </div>
    <div className="form-group mb-6">
      <input type="text" className="form-control block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInput126"
        placeholder="Especie"
        onChange={(event) =>{
            setEspecie(event.target.value);
          }}
        />
        <div className="form-group mb-6">
      <input type="text" className="form-control block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInput126"
        placeholder="Origen"
        onChange={(event) =>{
            setOrigen(event.target.value);
          }}
        />
    </div>
    </div>
    <button type="button" className="
      w-full
      px-6
      py-2.5
      bg-blue-600
      text-white
      font-medium
      text-xs
      leading-tight
      uppercase
      rounded
      shadow-md
     "
      onClick={registerChar}
      >Agregar</button>
  </form>

{documento.map((character,index)=>{
          return(
            <a href="#" className="flex flex-col items-center bg-gradient-to-tr from-lime-600 via-lime-500 to-emerald-700 rounded-lg border shadow-md md:flex-row md:max-w-xl hover:bg-green-700 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <img className="object-cover w-full h-96 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src={character.Link} alt="" />
            <div className="flex flex-col justify-between p-4 leading-normal">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{character.Name}</h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Origen: {character.Origen}</p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Especie: {character.Especie}</p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Estado: {character.Estado}</p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">localicacion: {character.Localizacion}</p>
            </div>
        </a>
          )
        })}
    </div>
  )
}
