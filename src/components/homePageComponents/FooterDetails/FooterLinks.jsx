import React from "react";
import { Link } from "react-router-dom";
import "./FooterLinks.css";

function FooterLinks() {
  return (
    <>
      <div className="footer">
        <div className="content container">
          <div className="footer-links">
            <div className="logo">
              <img src="../../../../public/logo.png" />
            </div>
            <div className="links">
              <ul>
                <li>
                  <Link to="/home">Home</Link>
                </li>
                <li>
                  <Link to="/doctors">Doctors</Link>
                </li>
                <li>
                  <Link to="/news">News</Link>
                </li>
                <li>
                  <Link to="/about">About </Link>
                </li>
                <li>
                  <Link to="/contact-us">contact Us</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-socailIcons">
            <div className="icons">
              <i className="pi pi-facebook"></i>
              <i className="pi pi-twitter"></i>
              <i className="pi pi-youtube"></i>
            </div>
          </div>
          <div className="footer-contact-Info">
            <div className="info">
            <div className="email">
              <i className="pi pi-envelope" style={{ fontSize: "1rem" }}></i>
              <span>ICare@gmail.com</span>
            </div>
            <div className="phone">
              <i className="pi pi-phone" style={{ fontSize: "1rem" }}></i>
              <span>+201929929299</span>
            </div>

            <div className="Location">
              <i className="pi pi-building" style={{ fontSize: "1rem" }}></i>

              <span>Mansoura ,Egypt</span>
            </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FooterLinks;
