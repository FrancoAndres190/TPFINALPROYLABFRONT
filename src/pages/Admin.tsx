import { useEffect, useState } from "react";
import { SERVER_URL } from "../config";
import { useAuth } from "../components/AuthContext";
import EditUserModal from "../components/modals/EditUserModal";
import { toast } from "react-toastify";

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
  membershipPaidUntil: string;
  membershipActive: boolean;
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [payModalVisible, setPayModalVisible] = useState(false);
  const [payingUserId, setPayingUserId] = useState<number | null>(null);
  const [payMonths, setPayMonths] = useState(1);

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
        toast.error("Error al obtener usuarios");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      toast.error("Error al obtener usuarios.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [token]);

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
          toast.error("Error al obtener roles");
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        toast.error("Error al obtener roles.");
      }
    };

    fetchRoles();
  }, [token]);

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
        toast.success(`Usuario ${userId} eliminado.`);
      } else {
        const errorData = await response.json();
        toast.error(
          `Error al eliminar usuario: ${errorData.message || "error desconocido"}`
        );
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      toast.error("Error de red al intentar eliminar usuario.");
    }
  };

  const openPayModal = (userId: number) => {
    setPayingUserId(userId);
    setPayMonths(1);
    setPayModalVisible(true);
  };

  const handleConfirmPayMembership = async () => {
    if (!payingUserId) return;

    //Calculamos la fecha
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const paidUntil = new Date(today);
    paidUntil.setMonth(paidUntil.getMonth() + payMonths);

    const paidUntilStr = paidUntil.toISOString().split("T")[0];

    try {
      const response = await fetch(`${SERVER_URL}/admin/users/pay`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: payingUserId,
          membershipPaidUntil: paidUntilStr,
        }),
      });

      if (response.ok) {
        toast.success(`Pago registrado correctamente.`);
        fetchUsers();
      } else {
        const errorData = await response.json();
        toast.error(
          `Error al registrar pago: ${errorData.message || "error desconocido"}`
        );
      }
    } catch (err) {
      console.error("Error al registrar pago:", err);
      toast.error("Error de red al intentar registrar pago.");
    } finally {
      setPayModalVisible(false);
      setPayingUserId(null);
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
              <th>Mensualidad</th>
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
                  {user.membershipPaidUntil
                    ? `${user.membershipPaidUntil} (${
                        user.membershipActive ? "Activo" : "Vencido"
                      })`
                    : "Sin pago"}
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-danger me-2"
                    onClick={() => handleDelete(user.id)}>
                    Eliminar
                  </button>
                  <button
                    className="btn btn-sm btn-success"
                    onClick={() => openPayModal(user.id)}>
                    Registrar pago
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

      {payModalVisible && (
        <div className="modal show d-block" tabIndex={-1}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Registrar Pago</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setPayModalVisible(false)}></button>
              </div>
              <div className="modal-body">
                <label className="form-label">Cantidad de meses:</label>
                <select
                  className="form-select"
                  value={payMonths}
                  onChange={(e) => setPayMonths(parseInt(e.target.value))}>
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? "mes" : "meses"}
                    </option>
                  ))}
                </select>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setPayModalVisible(false)}>
                  Cancelar
                </button>
                <button
                  className="btn btn-primary"
                  onClick={handleConfirmPayMembership}>
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
