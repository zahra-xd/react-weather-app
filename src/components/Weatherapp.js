import React, { useState } from "react";
import Weather from './CurrentLocation';
import ReactDOM from 'react-dom';
// import Weather  from './CurrentLocation';
import './style.css';
function Appweather() {
    return (
      <React.Fragment>
        <div className="container">
          <Weather />
        </div>
        {/* <div className="footer-info">
          <a href="https://www.htmlhints.com/article/how-to-create-toggle-switch/93">
            Download Source Code
          </a>{" "}
          | Developed by{" "}
          <a target="_blank" href="https://www.gauravghai.dev/">
            Gaurav Ghai
          </a>{" "}
          | Powered by{" "}
          <a target="_blank" href="https://www.htmlhints.com/">
            HTML HINTS
          </a>
        </div> */}
      </React.Fragment>
    );
  }
  
  export default Appweather;