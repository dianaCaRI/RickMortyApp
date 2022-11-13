import React from 'react'
import {auth} from '../firebase-config'
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import apiURL from '/'

export default function Main() {
  const user= auth.currentUser;
  console.log(auth.currentUser);



  return (
    <div>
      <Navbar></Navbar>
      <div>Hola {user.email}</div>
    </div>
  )
}
