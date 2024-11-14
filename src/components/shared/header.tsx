import { Link } from "react-router-dom";
import MenuList from "./menulist";
import { useAuth } from "../../contexts/authContext";

function Header() {


  const { user, logout } = useAuth();


  const userRole = user?.role;
  console.log(userRole);
  
  return (
    <nav
      className="navbar navbar-expand-md  bg-navy fixed-top pt-2"
    >
      <div className="container-fluid ">
        <Link className="navbar-brand text-white ps-3" to="/">
         <img className="rounded"  width="100" height="60" src="/src/assets/image/logo.png"/>
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
          <MenuList userRole={userRole} onLogout={logout}/>
        </div>
      </div>
    </nav>
  );
}

export default Header;
