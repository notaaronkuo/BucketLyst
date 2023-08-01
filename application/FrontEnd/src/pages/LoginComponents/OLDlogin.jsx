import React from 'react';
//import './css/Hotbar.css';
//import './css/Login.css';

import { Link } from 'react-router-dom';
//import '../css/Login.css';


function onSuccess(googleUser) {
    console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
  }
  function onFailure(error) {
    console.log(error);
  }
  function renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
      'onsuccess': onSuccess,
      'onfailure': onFailure
    });
  }

function login() {
  return (

    <div class ="login-body">
        <div class="Center">

            <div class = "logo-side">
                <div class = "logo">
                    <img src="https://i.ibb.co/4fyF7yz/bucket-Lyst-logo.png"></img>
                </div>
            </div>

         <div class="login-page">

            <h2>Login</h2>
            <h4>Edit anything within the "login-page" class</h4>
            <p>I also left in a bit of code below to help u get started for this page c:</p>
            <p>You can resuse the code to help make the other pages</p>
            <p>Feel free to let me to know if you have any questions!</p>

            <form id="login-form" class="login-form">
                <label for="username">Email</label>
                <input type="email" placeholder="example@email.com" id="email" />

                <label for="username">Password</label>
                <input type="password" placeholder="Password" id="password" />

                <Link to="/"><button type="submit">Log In</button></Link>

                <div id="my-signin2"></div>
                <button type="submit">Facebook Button</button>

                <Link to="/"><button type="submit">Log In</button></Link>
            </form>

            <Link to="/member">Need to sign up?</Link>

            </div>   
        </div>
        <Link to="/login1" class = "links">Login</Link> &nbsp;
        <Link to="/member" class = "links">Membership</Link> &nbsp;
        <Link to="/reset1" class = "links">ResetPassword1</Link> &nbsp;
        <Link to="/reset2" class = "links">ResetPassword2</Link> &nbsp;
    </div>

    

    
    
    
    

    );
}

export default login;