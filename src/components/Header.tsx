import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import NavMenu from "./NavMenu";

const Header = () => {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        {/* Logo */}
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <img
            src="https://cdn.worldvectorlogo.com/logos/jira-3.svg"
            alt="Logo GYM"
            width="40"
            height="40"
            className="me-2"
          />
          <h1 className="h4 m-0">GYM APP</h1>
        </Link>

        {/* Botón hamburguesa para móvil */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Contenido del navbar */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <NavMenu />
          </ul>

          {/* Botones */}
          <div className="d-flex">
            {isLoggedIn ? (
              <button className="btn btn-outline-light" onClick={handleLogout}>
                Cerrar sesión
              </button>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline-light me-2">
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
