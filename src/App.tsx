//mport Card, { CardBody } from "./components/Card";
//import List from "./components/List";

//const list = ["Franco", "Luciana", "Andrea", "Carlos", "Andres"];

import { ToastContainer } from "react-toastify";

import Footer from "./components/Footer";
import Header from "./components/Header";
import MyRoutes from "./router/Router";

//Etiqueta de componente principal
function App() {
  return (
    <div className="bg-dark text-white min-vh-100" data-bs-theme="dark">
      <Header />
      <MyRoutes />
      <ToastContainer position="top-center" autoClose={2000} theme="dark" />
      <Footer />
    </div>
  );
}

export default App;
