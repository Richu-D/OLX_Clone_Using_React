import React, { useState,useContext } from 'react';


import Logo from '../../olx-logo.png';
import {useHistory,Link} from 'react-router-dom'
import { FirebaseContext } from '../../store/Context';
import './Signup.css';
import Swal from 'sweetalert2'

export default function Signup() {
  const history=useHistory()
  const [username,SetUsername]=useState('')
  const [email,SetEmail]=useState('')
  const [phone,SetPhone]=useState('')
  const [password,SetPassword]=useState('')
  const {firebase}=useContext(FirebaseContext)
  
  const [usernameErr, setusernameErr] = useState("")
  const [emailErr, setemailErr] = useState("")
  const [phonenumberErr, setphonenumberErr] = useState("")
  const [passwordErr, setPasswordErr] = useState("")

  function validateUsername(){
    if (!username) {
      setusernameErr("username is required");
      return false;
    }else if (username.length < 5) {
      setusernameErr("username have minimum 5 character");
      return false;
    } 
    setusernameErr(null);  
    return true;
  }

  function validatePhoneNumber(){
    if (!phone) {
      setphonenumberErr("phone Number is required");
      return false;
    }else if (phone.length !== 10) {
      setphonenumberErr("Phone Number must 10 digit");
      return false;
    } 
    setphonenumberErr(null);  
    return true;
  }




  function validateEmail(){
    if (!email) {
      setemailErr("Email is required");
      return false;
    } else if (!email.match(/^[A-Za-z0-9._-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/)) {
      setemailErr("Enter a valid email");
      return false;
    } 
    setemailErr(null); 
    return true;
  }

  function validatePassword(){
    if (!password) {
      setPasswordErr("Password is required");
      return false;
    }
     else if (password.length < 8) {
      setPasswordErr("Password at least 8 character");
      return false;
    } 
    setPasswordErr(null); 
    return true;
  }
 
  const handleSubmit=(e)=>{
    e.preventDefault()
    if(!validateUsername()||!validateEmail()||!validatePhoneNumber()||!validatePassword()) return ;
      
    firebase.auth().createUserWithEmailAndPassword(email,password).then((result)=>{
result.user.updateProfile({displayName:username}).then(()=>{
  firebase.firestore().collection('users').add({id:result.user.uid,
  username:username,
  phone:phone
  }).then(()=>{
    history.push('/login')
  })
})
    
   }).catch((err)=>{
    Swal.fire({
      title: 'Error!',
      text: err.message,
      icon: 'error',
      confirmButtonText: 'Ok'
    })
  })
  }
  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" alt='logo' src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e)=>SetUsername(e.target.value)}
            id="fname"
            name="name"
            defaultValue="John"
          />
           {usernameErr && <div style={{color:"Red"}}> {usernameErr}</div>}  
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e)=>{SetEmail(e.target.value)}}
            id="fname"
            name="email"
            defaultValue="John"
          />
          {emailErr && <div style={{color:"Red"}}> {emailErr}</div>}
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phone}
            id="lname"
            name="phone"
            onChange={(e)=>{SetPhone(e.target.value)}}
            defaultValue="Doe"
          />
          {phonenumberErr && <div style={{color:"Red"}}> {phonenumberErr}</div>} 
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e)=>{SetPassword(e.target.value)}}
            id="lname"
            name="password"
            defaultValue="Doe"
          />
           {passwordErr && <div style={{color:"Red"}}> {passwordErr}</div>} 
          <br />
          <br />
          <button>Signup</button>
        </form>
        <Link to="/login" className="link">Login</Link>
      
      </div>
    </div>
  );
}
