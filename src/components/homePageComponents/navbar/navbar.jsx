import React from "react";
import style from "./navbar.module.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { logOut } from "../../../redux/Slices/AuthSlice";

const Navbar = () => {
  const { isLoggedIn } = useSelector((state) => state.AuthSlice);
  const userData = isLoggedIn ? JSON.parse(Cookies.get("userData")) : null;
  console.log(userData);
  console.log(isLoggedIn);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logOut());
  };

  return (
    <>
      <nav className={style.navbar}>
        <div className={`${style["navbar-container"]} ${style.container}`}>
          <input type="checkbox" name="" id="" />
          <div className={style["hamburger-lines"]}>
            <span className={`${style.line} ${style.line1}`}></span>
            <span className={`${style.line} ${style.line2}`}></span>
            <span className={`${style.line} ${style.line3}`}></span>
          </div>
          <ul className={style["menu-items"]}>
            <div className={style["main-links"]}>
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
            </div>
            <div className={style["account-links"]}>
              {isLoggedIn ? (
                <>
                  <li>
                    <Link>{userData.fullName} </Link>
                  </li>
                  <li>
                    <Link onClick={handleLogout}> Logout</Link>
                  </li>{" "}
                </>
              ) : (
                <>
                  <li>
                    <Link to="/signin">Login </Link>
                  </li>
                  <li>
                    <Link to="/signup"> Sign Up</Link>
                  </li>
                </>
              )}
            </div>
          </ul>
          <Link to="/" className={style.logo}>
            <img src="/logo.Png" />
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
