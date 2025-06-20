import { useNavigate } from "react-router-dom";
import Title from "../components/Title";

const Home = () => {
  const navigate = useNavigate();

  const handleVerClases = () => {
    navigate("/clases");
  };

  return (
    <div className="container mt-4">
      <Title>Bienvenido a GymApp</Title>
      <div className="row align-items-center mt-4 animate__animated animate__fadeInRight">
        <div className="col-md-6 mb-4 mb-md-0">
          <img
            src="https://www.2playbook.com/uploads/s1/39/92/82/lifter-crew-valencia-8_14_744x403.jpeg"
            alt="Gimnasio"
            className="img-fluid rounded-3 shadow-lg"
            style={{ maxHeight: "50vh", objectFit: "cover" }}
          />
        </div>

        <div className="col-md-6">
          <p className="fs-5">
            En nuestro gimnasio encontrarás el mejor ambiente para entrenar, con
            clases para todos los niveles, entrenadores certificados y el
            equipamiento más completo.
          </p>
          <p className="fs-5">
            ¡Sumate hoy y comenzá tu transformación física y mental!
          </p>

          <button
            className="btn btn-primary btn-lg mt-3"
            onClick={handleVerClases}>
            Ver clases
          </button>
        </div>
      </div>
      <div className="row align-items-center mt-4 animate__animated animate__fadeInLeft">
        <div className="col-md-6">
          <p className="fs-5">
            En nuestro gimnasio encontrarás el mejor ambiente para entrenar, con
            clases para todos los niveles, entrenadores certificados y el
            equipamiento más completo.
          </p>
          <p className="fs-5">
            ¡Sumate hoy y comenzá tu transformación física y mental!
          </p>

          <button
            className="btn btn-primary btn-lg mt-3"
            onClick={handleVerClases}>
            Ver clases
          </button>
        </div>

        <div className="col-md-6 mb-4 mb-md-0">
          <img
            src="https://fhinstitute.com/wp-content/uploads/2025/02/fitness-park-9-1536x1024.jpeg"
            alt="Gimnasio"
            className="img-fluid rounded-3 shadow-lg"
            style={{ maxHeight: "50vh", objectFit: "cover" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
