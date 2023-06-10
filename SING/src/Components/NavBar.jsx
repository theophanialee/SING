import { Link } from "react-router-dom";

function NavBar() {
  return (
    <>
      <nav>
        <Link className="nav-link" to="/chart">
          Chart
        </Link>
        <Link className="nav-link" to="/tracks">
          Tracks
        </Link>
        <Link className="nav-link" to="/artists">
          Artists
        </Link>
        <Link className="nav-link" to="/mylists">
          My List
        </Link>
      </nav>
    </>
  );
}

export default NavBar;
