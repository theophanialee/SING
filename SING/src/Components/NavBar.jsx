import { Link } from "react-router-dom";

function NavBar() {
  return (
    <>
      <nav>
        <Link className="nav-link" to="/chart">
          HOT!
        </Link>
        <Link className="nav-link" to="/tracks">
          Tracks
        </Link>
        <Link className="nav-link" to="/artists">
          Vote Artists
        </Link>
        <Link className="nav-link" to="/mylists">
          My Lists
        </Link>
      </nav>
    </>
  );
}

export default NavBar;
