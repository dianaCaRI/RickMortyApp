import { sendEmailVerification } from 'firebase/auth'
import {auth} from '../firebase-config'
import React from 'react'
import Navbar from '../components/Navbar'
import { useState,useEffect } from 'react'
import { sendPasswordResetEmail } from 'firebase/auth'
import { getAuth } from 'firebase/auth'
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import {db } from '../firebase-config';
import {setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword} from 'firebase/auth';



export default function Profile() {

    const auth = getAuth();
    const [user, setUser] = useState({})
    const [document, setDocument] = useState([])
    const [emailAdd, setemailAdd] = useState('')
    const [passwordAdd, setpasswordAdd] = useState('')
    const [tipoRol, setTipoRol] = useState('')
    const [rolAdd, setRolAdd] = useState('')
    

    useEffect(() => {
      setUser(JSON.parse(localStorage.getItem('usuarioLogeado')))
      setTipoRol(JSON.parse(localStorage.getItem('tipoUsuario')))
    }
    , [])


    const getDocument = async () => {
      const querySnapshot = await getDocs(collection(db, "user"));
      let document = [];
      querySnapshot.forEach((doc) => {
        document.push({...doc.data() ,id: doc.id});
      });
      setDocument(document)
      }
      useEffect(() => {
        getDocument()
      }, [])
      
   
    
    const emailVerification = ( )=>{
        sendEmailVerification(auth.currentUser)
        
    }

    const deleteDocument = async (id) =>{
      const userDoc = doc(db,"user", id)
      await deleteDoc(userDoc)
      getDocument()
    }

    var email= user.email;
    var rol = tipoRol;
    console.log(rol)
    const triggerResetEmail = async () => {
      await sendPasswordResetEmail(auth, email);
      console.log("Password reset email sent")
    }

    const registerAdd = async () => {
      try {
        const user = await createUserWithEmailAndPassword(auth, emailAdd, passwordAdd)
        console.log(user.user.uid)
        const docuRef= doc(db, `user/${user.user.uid}`)
        setDoc(docuRef,{correo:emailAdd, rol:rolAdd})
        console.log('creado en bd')
        
      }catch(error){
        console.log(error)
      }
       
    }
    
  
    

  return (
    <div className='bg-gradient-to-r from-white via-lime-400 to-green-600'>
      <Navbar></Navbar>
      
        <div className="flex justify-end px-4 pt-4">
        </div>
            {
              user.emailVerified  ? 
              <a className='text-green-500'>cuenta verificada</a>
            :
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={emailVerification}>
              Verificar Correo
            </button>
            }
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={triggerResetEmail}>
              Cambiar Contrasena
            </button>

      {
        rol == 'admin' ?
        <div>
          <p>anadir usuario</p>
        <input
                type="text"
                className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                id="exampleFormControlInput"
                placeholder="Email address"
                onChange={(event) =>{
                  setemailAdd(event.target.value);
                }}
              />
              <input
                type="text"
                className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                id="exampleFormControlInput"
                placeholder="Password"
                onChange={(event) =>{
                  setpasswordAdd(event.target.value);
                }}
              />
               <input
                type="text"
                className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                id="exampleFormControlInput"
                placeholder="Rol"
                onChange={(event) =>{
                  setRolAdd(event.target.value);
                }}
              />
              <button
                type="button"
                className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
               onClick={registerAdd}
              >Registrar</button>
              </div>
              :
              <p>hola</p>
      }
      {
        rol == 'admin' ? 
        <div className="flex flex-col">
  <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
      <div className="overflow-hidden">
        <table className="min-w-full">
          <thead className="border-b">
            <tr>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                id
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Email
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Rol
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {
             document.map((user,index)=>{
              return(
                <tr className="bg-white border-b">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.id}</td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {user.correo}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {user.rol}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full" onClick={()=> {deleteDocument(user.id)}}>
                      Eliminar
                    </button>
                </td>
              </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
        : <p>No eres admn</p>
      }
    </div>

  )
}