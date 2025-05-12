import { useState} from "react"
import "./NavBar.css"
import { GiHamburgerMenu } from "react-icons/gi"
import { RxCross2 } from "react-icons/rx"
import { Link, Navigate } from "react-router";
import { useUserContext } from "../../contexes/UserContext";
import { useNavigate } from "react-router";

export function NavBar() {
  const [burgerClass, setBurgerClass] = useState(false)
  const {user, setUser} = useUserContext()
  const navigate = useNavigate()


  function setMenu() {
    setBurgerClass(!burgerClass)
  }

async function handleLogOut () { 
  await fetch("http://localhost:3000/api/users/logout", {
    method: "POST",
    credentials: "include", 
  })
   console.log('hello')
    setUser(null)
    navigate('/') 
  }

  return (
    <>
      <nav className="navBar">
        <div className="navigationSection">
        <Link to='/'>
          <div className="logo">
            <span>Cine</span>Seek
          </div>
          </Link>
          <ul className="navLinks">
            <li>
              <a href="/movies">Movies</a>
            </li>
            <li>
              <a href="/tvshows">TV Shows</a>
            </li>
          </ul>
        </div>
        {user ?  <div className="logOutSection">
          <button onClick={handleLogOut} className="btn logout-btn">Logout</button>
          <button className="btn profile-btn">{user.name[0]}</button>
        </div> : <div className="loginSection">
          <Link to='/register'>
          <button className="btn register-btn">Register</button>
          </Link>
          <Link to='/login'>
          <button className="btn login-btn">Login</button>
          </Link>
        </div>}
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
          {user ? (<li><a href="/movies">Profile</a></li>) : (<><li>
            <a href="/register">Register</a>
          </li>
          <li>
            <a href="/login">Login</a>
          </li></>)}
        </ul>
      </div>
    </>
  )
}
