import { Link, useMatch, useResolvedPath } from "react-router-dom";
import logo from "../assets/logo.png"; 

export default function Navbar() {
  return (
    <nav className="nav">
      <Link to="/" className="site-title">
        <img src={logo} alt="VisionAbixo Logo" className="logo" />
        VisionAbixo
      </Link>
      <ul>
        <CustomLink to="/Service">Service</CustomLink>
        <CustomLink to="/About">About</CustomLink>
        <CustomLink to="/Help">Help</CustomLink>
      </ul>
    </nav>
  );
}

function CustomLink({ to, children }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to}>{children}</Link>
    </li>
  );
}
