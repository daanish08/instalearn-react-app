import { NavLink } from "react-router-dom";
// import { useAuth } from "../../contexts/authContext";

// const { logout } = useAuth();

const generalMenus = [
  { path: "/", label: "Home" },
  { path: "/courses", label: "Courses" },
  { path: "/about", label: "About" },
  { path: "/contact", label: "Contact" },
  { path: "/admin/login", label: "Admin" },
  { path: "/user/login", label: "User" },
];

const userMenus = [
  { path: "/", label: "Home" },
  { path: "user/dashboard", label: "Dashboard" },
  { path: "/about", label: "About" },
  { path: "/contact", label: "Contact" },
  { path: "/profile", label: "Profile" },
  { path: "/", label: "Logout" },
];

const adminMenus = [
  { path: "/", label: "Home" },
  { path: "admin/dashboard", label: "Dashboard" },
  { path: "/admin/users", label: "Users" },
  { path: "/profile", label: "Profile" },
  { path: "/", label: "Logout" },
];

// const userRole="ADMIN"
const MenuList = ({ userRole }) => {
  const renderMenu = (menus) =>
    menus.map((item) => (
      <li key={item.path} className="nav-item">
        <NavLink
          className="nav-link text-white"
          aria-current="page"
          to={item.path}
        >
          {item.label}
        </NavLink>
      </li>
    ));

  return (
    <ul className="navbar-nav justify-content-end mb-2 ms-auto gap-4 mb-md-0">
      {userRole === "" || (userRole === null && renderMenu(generalMenus))}{" "}
      {userRole === "USER" && renderMenu(userMenus)}{" "}
      {userRole === "ADMIN" && renderMenu(adminMenus)}{" "}
    </ul>
  );
};

export default MenuList;
