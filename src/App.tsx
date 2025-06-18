//mport Card, { CardBody } from "./components/Card";
//import List from "./components/List";

//const list = ["Franco", "Luciana", "Andrea", "Carlos", "Andres"];

import Footer from "./components/Footer";
import Header from "./components/Header";
import MyRoutes from "./router/Router";

//Etiqueta de componente principal
function App() {
  return (
    <div className="bg-dark text-white min-vh-100" data-bs-theme="dark">
      <Header />
      <MyRoutes />
      <Footer />
    </div>
  );
}

export default App;

/* <Card>
      <CardBody
        titulo={"Prueba de Titulo"}
        texto={"Esta es una prueba de componente de tarjeta."}
      />
      {/* Se muestra el contenido de la lista solo si tiene elementos}
      {list.length !== 0 && <List data={list} onSelect={handleSelect} />}
    </Card> */

/*Funcion para manejar el click en un elemento de la lista, pasada como prop a List
  const handleSelect = (elemento: string) =>  {
    console.log(`Elemento seleccionado: ${elemento}`);
  };*/

/*//Si la lista tiene elementos, se muestra el componente List (forma ternaria)
  const contenido = list.length ? (
    <List data={list} onSelect={handleSelect} />
  ) : (
    <p>No hay elementos en la lista</p>
  );

  //Si la lista tiene elementos, se muestra el componente List (forma condicional)
  const contenido2 = list.length !== 0 && (
    <List data={list} onSelect={handleSelect} />
  );*/
