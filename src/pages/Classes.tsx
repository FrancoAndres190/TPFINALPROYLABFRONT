import { useEffect, useState } from "react";
import { SERVER_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext";
import List from "../components/List";
import Title from "../components/Title";

//Declaracion para las clases
type ClassItem = {
  classID: number;
  name: string;
  timec: string;
  dispo: boolean;
  descrip: string;
};

const Classes = () => {
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const { token, isLoggedIn } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [actionClassID, setActionClassID] = useState<number | null>(null);

  const navigate = useNavigate();
  // Declaramos la función afuera para poder usarla después
  const fetchClasses = async () => {
    try {
      if (!isLoggedIn) {
        navigate("/login");
        return;
      }

      const response = await fetch(`${SERVER_URL}/user/classes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        navigate("/login");
        return;
      }

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
      setActionClassID(item.classID); // <- marcamos qué clase estamos procesando

      const response = await fetch(
        `${SERVER_URL}/user/users/addclass/${item.classID}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        }
      );

      const result = await response.text();

      if (response.ok) {
        console.log("Unido correctamente:", result);
        alert(result);

        // Quitamos la clase de la lista
        setClasses((prevClasses) =>
          prevClasses.filter((cls) => cls.classID !== item.classID)
        );
      } else {
        console.error("Error al unirse:", result);
        alert("Error: " + result);
      }
    } catch (error) {
      console.error("Error en la petición:", error);
      alert("Error en la conexión");
    } finally {
      // Siempre reseteamos el estado
      setActionClassID(null);
    }
  };

  return (
    <div className="container mt-4">
      <Title>Clases</Title>
      {isLoading ? (
        <p className="text-center my-4">Cargando...</p>
      ) : (
        <List
          data={classes}
          add={true}
          onAdd={handleSelect}
          actionClassID={actionClassID}
        />
      )}
    </div>
  );
};

export default Classes;
