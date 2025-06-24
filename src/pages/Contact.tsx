import Title from "../components/Title";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

const Contact = () => {
  useDocumentTitle("Contacto");
  return (
    <div className="container animate__animated animate__fadeInUp">
      <Title>Contacto</Title>

      <div className="row py-3">
        {/* Mapa */}
        <div className="col-md-6 mb-4">
          <iframe
            title="Mapa Gimnasio"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3347.690988083949!2d-60.64991392496989!3d-32.95916697358799!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95b7ab0c39161219%3A0x8a1492e9b9d22de6!2sUniversidad%20Austral%20Facultad%20de%20Ciencias%20Empresariales!5e0!3m2!1ses-419!2sar!4v1750388242240!5m2!1ses-419!2sar"
            width="100%"
            height="400"
            style={{ border: 0, borderRadius: "10px" }}
            loading="lazy"
            allowFullScreen></iframe>
        </div>

        {/* Datos de contacto */}
        <div className="col-md-6 d-flex flex-column justify-content-center">
          <p className="fs-5 mb-3">
            <i className="bi bi-geo-alt-fill me-2"></i>
            <strong>Dirección: </strong>
            <a href="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3347.692586811583!2d-60.65001972496992!3d-32.959124773588066!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95b7ab0c4772a28f%3A0xed15839dd0f50c48!2sParaguay%201950%2C%20S2000FZF%20Rosario%2C%20Santa%20Fe!5e0!3m2!1ses-419!2sar!4v1750781537211!5m2!1ses-419!2sar">
              Paraguay 1950
            </a>
          </p>

          <p className="fs-5 mb-3">
            <i className="bi bi-telephone-fill me-2"></i>
            <strong>Teléfono: </strong>
            <a href="tel:+543413602207" className="text-decoration-none">
              341-3602207
            </a>
          </p>

          <p className="fs-5 mb-3">
            <i className="bi bi-envelope-fill me-2"></i>
            <strong>Email: </strong>
            <a
              href="mailto:francoandresligorria190@gmail.com"
              className="text-decoration-none">
              francoandresligorria190@gmail.com
            </a>
          </p>

          <p className="fs-5 mb-2">
            <i className="bi bi-share-fill me-2"></i>
            <strong>Seguinos en nuestras redes:</strong>
          </p>

          <div>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mx-2"
              style={{ fontSize: "1.8rem" }}>
              <i className="bi bi-instagram"></i>
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mx-2"
              style={{ fontSize: "1.8rem" }}>
              <i className="bi bi-facebook"></i>
            </a>
            <a
              href="https://wa.me/543413602207"
              target="_blank"
              rel="noopener noreferrer"
              className="mx-2"
              style={{ fontSize: "1.8rem" }}>
              <i className="bi bi-whatsapp"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
