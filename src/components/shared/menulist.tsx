import { NavLink } from "react-router-dom";

interface MenuListProps {
  userRole: string | undefined;
  onLogout: () => void;
}

interface IMenu {
  path: string;
  label: string;
}

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
  { path: "/user/dashboard", label: "Dashboard" },
  { path: "/about", label: "About" },
  { path: "/contact", label: "Contact" },
  { path: "/user/profile", label: "Profile" },
];

const adminMenus = [
  { path: "/", label: "Home" },
  { path: "/admin/dashboard", label: "Dashboard" },
  { path: "/admin/users", label: "Users" },
  { path: "/admin/profile", label: "Profile" },
];

const MenuList = ({ userRole, onLogout }: MenuListProps) => {
  const isActive = (path: string) => {
    return location.pathname === path
      ? "nav-link active fw-bolder text-info rounded-pill"
      : "nav-link fw-light text-white";
  };

  const renderMenu = (menus: IMenu[]) =>
    menus.map((item: IMenu) => (
      <li key={item.path} className="nav-item">
        <NavLink
          className={isActive(item.path)}
          aria-current="page"
          to={item.path}
        >
          {item.label}
        </NavLink>
      </li>
    ));

  return (
    <ul className="navbar-nav justify-content-end mb-2 ms-auto gap-2 mb-md-0">
      {(userRole === "" || userRole === null || userRole === undefined) &&
        renderMenu(generalMenus)}
      {userRole === "USER" && renderMenu(userMenus)}
      {userRole === "ADMIN" && renderMenu(adminMenus)}
      {userRole ? (
        <button className="btn text-white" onClick={onLogout}>
          Logout
        </button>
      ) : (
        ""
      )}
    </ul>
  );
};

export default MenuList;
