import React from 'react';
import { Link } from 'react-router-dom';
import './footer.css'; 

function Footer() {
  return (
    <footer className="footer bg-dark text-light py-4">
      <div className="container">
        <div className="row">
       
          <div className="col-md-6">
            <Link className="nav-link text-muted" to="/about">About</Link>
          </div>

          
          <div className="col-md-6 d-flex justify-content-end">
            <span className="text-muted">© 2024 UCampus, Inc. | All Rights Reserved</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
