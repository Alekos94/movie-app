import { useState } from "react";
import "./NavBar.css"
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";

export function NavBar() {
  const [isItOpen , setIsItOpen] = useState(false)

  function setMenu () {
    setIsItOpen(!isItOpen)
  }
  
  return (
    <nav className="navBar">
      <div className="navigationSection">
        <div className="logo">CineSeek</div>
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
      {isItOpen? <RxCross1 /> : <GiHamburgerMenu />}
      </div>
    </nav>
  )
}
