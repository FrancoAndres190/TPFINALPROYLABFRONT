import { useAuth } from "./AuthContext";
import { NavLink } from "react-router-dom";

const NavMenu = () => {
  const { roles, isLoggedIn } = useAuth();

  const isUser = roles.includes("ROLE_USER");
  const isCoach = roles.includes("ROLE_COACH");
  const isAdmin = roles.includes("ROLE_ADMIN");

  return (
    <>
      {/* Botones para todos */}
      <li className="nav-item">
        <NavLink className="nav-link" to="/">
          INICIO
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/contacto">
          CONTACTO
        </NavLink>
      </li>

      {/* Si esta logueado */}
      {isLoggedIn && (
        <>
          {/* Menu Clases con subitems */}
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false">
              CLASES
            </a>
            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <NavLink className="dropdown-item" to="/clases">
                  TODAS
                </NavLink>
              </li>
              {(isUser || isAdmin) && (
                <li>
                  <NavLink className="dropdown-item" to="/misclases">
                    MIS CLASES
                  </NavLink>
                </li>
              )}
              {(isCoach || isAdmin) && (
                <li>
                  <NavLink className="dropdown-item" to="/coach">
                    MIS CLASES CREADAS
                  </NavLink>
                </li>
              )}
            </ul>
          </li>

          {/* Boton Admin */}
          {isAdmin && (
            <li className="nav-item">
              <NavLink className="nav-link" to="/admin">
                USUARIOS
              </NavLink>
            </li>
          )}
        </>
      )}
    </>
  );
};

export default NavMenu;
