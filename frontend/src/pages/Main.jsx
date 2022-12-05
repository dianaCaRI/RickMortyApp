import React from 'react'
import Navbar from '../components/Navbar';
import { useState,useEffect } from 'react';
import axios from 'axios';


export default function Main() {
  const [character, setCharacter] = useState([])
useEffect(()=>{
  const getcharacter = async () => {
    const url= `https://rickandmortyapi.com/api/character`
    await axios.get(url).then((response)=>setCharacter(response.data.results))
  }
  getcharacter();
},[])

console.log(character);

  return (
    <div>
      <Navbar></Navbar>
      <div class="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5 bg-green-600">
        {character.map((character,index)=>{
          return(
            <a href="#" className="flex flex-col items-center bg-gradient-to-tr from-lime-600 via-lime-500 to-emerald-700 rounded-lg border shadow-md md:flex-row md:max-w-xl hover:bg-green-700 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <img className="object-cover w-full h-96 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src={character.image} alt="" />
            <div className="flex flex-col justify-between p-4 leading-normal">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{character.name}</h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Origen: {character.origin.name}</p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Especie: {character.species}</p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Estado: {character.status}</p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">localicacion: {character.location.name}</p>
            </div>
        </a>
          )
        })}
      </div>
    </div>
  )
}
