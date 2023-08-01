import React, { useState } from 'react';

import { Link } from 'react-router-dom';

import '../css/Footer.css'
function Footer() {

  console.log("Footer called");

    //Edit Code Below
  return (
    <footer>
    <div className="footer">
        
        <div className = "f-top">
        <img
          className="footerlogo"
          src="https://i.ibb.co/gFDYLcR/logo-bucket.png"
          alt="Placeholder image"
          style={{ width: '50px', height: '50px', objectFit: 'cover', bottom: '-30px', position: 'relative'}}
        />
          <div className = "title">
              <h1>Map your memories and your dreams with BucketLyst</h1>
          </div>

            <Link to="/member"><button style={{cursor: 'pointer'}} type="submit" class="button1">Start for free</button></Link>
        </div>

        <div className = "f-middle">

          <div className = "m-fl">
        <img
          className="midfooterlogo"
          src="https://i.ibb.co/3zbgwxQ/white-logo.png"
          alt="Placeholder image"
          style={{ width: '30px', height: '30px', objectFit: 'cover', position: 'relative', alignSelf: 'center' }}
          
        />
              <div className = "bucketlyst">
                <h1>BUCKETLYST</h1>
              </div>
          </div>
          <div className = "m-fr">

              <div className = "features">
                <h1>Features</h1>
                  <div className = "featureslist">
                    <Link to="/implementlater" className = "footer-small-links">How it works</Link>
                    <Link to="/implementlater" className = "footer-small-links">Sample Lists</Link>
                    <Link to="/blogin" className = "footer-small-links">Business User</Link>
                </div>
              </div>
              <div className = "company">
                <h1>Company</h1>
                  <div className = "companylist">
                    <Link to="/implementlater" className = "footer-small-links">Our Team</Link>
                    <Link to="/implementlater" className = "footer-small-links">Facebook</Link>
                    <Link to="/implementlater" className = "footer-small-links">Twitter</Link>
                    <Link to="/implementlater" className = "footer-small-links">Linkedin</Link>
                  </div>
              </div>
            </div>
        </div>

        <div className = "f-bottom">
          <div className = "policies">
            <Link to="/implementlater" className = "footer-small-links">Security&nbsp;</Link>|
            <Link to="/implementlater" className = "footer-small-links">&nbsp;Privacy&nbsp;</Link>|
            <Link to="/implementlater" className = "footer-small-links">&nbsp;Terms&nbsp;</Link>
          </div>
          <div className = "copyright">
            <p>© BucketLyst Inc.</p>
          </div>
        </div>
      </div>
      </footer>
    
  );
}

export default Footer;