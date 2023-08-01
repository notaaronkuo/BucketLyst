import React from 'react';

import '../css/Login.css';
import { Link } from 'react-router-dom';


function businessMembership() {
    return (

        <div class ="body">

                

                <div class="business-membership">
    
                    <form id="register-form" class="register-form">

                    <h2>Business Sign Up</h2>

                        <label for="company" class="compname">Company Name</label>
                        <input type="company" id="company" />

                        <label for="email" class="email">Email</label>
                        <input type="email" id="email" />

                        <label for="password" class="password">Password</label>
                        <input type="password" id="password" />

                        <label for="rpassword" class="rpassword">Re-Enter Password</label>
                        <input type="password" id="password" />

                        <Link to="/blogin"><button type="submit" class="button1">Create Business Account</button></Link>
                        <Link to="/blogin" class="link1">Back to Business Sign In</Link>
                
                    </form>
                </div> 
            </div>

    
      );
    }

export default businessMembership;