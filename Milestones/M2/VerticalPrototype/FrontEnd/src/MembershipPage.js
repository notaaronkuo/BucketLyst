import React from 'react';
import { Link } from 'react-router-dom';

import './MemberShip.css';
import './Login.css';



function MembershipPage() {
  return (

    <div class="membership-area1">
            <div class="membership-area">
                <div class="membership-title"> Membership</div>
                <div class="membership-content">
                    <form className="member-form">
                        <div class="membership-Fill-Ins">

                            <div class="membershipValidation">
                                <label for="m-username">Username</label>
                                <input type="text" placeholder="Enter your preferred username" id="m-username" />
                                <small>Error message</small>
                            </div>
                            <div class="membershipValidation">
                                <label for="m-email">Email</label>
                                <input type="email" placeholder="example@email.com" id="m-email" />
                                <small>Error message</small>
                            </div>
                            <div class="membershipValidation">
                                <label for="m-firstname">First Name</label>
                                <input type="text" placeholder="Enter your first name" id="m-firstname" />
                                <small>Error message</small>
                            </div>
                            <div class="membershipValidation">
                                <label for="m-lastname">Last Name</label>
                                <input type="text" placeholder="Enter your last name" id="m-lastname" />
                                <small>Error message</small>
                            </div>
                            <div class="membershipValidation">
                                <label for="m-password">Password</label>
                                <input type="password" placeholder="Enter your password" id="m-password" />
                                <small>Error message</small>
                            </div>
                            <div class="membershipValidation">
                                <label for="m-password2">Confirm Password</label>
                                <input type="password" placeholder="Confirm your password" id="m-password2" />
                                <small>Error message</small>
                            </div>

                        </div>
                        <Link to="/soonPage">
                            <button type="submit">Create Account</button>
                        </Link>

                    </form>

            </div>
            </div>
            </div>
   
  );
}

export default MembershipPage;