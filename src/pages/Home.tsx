import { useNavigate } from "react-router-dom";
import Title from "../components/Title";

const Home = () => {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate("/registrar");
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

        <div className="col-md-6 text-start">
          <p className="fs-5">
            Con nuestra app GYM APP podés gestionar todas tus clases de manera
            fácil y rápida. Reservá, consultá horarios y seguí tu progreso, todo
            desde tu celular o computadora. ¡Entrená cuando quieras, donde
            quieras!
          </p>

          <button
            className="btn btn-primary btn-lg mt-3"
            onClick={handleRegister}>
            ¡Regístrate ahora!
          </button>
        </div>
      </div>
      <br></br>
      <br></br>
      <div className="row align-items-center mt-4 animate__animated animate__fadeInLeft">
        <div className="col-md-6 text-end">
          <p className="fs-5">
            En nuestro gimnasio encontrarás el mejor ambiente para entrenar, con
            clases para todos los niveles, entrenadores certificados y el
            equipamiento más completo.
          </p>
          <p className="fs-5">
            ¡Sumate hoy y comenzá tu transformación física y mental!
          </p>
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
