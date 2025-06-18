import { useEffect, useState } from "react";
import { SERVER_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext";

//Declaracion para las clases
type ClassItem = {
  classID: number;
  name: string;
  timec: string;
  dispo: boolean;
  descrip: string;
};

export const Classes = () => {
  //Hook de estados para manejar las clases
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const { token, isLoggedIn } = useAuth();

  //Hook para redireccionar
  const navigate = useNavigate();

  //Hook para pedir las clases al servidor
  useEffect(() => {
    //Funcion asincrona para obtener las clases
    const fetchClasses = async () => {
      try {
        if (!isLoggedIn) {
          navigate("/login");
          return;
        }

        //Pedimos las clases al servidor
        const response = await fetch(`${SERVER_URL}/user/classes`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        //Si falla, vamos al login
        if (!response.ok) {
          navigate("/login");
          return;
        }

        const data = await response.json();
        setClasses(data);
      } catch (err: unknown) {
        console.error("Error al obtener clases:", err);
      }
    };

    fetchClasses();
  }, []);

  return (
    <div className="list-group d-grid gap-2 w-50 mx-auto">
      {classes.map((item) => (
        <div
          key={item.classID}
          className="list-group-item rounded-2 my-2 py-3 border">
          <strong>{item.name}</strong> – {item.timec}
          <span className="d-block small opacity-50">{item.descrip}</span>
          <span className="badge bg-secondary mt-1">
            {item.dispo ? "Disponible" : "No disponible"}
          </span>
        </div>
      ))}
    </div>
  );
};

/* <div className="list-group w-75">
      <div className="list-group-item rounded-2 my-2 py-3">
        First item
        <span className="d-block small opacity-50">
          With support text underneath to add more detail
        </span>
      </div>

      <div className="list-group-item rounded-2 my-2 py-3">
        First item
        <span className="d-block small opacity-50">
          With support text underneath to add more detail
        </span>
      </div>

      <div className="list-group-item rounded-3 py-3 m-1">
        Second item
        <span className="d-block small opacity-50">
          Some other text goes here
        </span>
      </div>

      <div className="list-group-item rounded-3 py-3 text-muted">
        Third item (disabled)
        <span className="d-block small opacity-50">
          This option is disabled
        </span>
      </div>
    </div> */
