import { useState, type FormEvent } from "react";
import { SERVER_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

const Register = () => {
  useDocumentTitle("Registro");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tel, setTel] = useState("");
  const [dni, setDni] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${SERVER_URL}/pub/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          tel,
          dni,
        }),
      });

      if (response.ok) {
        toast.success("Usuario creado correctamente");
        navigate("/login");
      } else {
        const data = await response.json();
        toast.error("Error al crear usuario: " + data.message);
      }
    } catch (error) {
      console.error("Error en el registro:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      className="form-signin w-100 m-auto text-center animate__animated animate__fadeInDown"
      style={{ maxWidth: "330px", padding: "1rem" }}>
      <form onSubmit={handleSubmit}>
        <img
          className="mb-4"
          src="https://cdn.worldvectorlogo.com/logos/jira-3.svg"
          alt="Logo GYM"
          width="72"
          height="57"
        />
        <h1 className="h3 mb-3 fw-normal">Registro de Usuario</h1>

        <div className="form-floating mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Nombre"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <label>Nombre</label>
        </div>

        <div className="form-floating mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Apellido"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <label>Apellido</label>
        </div>

        <div className="form-floating mb-2">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Email</label>
        </div>

        <div className="form-floating mb-2">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label>Password</label>
        </div>

        <div className="form-floating mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Teléfono"
            value={tel}
            onChange={(e) => setTel(e.target.value)}
            required
          />
          <label>Teléfono</label>
        </div>

        <div className="form-floating mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="DNI"
            value={dni}
            onChange={(e) => setDni(e.target.value)}
            required
          />
          <label>DNI</label>
        </div>

        <button
          className="w-100 btn btn-lg btn-primary"
          type="submit"
          disabled={loading}>
          {loading ? "Registrando..." : "Registrar"}
        </button>
      </form>
    </main>
  );
};

export default Register;
