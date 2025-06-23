import { useEffect, useState } from "react";
import { SERVER_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext";
import List from "../components/List";
import Title from "../components/Title";
import type { ClassItem } from "../models/ClassItem";
import ViewClassModal from "../components/modals/ViewClassModal";

const MyClasses = () => {
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const { token, isLoggedIn } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [actionClassID, setActionClassID] = useState<number | null>(null);
  const [filterText, setFilterText] = useState(""); // FILTRO

  const [selectedClass, setSelectedClass] = useState<ClassItem | null>(null);
  const [viewModalVisible, setViewModalVisible] = useState(false);

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

  const handleClick = (item: ClassItem) => {
    setSelectedClass(item);
    setViewModalVisible(true);
  };

  const handleSelect = async (item: ClassItem) => {
    try {
      setActionClassID(item.classID);

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

  // Filtro por nombre
  const filteredClasses = classes.filter((cls) =>
    cls.name.toLowerCase().includes(filterText.toLowerCase())
  );

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
        <>
          {/* INPUT PARA FILTRAR */}
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
            key={filterText} // para re-animar
            data={filteredClasses}
            onDelete={handleSelect}
            onClick={handleClick}
            actionClassID={actionClassID}
          />

          <ViewClassModal
            show={viewModalVisible}
            onClose={() => setViewModalVisible(false)}
            classInfo={selectedClass}
          />
        </>
      )}
    </div>
  );
};

export default MyClasses;
