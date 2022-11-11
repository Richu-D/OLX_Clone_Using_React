import React,{useState,useContext} from 'react';
import {FirebaseContext} from '../../store/Context'
import {useHistory,Link} from 'react-router-dom'
import Logo from '../../olx-logo.png';
import './Login.css';
import Swal from 'sweetalert2'



function Login() {
  const [email,EmailState]=useState('')
  const [password,passwordState]=useState('')
  const {firebase}=useContext(FirebaseContext)
  const history=useHistory()
  
  const [emailErr, setemailErr] = useState("")
  const [passwordErr, setPasswordErr] = useState("")

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
 
  const handleLogin=(e)=>{
    e.preventDefault()
    if(!validateEmail()||!validatePassword()){

    }else{
     firebase.auth().signInWithEmailAndPassword(email,password).then(()=>{
      history.push('/')
    }).catch((err)=>{
      Swal.fire({
        title: 'Error!',
        text: err.message,
        icon: 'error',
        confirmButtonText: 'Ok'
      })
    })
    }
  }
  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            id="fname"
            onChange={(e)=>{
              EmailState(e.target.value)
            }}
            name="email"
            defaultValue="John"
          />
           {emailErr && <div style={{color:"Red"}}> {emailErr}</div>}
           

          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e)=>{
              passwordState(e.target.value)
            }}
            id="lname"
            name="password"
            defaultValue="Doe"
          />
          {passwordErr && <div style={{color:"Red"}}> {passwordErr}</div>}
           
          <br />
          <br />
          <button>Login</button>
        </form>
        <Link to="/signup" className="link">  <a>Signup</a></Link>
      
      </div>
    </div>
  );
}

export default Login;
