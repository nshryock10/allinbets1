import '../App';
import './SignUp.css';
import {useState } from 'react';
import { Link } from 'react-router-dom';

function SignUp() {

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [userName, setUserName] = useState('');
  const [mm, setMm] = useState('');
  const [dd, setDd] = useState('');
  const [yyyy, setYyyy] = useState('');

  const handleClick = () => {
    if( email === '' ||
        name === null ||
        userName === null ||
        mm === null ||
        dd === null ||
        yyyy === null){
        alert('Please fill out all fields')
      }
  }

  return (
    <div className="main">
        <h1>Sign up now to play!</h1>
        <form className="signup-form">
          <div className="signup-input-container">
            <label 
                className="signup-label"
                for="email"
            >EMAIL ADDRESS:</label>
            <input 
                className="signup-input" 
                id="email"
                type="email"
                requried
                onChange={(e) => setEmail(e.currentTarget.value)}>
            </input>
          </div>
          <div className="signup-input-container">
            <label 
                className="signup-label"
                for="name"
            >NAME:</label>
            <input 
                className="signup-input" 
                id="name"
                type="text"
                onChange={(e) => setName(e.currentTarget.value)}
            ></input>
          </div>
          <div className="signup-input-container">
            <label className="signup-label">USERNAME:</label>
            <input className="signup-input" onChange={(e) => setUserName(e.currentTarget.value)}></input>
          </div>
          <div className="signup-input-container">
            <label className="signup-label">BIRTHDAY:</label>
              <div className="birthday-container">
                <input className="signup-input" 
                        id="birthday-input" 
                        placeholder='mm' 
                        onChange={(e) => setMm(e.currentTarget.value)}>
                  </input>
                  <input className="signup-input" 
                          id="birthday-input" 
                          placeholder='dd' 
                          onChange={(e) => setDd(e.currentTarget.value)}>
                  </input>
                  <input className="signup-input"
                          id="birthday-input"
                          placeholder='yyyy' 
                          onChange={(e) => setYyyy(e.currentTarget.value)}>
                  </input>
              </div>
          </div>
          <div className="checkbox-container">
            <input className="checkbox" type="checkbox"></input>
            <label className="checkbox-label">I have read and agree to the terms of use</label>
          </div>
        </form>
        <div className="button-section">
          {(email === '' ||
            name === '' ||
            userName === '' ||
            mm === '' ||
            dd === '' ||
            yyyy === '') ?
          (<Link to='/questions' className="disable-link" state={
            {
              email: email,
              name:name,
              userName: userName,
              mm: mm,
              dd: dd,
              yyyy: yyyy,
              paymentTerms: false
            }} 
          >
            <button onClick={handleClick} id="disable-button">Submit</button>
          </Link>) : 
          (<Link to='/questions' state={
            {
              email: email,
              name:name,
              userName: userName,
              mm: mm,
              dd: dd,
              yyyy: yyyy,
              paymentTerms: false
            }} 
          >
            <button onClick={handleClick} id="hero-button">Submit</button>
          </Link>)}
        </div>
    </div>
  );
}

export default SignUp;