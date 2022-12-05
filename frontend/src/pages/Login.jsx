import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import React,{ useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase-config';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase-config';

export default function Login() {
  const navigate = useNavigate();
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [user, setUser] = useState({});
  const [document, setDocument] = useState([])


    useEffect(() => {
      setUser(JSON.parse(localStorage.getItem('usuarioLogeado')))
    }
    , [])


  const logIntoAcc = async () => {
    const usuario = await signInWithEmailAndPassword(auth, email, password)
    setUser(usuario)
    const usuarioLogg = auth.currentUser
    localStorage.setItem('usuarioLogeado', JSON.stringify(usuarioLogg))
    const docRef = doc(db, "user", auth.currentUser.uid);
    const docSnap = await getDoc(docRef);
    console.log(docSnap.data())
    localStorage.setItem('tipoUsuario',JSON.stringify(docSnap.data().rol))
    navigate('/Main')

  } 
  
  return (
    <section className="h-screen">
  <div className="px-6 h-full text-gray-800 bg-gradient-to-r from-white via-lime-400 to-green-600">
    <div
      className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6"
    >
      <div
        className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0"
      >
        <img
          src='https://i.guim.co.uk/img/media/b563ac5db4b4a4e1197c586bbca3edebca9173cd/0_12_3307_1985/master/3307.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=61a26bf43da26e4ca97e932e5ee113f7'
          className="w-full"
          alt="Sample image"
        />
      </div>
      <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
        <form>
          <div className="mb-6">
            <input
              type="text"
              className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="exampleFormControlInput2"
              placeholder="Email address"
              onChange={(event) =>{
                setEmail(event.target.value);
              }}	
            />
          </div>

          <div className="mb-6">
            <input
              type="password"
              className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="exampleFormControlInput2"
              placeholder="Password"
              onChange={(event) =>{
                setPassword(event.target.value);
              }}	
            />
          </div>

          <div className="text-center lg:text-left">
            <button
              type="button"
              className="inline-block px-7 py-3 bg-green-400 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            onClick={logIntoAcc}
            >
              Login
            </button>
            <Link to={'/register'}>
            <p className="text-sm font-semibold mt-2 pt-1 mb-0">
              Don't have an account?
              <a
                href="#!"
                className="text-green-600 hover:text-green-400 focus:text-red-700 transition duration-200 ease-in-out"
                >Register</a
              >
            </p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  </div>
</section>
  )
}
