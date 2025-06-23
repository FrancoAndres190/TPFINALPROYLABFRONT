import { useEffect, useState } from "react";
import { SERVER_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext";
import List from "../components/List";
import Title from "../components/Title";
import CreateClassModal from "../components/modals/CreateClassModal";
import ViewClassModal from "../components/modals/ViewClassModal"; // ⬅️ tu modal de ver clase
import type { ClassItem } from "../models/ClassItem";
import type { UserItem } from "../models/UserItem";
import { toast } from "react-toastify";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

const CoachClasses = () => {
  useDocumentTitle("Panel para profesores");

  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [actionClassID, setActionClassID] = useState<number | null>(null);

  const [selectedClass, setSelectedClass] = useState<ClassItem | null>(null);
  const [usersInClass, setUsersInClass] = useState<UserItem[]>([]);
  const [viewModalVisible, setViewModalVisible] = useState(false);

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

  // Cuando clickeamos en una tarjeta
  const handleClick = async (item: ClassItem) => {
    try {
      // solo pedimos la lista de usuarios
      const response = await fetch(
        `${SERVER_URL}/coach/classes/userlist/${item.classID}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error al obtener usuarios de la clase");
      }

      const users: UserItem[] = await response.json();

      setSelectedClass(item); // info de la clase → ya la tenemos
      setUsersInClass(users); // usuarios que nos trajo
      setViewModalVisible(true); // mostrar modal
    } catch (err) {
      console.error("Error al obtener usuarios de la clase:", err);
      toast.error("Error al obtener usuarios de la clase.");
    }
  };

  const onDeleteUser = async (user: UserItem) => {
    if (!selectedClass) return;

    try {
      const response = await fetch(
        `${SERVER_URL}/coach/classes/userlist/${selectedClass.classID}/user/${user.userID}`,
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
        toast.success(result);

        setUsersInClass((prevUsers) =>
          prevUsers.filter((u) => u.userID !== user.userID)
        );
      } else {
        console.error("Error al eliminar usuario:", result);
        toast.error("Error: " + result);
      }
    } catch (err) {
      console.error("Error al eliminar usuario:", err);
      toast.error("Error al conectar con el servidor.");
    }
  };

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
        toast.success("Clase eliminada.");

        setClasses((prevClasses) =>
          prevClasses.filter((cls) => cls.classID !== item.classID)
        );
      } else {
        console.error("Error al eliminar clase:", result);
        toast.error("Error: " + result);
      }
    } catch (err) {
      console.error("Error al eliminar clase:", err);
      toast.error("Error al conectar con el servidor.");
    } finally {
      setActionClassID(null);
    }
  };

  return (
    <div className="container mt-4">
      <Title>Mis Clases Creadas</Title>

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
          onClick={handleClick}
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

      {viewModalVisible && selectedClass && (
        <ViewClassModal
          show={viewModalVisible}
          onClose={() => setViewModalVisible(false)}
          classInfo={selectedClass}
          usersInClass={usersInClass}
          onUserDelete={onDeleteUser}
          actionUserID={null}
        />
      )}
    </div>
  );
};

export default CoachClasses;
