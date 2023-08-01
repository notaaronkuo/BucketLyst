import React from 'react';

import '../css/Login.css';
import { Link } from 'react-router-dom';


function businesslogin() {
    return (

        <div class ="body">

                <div class="business-login">
                    
                    

                    <form id="login-form" class="login-form">

                    <h2>Welcome</h2>

                        <label for="company" class="compname">Company Name</label>
                        <input type="company" id="company" />

                        <label for="email" class="email">Email</label>
                        <input type="email" id="email" />

                        <label for="username" class="password">Password</label>
                        <input type="password" id="password" />

                        <Link to="/reset1" class="link1">Forgot Password?</Link>

                        <Link to="/"><button type="submit" class="button1">Log In</button></Link>

           
                        <Link to="/login1" class="link2">Sign in as normal user instead</Link>
                        <Link to="/bmembership" class="link3">Don't have a business account?</Link>
            
            </form>

            
     
            </div>
    

    
        </div>
    
      );
    }

export default businesslogin;