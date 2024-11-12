import { NavLink } from "react-router-dom";

const MenuList = () => {
  return (
    <ul className="navbar-nav me-auto mb-2 mb-md-0">
      <li className="nav-item">
        <NavLink className="nav-link" aria-current="page" to="/">
          Home
        </NavLink>
      </li>

      <li className="nav-item">
        <NavLink className="nav-link" aria-current="page" to="/courses">
          Courses
        </NavLink>
      </li>

      <li className="nav-item">
        <NavLink className="nav-link" aria-current="page" to="/about">
          About
        </NavLink>
      </li>

      <li className="nav-item">
        <NavLink className="nav-link" aria-current="page" to="/contact">
          Contact
        </NavLink>
      </li>

      <li className="nav-item">
        <NavLink className="nav-link" aria-current="page" to="/admin">
          Admin
        </NavLink>
      </li>

      <li className="nav-item">
        <NavLink className="nav-link" aria-current="page" to="/user">
          User
        </NavLink>
      </li>
    </ul>
  );
};
export default MenuList;
