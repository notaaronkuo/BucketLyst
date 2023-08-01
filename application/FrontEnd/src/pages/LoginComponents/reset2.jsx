import React from 'react';

import '../css/Login.css';
import { Link } from 'react-router-dom';


function reset2() {
    return (

        <div class ="body">

                <div class="reset2">
    
    
                    

                    <form class="reset-form">

                    <h2>Reset Password</h2>
                    <label class="request">Request has been sent!</label>

                    <label class="request">Check your spam folder if you don't see a reset link right away</label>

                    <label class="request">Or you can resend another link below</label>

                        <button type="submit" class="button1">Re-Send Password Reset Request</button>
                        <Link to="/login1" class="link4">Back to Sign-In</Link>
                    </form>
    
    
                </div>   
            </div>


    
      );
    }

export default reset2;