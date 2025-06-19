import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const Header = () => {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  console.log("Header isLoggedIn:", isLoggedIn);
  return (
    <header className="p-3 bg-dark">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
          {/* Logo */}
          <Link
            to="/"
            className="d-flex align-items-center mb-2 mb-md-0 text-decoration-none">
            <img
              className="bi me-2"
              src="https://cdn.worldvectorlogo.com/logos/jira-3.svg"
              alt="Logo GYM"
              width="40"
              height="40"
            />
            <h1 className="h3 bi me-2">GYM APP</h1>
          </Link>

          {/* Navegación */}
          <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
            <li>
              <Link to="/" className="nav-link px-2">
                Home
              </Link>
            </li>
            <li>
              <Link to="/features" className="nav-link px-2">
                Features
              </Link>
            </li>
            <li>
              <Link to="/pricing" className="nav-link px-2">
                Pricing
              </Link>
            </li>
            <li>
              <Link to="/faqs" className="nav-link px-2">
                FAQs
              </Link>
            </li>
            <li>
              <Link to="/about" className="nav-link px-2">
                About
              </Link>
            </li>
          </ul>

          {/* Botones */}
          <div className="text-end">
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
    </header>
  );
};

export default Header;
