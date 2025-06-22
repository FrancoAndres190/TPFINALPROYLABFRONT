import { useState } from "react";
import { Modal, Button, Alert } from "react-bootstrap";
import { SERVER_URL } from "../../config";
import { useAuth } from "../../components/AuthContext";
import type { ClassItem } from "../../models/ClassItem";

interface CreateClassModalProps {
  show: boolean;
  onClose: () => void;
  onSave?: (newClass: ClassItem) => void; // 🚀 le paso la clase creada
}

const CreateClassModal = ({ show, onClose, onSave }: CreateClassModalProps) => {
  const { token } = useAuth();

  const [name, setName] = useState("");
  const [timec, setTimec] = useState("");
  const [descrip, setDescrip] = useState("");
  const [dispo, setDispo] = useState(true);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSave = async () => {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(`${SERVER_URL}/coach/classes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          timec,
          descrip,
          dispo,
        }),
      });

      // Esperamos la respuesta como JSON (ideal que backend la devuelva así)
      const result = await response.json();

      if (response.ok) {
        setMessage("Clase creada con éxito.");

        // 🚀 Le pasamos al padre la nueva clase creada
        onSave?.(result as ClassItem);

        setTimeout(() => {
          setMessage("");
          onClose();
        }, 500);
      } else {
        console.error("Error al crear clase:", result);
        setMessage(result?.message || "Error al crear clase.");
      }
    } catch (err) {
      console.error("Error al crear clase:", err);
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
        <Modal.Title>Crear Nueva Clase</Modal.Title>
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
            id="createClassNameInput"
            placeholder="Nombre de la clase"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="createClassNameInput" className="text-secondary">
            Nombre de la clase
          </label>
        </div>

        {/* Horario */}
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control bg-dark text-white"
            id="createClassTimeInput"
            placeholder="Horario"
            value={timec}
            onChange={(e) => setTimec(e.target.value)}
          />
          <label htmlFor="createClassTimeInput" className="text-secondary">
            Horario
          </label>
        </div>

        {/* Descripción */}
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control bg-dark text-white"
            id="createClassDescripInput"
            placeholder="Descripción"
            value={descrip}
            onChange={(e) => setDescrip(e.target.value)}
          />
          <label htmlFor="createClassDescripInput" className="text-secondary">
            Descripción
          </label>
        </div>

        {/* Disponible */}
        <div className="form-check mb-3">
          <input
            type="checkbox"
            className="form-check-input"
            id="createClassDispoCheckbox"
            checked={dispo}
            onChange={(e) => setDispo(e.target.checked)}
          />
          <label
            htmlFor="createClassDispoCheckbox"
            className="form-check-label text-secondary">
            Disponible
          </label>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose} disabled={loading}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSave} disabled={loading}>
          {loading ? "Creando..." : "Crear Clase"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateClassModal;

/* Descripción 
        <div className="form-floating mb-3">
          <textarea
            className="form-control bg-dark text-white"
            id="createClassDescripInput"
            placeholder="Descripción"
            value={descrip}
            onChange={(e) => setDescrip(e.target.value)}
            style={{ height: "100px" }}></textarea>
          <label
            htmlFor="createClassDescripInput"
            className="text-secondary bg-dark">
            Descripción
          </label>
        </div> */
