import { useState } from "react";
import { SERVER_URL } from "../../config";
import { useAuth } from "../AuthContext";
import { Modal, Button, Alert } from "react-bootstrap";
import { toast } from "react-toastify";

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
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

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
        }),
      });

      if (response.ok) {
        toast.success("Cambios guardados con éxito.");
        onSave?.();
        setTimeout(() => {
          setMessage("");
          onClose();
        }, 1000);
      } else {
        toast.error("Error al guardar cambios.");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      toast.error("Error al editar usuario.");
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
