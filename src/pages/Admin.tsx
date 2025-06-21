import { useEffect, useState } from "react";
import { SERVER_URL } from "../config";
import { useAuth } from "../components/AuthContext";
import EditUserModal from "../components/EditUserModal";

interface Role {
  id: number;
  name: string;
}

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  tel: string;
  dni: string;
  roles: Role[];
  memberType: string;
}

export const Admin = () => {
  const { token } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [rolesList, setRolesList] = useState<Role[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filterText, setFilterText] = useState("");
  const [filterRole, setFilterRole] = useState("");

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // 🚀 fetchUsers para refrescar luego de editar
  const fetchUsers = async () => {
    if (!token) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${SERVER_URL}/admin/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Error al obtener usuarios");
      }
    } catch (err) {
      console.error("Error al obtener usuarios:", err);
      setError("Error de red");
    } finally {
      setLoading(false);
    }
  };

  // Cargar usuarios
  useEffect(() => {
    fetchUsers();
  }, [token]);

  // Cargar lista de roles
  useEffect(() => {
    const fetchRoles = async () => {
      if (!token) return;

      try {
        const response = await fetch(`${SERVER_URL}/admin/users/roles`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setRolesList(data);
        } else {
          console.error("Error al obtener roles");
        }
      } catch (err) {
        console.error("Error al obtener roles:", err);
      }
    };

    fetchRoles();
  }, [token]);

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setModalVisible(true);
  };

  const handleDelete = async (userId: number) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro que deseas eliminar este usuario?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(`${SERVER_URL}/admin/users/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
        console.log(`Usuario ${userId} eliminado.`);
      } else {
        const errorData = await response.json();
        alert(
          `Error al eliminar usuario: ${errorData.message || "error desconocido"}`
        );
      }
    } catch (err) {
      console.error("Error al eliminar usuario:", err);
      alert("Error de red al intentar eliminar usuario.");
    }
  };

  const filteredUsers = users.filter((user) => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    const email = user.email.toLowerCase();
    const matchesText =
      fullName.includes(filterText.toLowerCase()) ||
      email.includes(filterText.toLowerCase());

    const matchesRole =
      filterRole === "" || user.roles.some((role) => role.name === filterRole);

    return matchesText && matchesRole;
  });

  return (
    <div className="container mt-4 animate__animated animate__fadeInDown">
      <h2>Administrar Usuarios</h2>

      <div className="row mb-3">
        <div className="col-md-6 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por nombre o email..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
        </div>

        <div className="col-md-6 mb-2">
          <select
            className="form-select"
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}>
            <option value="">-- Filtrar por rol --</option>
            {rolesList.map((role) => (
              <option key={role.id} value={role.name}>
                {role.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading && <p>Cargando usuarios...</p>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && filteredUsers.length > 0 && (
        <table className="table table-striped mt-3">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>
                  {user.firstName} {user.lastName}
                </td>
                <td>{user.email}</td>
                <td>{user.roles.map((role) => role.name).join(", ")}</td>
                <td>
                  <button
                    className="btn btn-sm btn-primary me-2"
                    onClick={() => handleEdit(user)}>
                    Editar
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(user.id)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {!loading && filteredUsers.length === 0 && !error && (
        <p>No hay usuarios que coincidan con el filtro.</p>
      )}

      {/* Modal para editar usuario*/}
      {selectedUser && (
        <EditUserModal
          user={{
            userEmail: selectedUser.email,
            firstName: selectedUser.firstName,
            lastName: selectedUser.lastName,
            tel: selectedUser.tel,
            dni: selectedUser.dni,
            roles: selectedUser.roles,
            memberType: selectedUser.memberType,
          }}
          show={modalVisible}
          onClose={() => setModalVisible(false)}
          onSave={() => {
            fetchUsers();
            setModalVisible(false);
          }}
        />
      )}
    </div>
  );
};
