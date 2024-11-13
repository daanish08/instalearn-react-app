import { Link } from "react-router-dom";
import MenuList from "./menulist";

function Header() {
  return (
    <nav
      className="navbar navbar-expand-md  bg-navy fixed-top pt-3"
    >
      <div className="container-fluid ">
        <Link className="navbar-brand text-white" to="/">
          INSTA LEARN APP
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <MenuList></MenuList>
        </div>
      </div>
    </nav>
  );
}

export default Header;
