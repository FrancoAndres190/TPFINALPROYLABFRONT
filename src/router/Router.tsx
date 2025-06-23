import { Admin } from "../pages/Admin";
import Login from "../pages/Login";
import { Route, Routes } from "react-router-dom";
import Register from "../pages/Register";
import Classes from "../pages/Classes";
import MyClasses from "../pages/MyClasses";
import Home from "../pages/Home";
import Contact from "../pages/Contact";
import CoachClasses from "../pages/CoachClasses";
import ProtectedRoute from "../components/ProtectedRouter";

const MyRoutes = () => (
  <Routes>
    {/* Rutas publicas */}
    <Route path="/home" element={<Home />} />
    <Route path="/contacto" element={<Contact />} />
    <Route path="/registrar" element={<Register />} />
    <Route path="/login" element={<Login />} />

    {/* Rutas autenticadas */}
    <Route
      path="/clases"
      element={
        <ProtectedRoute>
          <Classes />
        </ProtectedRoute>
      }
    />
    <Route
      path="/misclases"
      element={
        <ProtectedRoute>
          <MyClasses />
        </ProtectedRoute>
      }
    />

    {/* Rutas ROLE_COACH */}
    <Route
      path="/coach"
      element={
        <ProtectedRoute allowedRoles={["ROLE_COACH"]}>
          <CoachClasses />
        </ProtectedRoute>
      }
    />

    {/* Rutas ROLE_ADMIN */}
    <Route
      path="/admin"
      element={
        <ProtectedRoute allowedRoles={["ROLE_ADMIN"]}>
          <Admin />
        </ProtectedRoute>
      }
    />

    {/* Lo demas va al homee */}
    <Route path="*" element={<Home />} />
  </Routes>
);

export default MyRoutes;
