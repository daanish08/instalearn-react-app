import { NavLink } from "react-router-dom";

const MenuList = () => {
  return (
    <ul className="navbar-nav justify-content-end mb-2 ms-auto gap-4 mb-md-0">
      <li className="nav-item ">
        <NavLink className="nav-link text-white" aria-current="page" to="/">
          Home
        </NavLink>
      </li>

      <li className="nav-item">
        <NavLink className="nav-link text-white" aria-current="page" to="/courses">
          Courses
        </NavLink>
      </li>

      <li className="nav-item">
        <NavLink className="nav-link text-white" aria-current="page" to="/about">
          About
        </NavLink>
      </li>

      <li className="nav-item">
        <NavLink className="nav-link text-white" aria-current="page" to="/contact">
          Contact
        </NavLink>
      </li>

      <li className="nav-item">
        <NavLink className="nav-link text-white" aria-current="page" to="/admin/login">
          Admin
        </NavLink>
      </li>

      <li className="nav-item">
        <NavLink className="nav-link text-white" aria-current="page" to="/user/login">
          User
        </NavLink>
      </li>
    </ul>
  );
};
export default MenuList;
