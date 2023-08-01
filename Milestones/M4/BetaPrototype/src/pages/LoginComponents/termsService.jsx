import React, { useState } from 'react'

import "../css/MainPages.css";
import "../css/Login.css";

import { Link,  useNavigate} from 'react-router-dom';
        
function TermsService() {

    const navigate = useNavigate();
	const goBack = () => {
		navigate(-1);
	}

    return (

        <div>
             <h2>Empty page for terms of service</h2>

          <button className="b-back-button" onClick={goBack}>
            <img
              style={{ width: "auto", height: "50px" }}
              className="b-back-button"
              src="https://i.ibb.co/TLPrM29/back.png"
              alt="ack"
            />
          </button>

        </div>


    
      );
    }

export default TermsService;