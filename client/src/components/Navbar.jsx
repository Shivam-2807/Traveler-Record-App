import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Navbar() {
  const navigate = useNavigate();
  const { isAuthenticated, logout, user } = useAuth();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <header className="topbar">
      <Link className="brand" to={isAuthenticated ? "/dashboard" : "/"}>
        Traveler Record
      </Link>

      <nav className="nav-links" aria-label="Primary navigation">
        {isAuthenticated ? (
          <>
            <NavLink to="/dashboard">Dashboard</NavLink>
            <NavLink to="/trips/new">New Trip</NavLink>
            <NavLink to="/history">History</NavLink>
            <NavLink to="/profile">{user?.name || "Profile"}</NavLink>
            <button className="link-button" type="button" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink className="button-link" to="/register">
              Create account
            </NavLink>
          </>
        )}
      </nav>
    </header>
  );
}
