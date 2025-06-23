import { useState } from "react";
import { Modal, Button, Alert } from "react-bootstrap";
import { SERVER_URL } from "../../config";
import { useAuth } from "../../components/AuthContext";
import type { ClassItem } from "../../models/ClassItem";
import { toast } from "react-toastify";

interface CreateClassModalProps {
  show: boolean;
  onClose: () => void;
  onSave?: (newClass: ClassItem) => void;
}

const CreateClassModal = ({ show, onClose, onSave }: CreateClassModalProps) => {
  const { token } = useAuth();

  const [name, setName] = useState("");
  const [timec, setTimec] = useState("7:00");
  const [descrip, setDescrip] = useState("");
  const [dispo, setDispo] = useState(true);
  const [maxCapacity, setMaxCapacity] = useState(10);
  const [durationMinutes, setDurationMinutes] = useState(60);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Opciones de horarios (7:00 a 23:00)
  const horas = [];
  for (let h = 7; h <= 23; h++) {
    horas.push(`${h}:00`);
  }

  const duraciones = [
    { label: "30 minutos", value: 30 },
    { label: "1 hora", value: 60 },
    { label: "1 hora 30 minutos", value: 90 },
    { label: "2 horas", value: 120 },
    { label: "2 horas 30 minutos", value: 150 },
    { label: "3 horas", value: 180 },
  ];

  // Capacidad (1 a 15)
  const cupos = [];
  for (let i = 1; i <= 15; i++) {
    cupos.push(i);
  }

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
          maxCapacity,
          durationMinutes,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Clase creada correctamente.");
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
          <select
            className="form-select bg-dark text-white"
            id="createClassTimeSelect"
            value={timec}
            onChange={(e) => setTimec(e.target.value)}>
            {horas.map((h, idx) => (
              <option key={idx} value={h}>
                {h} hs
              </option>
            ))}
          </select>
          <label htmlFor="createClassTimeSelect" className="text-secondary">
            Horario
          </label>
        </div>

        {/* Duración */}
        <div className="form-floating mb-3">
          <select
            className="form-select bg-dark text-white"
            id="createClassDurationSelect"
            value={durationMinutes}
            onChange={(e) => setDurationMinutes(parseInt(e.target.value))}>
            {duraciones.map((d) => (
              <option key={d.value} value={d.value}>
                {d.label}
              </option>
            ))}
          </select>
          <label htmlFor="createClassDurationSelect" className="text-secondary">
            Duración
          </label>
        </div>

        {/* Cupo máximo */}
        <div className="form-floating mb-3">
          <select
            className="form-select bg-dark text-white"
            id="createClassCupoSelect"
            value={maxCapacity}
            onChange={(e) => setMaxCapacity(parseInt(e.target.value))}>
            {cupos.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <label htmlFor="createClassCupoSelect" className="text-secondary">
            Cupo máximo (personas)
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
            Descripcion
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
