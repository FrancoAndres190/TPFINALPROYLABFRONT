import type { ReactNode } from "react";

//Declarando la propiedad para pasar otro componente dentro de Card
interface CardProps {
  children: ReactNode;
}

//Card es una etiqueta de componente que representa una tarjeta de Bootstrap
function Card(props: CardProps) {
  const { children } = props;
  return (
    <div className="card" style={{ width: "18rem" }}>
      <div className="card-body">{children}</div>
    </div>
  );
}

//Declarando las propiedades que se le pueden pasar a CardBody
interface CardBodyProps {
  titulo: string;
  //Opcional
  texto?: string;
}
//CardBody es una etiqueta de componente que representa el contenido de la tarjeta
export function CardBody(props: CardBodyProps) {
  const { titulo, texto } = props;

  return (
    //La tarjeta <> vacia es un fragmento de React que permite agrupar elementos sin añadir nodos extra al DOM
    <>
      <h5 className="card-title">{titulo}</h5>
      <p className="card-text">{texto}</p>
    </>
  );
}

export default Card;
