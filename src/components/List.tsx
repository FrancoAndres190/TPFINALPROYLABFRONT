import { useState } from "react";

//Declaracion de las props
interface ListProps {
  data: string[];

  //Funcion opcional que se ejecuta al seleccionar un elemento de la lista
  onSelect?: (elemento: string) => void;
}

//Componente List que recibe un array de strings y muestra una lista
function List({ data, onSelect }: ListProps) {
  //Estado para manejar el elemento seleccionado
  const [index, setIndex] = useState(-1);

  //Funcion para manejar el click en un elemento de la lista
  const handleClick = (i: number, elemento: string) => {
    //Se actualiza el estado del elemento seleccionado
    setIndex(i);

    //Si existe la funcion onSelect, se llama con el elemento seleccionado
    onSelect?.(elemento);

    //console.log(`Elemento seleccionado: ${data[i]}`);
  };

  return (
    <ul className="list-group">
      {/* Se mapea el array de strings y se crea un elemento li por cada uno */}
      {data.map((elemento, i) => (
        <li
          /*Se asigna la funcion handleClick al evento onClick del elemento li */
          onClick={() => handleClick(i, elemento)}
          key={elemento}
          /*Se asigna la clase active si el elemento es el seleccionado*/
          className={`list-group-item ${index == i ? "active" : ""}`}>
          {elemento}
        </li>
      ))}
    </ul>
  );
}

export default List;
