import "./NavBar.css"

export function NavBar() {
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
        <button className="register-btn">Register</button>
        <button className="login-btn">Login</button>
      </div>
    </nav>
  )
}
