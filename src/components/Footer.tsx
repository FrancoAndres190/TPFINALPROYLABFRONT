const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white mt-5 py-4 align-items-center justify-content-center">
      <div className="container border-top py-4">
        <div className="container text-center">
          <div className="d-flex align-items-center justify-content-center">
            <h5 className="fw-bold mb-1">GymApp</h5>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white mx-2"
              style={{ fontSize: "1.5rem" }}>
              <i className="bi bi-instagram"></i>
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white mx-2"
              style={{ fontSize: "1.5rem" }}>
              <i className="bi bi-facebook"></i>
            </a>
            <a
              href="https://wa.me/123456789"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white mx-2"
              style={{ fontSize: "1.5rem" }}>
              <i className="bi bi-whatsapp"></i>
            </a>
          </div>
          <p className="mb-1 my-3 fst-italic">
            "Tu esfuerzo, tu cambio, tu mejor versión"
          </p>
          <small className="d-block my-1">&copy; {year} Franco Ligorria.</small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
