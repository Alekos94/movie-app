import { useState} from "react"
import "./NavBar.css"
import { GiHamburgerMenu } from "react-icons/gi"
import { RxCross2 } from "react-icons/rx"
import { Link } from "react-router";
import { useUserContext } from "../../contexes/UserContext";
import { useNavigate } from "react-router";


export function NavBar() {
  const [burgerClass, setBurgerClass] = useState(false)
  const [moviesDropDown, setMoviesDropDown] = useState(false)
  const [tvShowsDropDown, setTvShowsDropDown] = useState(false)
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
    setUser(null)
    navigate('/') 
  }
//fix navbar for mobile the profile button and logout are stiull visible add them in the hidden menu
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
            <li onMouseEnter={() => setMoviesDropDown(true)}  onMouseLeave={() => setMoviesDropDown(false)}>
              Movies
              {moviesDropDown && (
                <div className="dropDown-menu">
                  <Link to='/movies/popular'>Popular</Link>
                  <Link to='/movies/upcoming'>Upcoming</Link>
                  <Link to='/movies/top_rated'>Top Rated</Link>
                  </div>)}
            </li>
            <li onMouseEnter={() => setTvShowsDropDown(true)}  onMouseLeave={() => setTvShowsDropDown(false)}>
              TV Shows
              {tvShowsDropDown && (
                <div className="dropDown-menu">
                  <Link to='/tvShows/popular'>Popular</Link>
                  <Link to='/tvShows/onTv'>On TV</Link>
                  <Link to='/tvShows/topRated'>Top Rated</Link>
                  </div>)}
            </li>
          </ul>
        </div>
        {user ?  <div className="logOutSection">
          <button onClick={handleLogOut} className="btn logout-btn">Logout</button>
          <Link to={`/${user._id}`} className="btn profile-btn">{user.name[0]}</Link>
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
