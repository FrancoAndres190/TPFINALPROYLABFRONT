import { useAuth } from "./AuthContext";
import { NavLink } from "react-router-dom";

const NavMenu = () => {
  const { roles, isLoggedIn } = useAuth();

  return (
    <>
      {/* Botones para todos */}

      <li className="nav-item">
        <NavLink className="nav-link mx-2" to="/">
          INICIO
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link mx-2" to="/contacto">
          CONTACTO
        </NavLink>
      </li>

      {/* Si está logueado */}
      {isLoggedIn && (
        <>
          <li className="nav-item">
            <NavLink className="nav-link mx-2" to="/clases">
              CLASES
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link mx-2" to="/misclases">
              MIS CLASES
            </NavLink>
          </li>
        </>
      )}

      {/* Si es COACH */}
      {isLoggedIn && roles.includes("ROLE_COACH") && (
        <>
          <li className="nav-item">
            <NavLink className="nav-link mx-2" to="/coach">
              PANEL PROFESOR
            </NavLink>
          </li>
        </>
      )}

      {/* Si es ADMIN */}
      {isLoggedIn && roles.includes("ROLE_ADMIN") && (
        <>
          <li className="nav-item">
            <NavLink className="nav-link mx-2" to="/admin">
              PANEL ADMIN
            </NavLink>
          </li>
        </>
      )}
    </>
  );
};

export default NavMenu;
