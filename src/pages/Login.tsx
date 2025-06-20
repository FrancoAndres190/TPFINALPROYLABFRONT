import { useState, type FormEvent } from "react";
import { SERVER_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("a@a.com");
  const [password, setPassword] = useState("123");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login, roles } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${SERVER_URL}/pub/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        login(data.token);
        navigate("/clases");
        //console.log(`token ${data.token}`);
        console.log(roles);
      }
    } catch (error) {
      console.error("Error en el login:", error);
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
        <h1 className="h3 mb-3 fw-normal">BIENVENIDO</h1>
        <h1 className="h5 mb-3 fw-normal">Ingrese los datos de su cuenta.</h1>
        {error && <div className="alert alert-danger">{error}</div>}

        <div className="form-floating mb-2">
          <input
            type="email"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="floatingInput">Email address</label>
        </div>

        <div className="form-floating mb-2">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>

        <div className="checkbox mb-3">
          <label>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />{" "}
            Remember me
          </label>
        </div>

        <button
          className="w-100 btn btn-lg btn-primary"
          type="submit"
          disabled={loading}>
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </main>
  );
};

export default Login;
