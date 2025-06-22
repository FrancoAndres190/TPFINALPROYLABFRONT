import { useEffect, useState } from "react";
import { SERVER_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext";
import List from "../components/List";
import Title from "../components/Title";
import type { ClassItem } from "../models/ClassItem";

const Classes = () => {
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const { token, isLoggedIn } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [actionClassID, setActionClassID] = useState<number | null>(null);

  const [filterText, setFilterText] = useState(""); // NUEVO: filtro

  const navigate = useNavigate();

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
        console.log(response);
        navigate("/login");
        return;
      }

      const data = await response.json();
      console.log(data);
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
      setActionClassID(item.classID);

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
      setActionClassID(null);
    }
  };

  // Aplicamos el filtro (insensible a mayúsculas/minúsculas)
  const filteredClasses = classes.filter((cls) =>
    cls.name.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <Title>Clases</Title>

      {isLoading ? (
        <p className="text-center my-4">Cargando...</p>
      ) : (
        <>
          {/* INPUT PARA FILTRO */}
          <div className="mb-3 text-center">
            <input
              type="text"
              className="form-control w-50 mx-auto"
              placeholder="Buscar clase..."
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
            />
          </div>
          <List
            data={filteredClasses}
            onAdd={handleSelect}
            actionClassID={actionClassID}
          />
        </>
      )}
    </div>
  );
};

export default Classes;
