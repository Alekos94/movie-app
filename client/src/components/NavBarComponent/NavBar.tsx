import { useState } from "react"
import "./NavBar.css"
import { GiHamburgerMenu } from "react-icons/gi"
import { RxCross2 } from "react-icons/rx"

export function NavBar() {
  const [burgerClass, setBurgerClass] = useState(false)

  function setMenu() {
    setBurgerClass(!burgerClass)
  }

  return (
    <>
      <nav className="navBar">
        <div className="navigationSection">
          <div className="logo">
            <span>Cine</span>Seek
          </div>
          <ul className="navLinks">
            <li>
              <a href="/movies">Movies</a>
            </li>
            <li>
              <a href="/tvshows">TV Shows</a>
            </li>
          </ul>
        </div>
        <div className="loginSection">
          <button className="btn register-btn">Register</button>
          <button className="btn login-btn">Login</button>
        </div>
        <div className="hamburger-menu" onClick={setMenu}>
          {burgerClass ? <RxCross2 /> : <GiHamburgerMenu />}
        </div>
      </nav>
      <div className={`hidden-menu ${burgerClass ? "open" : ""}`}>
        <ul>
          <li>
            <a href="/movies">Movies</a>
          </li>
          <li>
            <a href="/tvshows">TV Shows</a>
          </li>
          <li>
            <a href="/register">Register</a>
          </li>
          <li>
            <a href="/login">Login</a>
          </li>
        </ul>
      </div>
    </>
  )
}
