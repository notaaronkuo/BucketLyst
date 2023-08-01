import React from 'react';
import { Link } from 'react-router-dom';

import './Login.css';

function LoginPage() {
  return (

    
    <div class="login-area">
    <form id="login-form" class="login-form">
        <img src="https://i.ibb.co/4fyF7yz/bucket-Lyst-logo.png"></img>
        <br></br>
        <h2>Sign In</h2>
        <div class="loginValidation">
            <label for="username">Email</label>
            <input type="email" placeholder="example@email.com" id="email" />
            <small>Error message</small>
        </div>
        <div class="loginValidation">
            <label for="username">Password</label>
            <input type="password" placeholder="Password" id="password" />
            <small>Error message</small>
        </div>

        
        <div class="pass">
            <a href="#modal">Forgot Password?</a>
        </div>
        <br></br>
        <Link to="/soonPage">
          <button type="submit">Log In</button>
        </Link>
        <br></br>

        <Link to="/membership" className="membership-link">Need to sign up?</Link>

    </form>

    <div id="modal">
        <div class="password-window">
            <a class="password-window-close" href="#">X</a>
            <h2>Reset Password</h2> <br />
            <h3>
                A password reset link will be sent<br />
                to the email entered below if there's <br />
                an account associated with it. <br /><br />
            </h3>
            <div class="loginValidation">
                <label for="username">Email</label>
                <input type="email" placeholder="example@email.com" id="email" />
                <small>Error message</small>
            </div>
            <Link to="/soonPage">
              <button type="submit">Submit Email</button>
            </Link>
        </div>
    </div>

    </div>
    
  );
}

export default LoginPage;




/** 
    <div>
      <img className = "photoLogin" src="https://i.ibb.co/4fyF7yz/bucket-Lyst-logo.png"></img>
      <form className="login-form">
      <h2>Sign In</h2> <br></br>
        <label>
          Username:
          <input type="text" name="username" />
        </label>
        <label>
          Password:
          <input type="password" name="password" />
        </label>
        <Link to="/membership" className="membership-link">Need to sign up?</Link>
        <button type="submit">Submit</button>
        
      </form>
      
    </div>*/