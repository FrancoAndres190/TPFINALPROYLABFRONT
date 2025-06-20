import { useEffect, useState } from "react";
import { SERVER_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext";
import List from "../components/List";
import Title from "../components/Title";
import CreateClassModal from "../components/CreateClassModal";
import type { ClassItem } from "../models/ClassItem";

const CoachClasses = () => {
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [actionClassID, setActionClassID] = useState<number | null>(null);

  const { token, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  // Obtener las clases del coach
  const fetchClasses = async () => {
    try {
      if (!isLoggedIn) {
        navigate("/login");
        return;
      }

      const response = await fetch(`${SERVER_URL}/coach/classes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error al obtener las clases");
      }

      const data = await response.json();
      setClasses(data);
    } catch (err) {
      console.error("Error al obtener clases del coach:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, [isLoggedIn, navigate, token]);

  // Eliminar clase
  const handleDelete = async (item: ClassItem) => {
    try {
      setActionClassID(item.classID);

      const response = await fetch(
        `${SERVER_URL}/coach/classes/${item.classID}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.text();

      if (response.ok) {
        console.log("Clase eliminada:", result);

        // 🚀 Remover la clase eliminada de la lista actual, sin recargar todo
        setClasses((prevClasses) =>
          prevClasses.filter((cls) => cls.classID !== item.classID)
        );
      } else {
        console.error("Error al eliminar clase:", result);
        alert("Error: " + result);
      }
    } catch (err) {
      console.error("Error al eliminar clase:", err);
      alert("Error al conectar con el servidor.");
    } finally {
      setActionClassID(null);
    }
  };

  return (
    <div className="container mt-4">
      <Title>Mis Clases (Coach)</Title>

      <div className="d-flex justify-content-center mb-3">
        <button
          className="btn btn-success"
          onClick={() => setModalVisible(true)}>
          Crear Nueva Clase
        </button>
      </div>

      {isLoading ? (
        <p className="text-center my-4">Cargando clases...</p>
      ) : classes.length === 0 ? (
        <p className="text-center my-4 animate__animated animate__bounce">
          No has creado ninguna clase.
        </p>
      ) : (
        <List
          data={classes}
          actionClassID={actionClassID}
          onDelete={handleDelete}
        />
      )}

      {modalVisible && (
        <CreateClassModal
          show={modalVisible}
          onClose={() => setModalVisible(false)}
          onSave={(newClass?: ClassItem) => {
            if (newClass) {
              setClasses((prevClasses) => [newClass, ...prevClasses]);
            }
            setModalVisible(false); // cerrar modal
          }}
        />
      )}
    </div>
  );
};

export default CoachClasses;
