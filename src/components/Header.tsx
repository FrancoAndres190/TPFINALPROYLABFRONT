import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import NavMenu from "./NavMenu";

const Header = () => {
  const { isLoggedIn, logout, roles, nombreUsuario } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Detectar rol principal
  let rolPrincipal = "";

  if (roles.includes("ROLE_ADMIN")) rolPrincipal = "ADMIN";
  else if (roles.includes("ROLE_COACH")) rolPrincipal = "PROFESOR";
  else if (roles.includes("ROLE_USER")) rolPrincipal = "USUARIO";

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm mb-4 sticky-top">
      <div className="container-fluid">
        {/* Logo */}
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <img
            src="https://cdn.worldvectorlogo.com/logos/jira-3.svg"
            alt="Logo GYM"
            width="40"
            height="40"
            className="me-2"
          />
          <span className="fw-bold fs-4">GYM APP</span>
        </Link>

        {/* Botón hamburguesa para móvil */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Contenido del navbar */}
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <NavMenu />
          </ul>

          {/* Botón usuario / Ingresar */}
          <div className="d-flex gap-2 align-items-center">
            {isLoggedIn ? (
              <div className="dropdown text-end">
                <button
                  className="btn btn-dark dropdown-toggle text-center"
                  type="button"
                  id="userDropdown"
                  data-bs-toggle="dropdown"
                  style={{ minWidth: "160px" }}
                  aria-expanded="false">
                  <div style={{ fontSize: "0.9rem", color: "#ccc" }}>
                    {nombreUsuario}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "#999" }}>
                    {rolPrincipal}
                  </div>
                </button>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="userDropdown">
                  <li>
                    <button className="dropdown-item" onClick={handleLogout}>
                      Cerrar sesión
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline-light">
                  Ingresar
                </Link>
                <Link to="/registrar" className="btn btn-primary">
                  Crear cuenta
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
