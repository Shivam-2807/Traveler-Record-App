import { Link } from "react-router-dom";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-inner">

        {/* Brand Column */}
        <div className="footer-brand-col">
          <Link to="/" className="footer-brand">Traveler Record</Link>
          <p className="footer-tagline">
            Smart money. Smart memories.<br />
            Find your travel tribe.
          </p>
          <div className="footer-socials">
            <a href="#" aria-label="Twitter" className="social-icon">𝕏</a>
            <a href="#" aria-label="Instagram" className="social-icon">📸</a>
            <a href="#" aria-label="GitHub" className="social-icon">💻</a>
          </div>
        </div>

        {/* Links Column 1 */}
        <div className="footer-col">
          <h4>Explore</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/famous-places">Famous Places</Link></li>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/trips/new">Plan a Trip</Link></li>
            <li><Link to="/history">Trip History</Link></li>
          </ul>
        </div>

        {/* Links Column 2 */}
        <div className="footer-col">
          <h4>Account</h4>
          <ul>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Create Account</Link></li>
            <li><Link to="/profile">Profile</Link></li>
          </ul>
        </div>

        {/* Links Column 3 */}
        <div className="footer-col">
          <h4>Popular Cities</h4>
          <ul>
            <li><Link to="/famous-places">Agra</Link></li>
            <li><Link to="/famous-places">Delhi</Link></li>
            <li><Link to="/famous-places">Jaipur</Link></li>
            <li><Link to="/famous-places">Mumbai</Link></li>
            <li><Link to="/famous-places">Chennai</Link></li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <p>© {year} Traveler Record. All rights reserved.</p>
        <div className="footer-bottom-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Contact</a>
        </div>
      </div>
    </footer>
  );
}
