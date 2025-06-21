import { CreateClasses } from "../pages/CreateClasses";
import { Admin } from "../pages/Admin";
import Login from "../pages/Login";
import { Route, Routes } from "react-router-dom";
import Register from "../pages/Register";
import Classes from "../pages/Classes";
import MyClasses from "../pages/MyClasses";
import Home from "../pages/Home";
import Contact from "../pages/Contact";
import CoachClasses from "../pages/CoachClasses";

/*Ingresa a login o cualquier otra ruta y redirige a login/landing
  si no esta logueado, manda al login */

const MyRoutes = () => (
  <Routes>
    <Route path="/home" element={<Home />} />
    <Route path="/contacto" element={<Contact />} />
    <Route path="/clases" element={<Classes />} />
    <Route path="/registrar" element={<Register />} />
    <Route path="/crearclases" element={<CreateClasses />} />
    <Route path="/misclases" element={<MyClasses />} />
    <Route path="/admin" element={<Admin />} />
    <Route path="/coach" element={<CoachClasses />} />
    <Route path="/login" element={<Login />} />
    <Route path="*" element={<Home />} />
  </Routes>
);

export default MyRoutes;
