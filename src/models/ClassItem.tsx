export type ClassItem = {
  classID: number;
  name: string;
  timec: string;
  dispo: boolean;
  descrip: string;
  coachId?: number;
  coachName?: string;
};

export const classes2: ClassItem[] = [
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
