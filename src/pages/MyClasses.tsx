import { useEffect, useState } from "react";
import { SERVER_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext";
import List from "../components/List";
import Title from "../components/Title";

const classes2: ClassItem[] = [
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

//Declaracion para las clases
type ClassItem = {
  classID: number;
  name: string;
  timec: string;
  dispo: boolean;
  descrip: string;
};

const MyClasses = () => {
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
        const response = await fetch(`${SERVER_URL}/user/myclasses`, {
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
      }
    };

    fetchClasses();
  }, [isLoggedIn, navigate, token]);

  const handleSelect = (item: ClassItem) => {
    console.log("Clase seleccionada:", item);

    // Ejemplo: podrías hacer fetch, navegar, etc.
    // navigate(`/user/classes/${item.classID}`);
  };

  return (
    <div className="container mt-4">
      <Title>Mis clases</Title>

      {classes2.length === 0 ? (
        <p className="text-center my-4">No te has anotado a ninguna clase</p>
      ) : (
        <List data={classes2} quit={true} onQuit={handleSelect} />
      )}

      {classes.length === 0 ? (
        <p className="text-center my-4 animate__animated animate__bounce">
          No te has anotado a ninguna clase
        </p>
      ) : (
        <List data={classes} quit={true} onQuit={handleSelect} />
      )}
    </div>
  );
};

export default MyClasses;
