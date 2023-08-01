import React from 'react';

import '../css/Login.css';
import { Link } from 'react-router-dom';


function reset1() {
    return (

        <div class ="body">

                <div class="reset1">

                    
    
                    <form class="reset-form">

                    <h2>Reset Password</h2>
                    
                    <label class="prompt">Please enter the email associated with your account.</label>
                        <label for="email" class="email">Email</label>
                        <input type="email" id="email" />

                        <Link to="/reset2"><button type="submit" class="button1">Send Password Reset Request</button></Link> 
                        <Link to="/login1" class="link4">Back to Sign-In</Link>
                    </form>

                    
    
                </div>   
            </div>

    
      );
    }

export default reset1;