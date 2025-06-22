import { useState, useEffect } from "react";
import { SERVER_URL } from "../../config";
import { useAuth } from "../AuthContext";
import { Modal, Button, Alert, Form } from "react-bootstrap";

type Role = {
  id: number;
  name: string;
};

type User = {
  userEmail: string;
  firstName: string;
  lastName: string;
  tel: string;
  dni: string;
  roles: Role[];
  memberType: string;
};

interface EditUserModalProps {
  user: User;
  show: boolean;
  onClose: () => void;
  onSave?: () => void;
}

const EditUserModal = ({ user, show, onClose, onSave }: EditUserModalProps) => {
  const { token } = useAuth();

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [tel, setTel] = useState(user.tel);
  const [dni, setDni] = useState(user.dni);
  const [memberType, setMemberType] = useState(user.memberType);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [memberTypes, setMemberTypes] = useState<string[]>([
    "Premium",
    "Básico",
    "VIP",
  ]);

  // 🚀 fetch lista de membresías
  useEffect(() => {
    const fetchMemberTypes = async () => {
      try {
        const response = await fetch(`${SERVER_URL}/admin/membertypes`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setMemberTypes(data);
        } else {
          console.warn("No se pudo obtener lista de membresías, usando demo");
        }
      } catch (err) {
        console.error("Error al obtener memberTypes:", err);
      }
    };

    fetchMemberTypes();
  }, [token]);

  const handleSave = async () => {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(`${SERVER_URL}/admin/users`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userEmail: user.userEmail,
          firstName,
          lastName,
          tel,
          dni,
          memberType,
        }),
      });

      if (response.ok) {
        setMessage("Cambios guardados con éxito.");
        onSave?.();
        setTimeout(() => {
          setMessage("");
          onClose();
        }, 1000);
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || "Error al guardar cambios.");
      }
    } catch (err) {
      console.error("Error al editar usuario:", err);
      setMessage("Error de red.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      show={show}
      onHide={onClose}
      centered
      backdrop="static"
      contentClassName="bg-dark text-white">
      <Modal.Header closeButton closeVariant="white">
        <Modal.Title>Editar Usuario</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {message && (
          <Alert variant="info" className="text-center">
            {message}
          </Alert>
        )}

        {/* Nombre */}
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control bg-dark text-white"
            id="editFirstNameInput"
            placeholder="Nombre"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <label htmlFor="editFirstNameInput" className="text-secondary">
            Nombre
          </label>
        </div>

        {/* Apellido */}
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control bg-dark text-white"
            id="editLastNameInput"
            placeholder="Apellido"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <label htmlFor="editLastNameInput" className="text-secondary">
            Apellido
          </label>
        </div>

        {/* Teléfono */}
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control bg-dark text-white"
            id="editTelInput"
            placeholder="Teléfono"
            value={tel}
            onChange={(e) => setTel(e.target.value)}
          />
          <label htmlFor="editTelInput" className="text-secondary">
            Teléfono
          </label>
        </div>

        {/* DNI */}
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control bg-dark text-white"
            id="editDniInput"
            placeholder="DNI"
            value={dni}
            onChange={(e) => setDni(e.target.value)}
          />
          <label htmlFor="editDniInput" className="text-secondary">
            DNI
          </label>
        </div>

        {/* Membresía */}
        <div className="mb-3">
          <label
            htmlFor="editMemberTypeSelect"
            className="form-label text-secondary fw-bold">
            Membresía
          </label>
          <Form.Select
            className="form-select bg-dark text-white"
            id="editMemberTypeSelect"
            value={memberType}
            onChange={(e) => setMemberType(e.target.value)}>
            <option value="">Seleccionar membresía</option>
            {memberTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </Form.Select>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose} disabled={loading}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSave} disabled={loading}>
          {loading ? "Guardando..." : "Guardar cambios"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditUserModal;
