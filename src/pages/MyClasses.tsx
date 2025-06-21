import { useEffect, useState } from "react";
import { SERVER_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext";
import List from "../components/List";
import Title from "../components/Title";

/*const classes2: ClassItem[] = [
  {
    classID: 1,
    name: "Spinning",
    timec: "Lunes 18:00",
    dispo: true,
    descrip: "Clase de cardio en bicicleta.",
  },
  {
    classID: 2,
    name: "Funcional",
    timec: "Martes 19:30",
    dispo: true,
    descrip: "Entrenamiento funcional para todo el cuerpo.",
  },
  {
    classID: 3,
    name: "Yoga",
    timec: "Miércoles 17:00",
    dispo: false,
    descrip: "Clase de yoga para relajación y estiramiento.",
  },
  {
    classID: 4,
    name: "Crossfit",
    timec: "Jueves 20:00",
    dispo: true,
    descrip: "Entrenamiento de alta intensidad.",
  },
];
*/

//Declaracion para las clases
type ClassItem = {
  classID: number;
  name: string;
  timec: string;
  dispo: boolean;
  descrip: string;
};

const MyClasses = () => {
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const { token, isLoggedIn } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [actionClassID, setActionClassID] = useState<number | null>(null);
  const navigate = useNavigate();

  const fetchClasses = async () => {
    try {
      if (!isLoggedIn) {
        navigate("/login");
        return;
      }

      const response = await fetch(`${SERVER_URL}/user/users/myclasses`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      setClasses(data);
    } catch (err: unknown) {
      console.error("Error al obtener clases:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, [isLoggedIn, navigate, token]);

  const handleSelect = async (item: ClassItem) => {
    try {
      setActionClassID(item.classID); // Marcar la clase en acción

      const response = await fetch(
        `${SERVER_URL}/user/users/myclasses/${item.classID}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const result = await response.text();

      if (response.ok) {
        console.log("Clase eliminada:", result);

        // Eliminamos de la lista (más rápido que recargar)
        setClasses((prevClasses) =>
          prevClasses.filter((cls) => cls.classID !== item.classID)
        );
      } else {
        console.error("Error al quitarse de la clase:", result);
        alert("Error: " + result);
      }
    } catch (err) {
      console.error("Error en la petición:", err);
      alert("Error en la conexión al servidor.");
    } finally {
      setActionClassID(null);
    }
  };

  return (
    <div className="container mt-4">
      <Title>Mis clases</Title>

      {isLoading ? (
        <p className="text-center my-4">Cargando...</p>
      ) : classes.length === 0 ? (
        <p className="text-center my-4 animate__animated animate__bounce">
          No te has anotado a ninguna clase.
        </p>
      ) : (
        <List
          data={classes}
          quit={true}
          onQuit={handleSelect}
          actionClassID={actionClassID} // pasamos el id que se está procesando
        />
      )}
    </div>
  );
};

export default MyClasses;
