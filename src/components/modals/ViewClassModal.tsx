import { Modal, Button } from "react-bootstrap";
import ListUser from "../ListUser";
import type { ClassItem } from "../../models/ClassItem";
import type { UserItem } from "../../models/UserItem";

interface ViewClassModalProps {
  show: boolean;
  onClose: () => void;
  classInfo: ClassItem | null;
  usersInClass: UserItem[];
  onUserDelete?: (user: UserItem) => Promise<void>;
  actionUserID?: number | null;
}

const ViewClassModal = ({
  show,
  onClose,
  classInfo,
  usersInClass,
  onUserDelete,
  actionUserID,
}: ViewClassModalProps) => {
  if (!classInfo) return null;

  return (
    <Modal
      show={show}
      onHide={onClose}
      centered
      size="lg"
      backdrop="static"
      contentClassName="bg-dark text-white">
      <Modal.Header closeButton closeVariant="white">
        <Modal.Title>Clase: {classInfo.name}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {/* Horario */}
        <div className="mb-2">
          <strong>Horario:</strong> {classInfo.timec}
        </div>

        {/* Duración */}
        {classInfo.durationMinutes !== null && (
          <div className="mb-2">
            <strong>Duración:</strong> {classInfo.durationMinutes} min
          </div>
        )}

        {/* Cupo máximo */}
        {classInfo.maxCapacity !== null && (
          <div className="mb-2">
            <strong>Cupo máximo:</strong> {classInfo.maxCapacity} personas
          </div>
        )}

        {/* Coach */}
        <div className="mb-2">
          <strong>Coach:</strong> {classInfo.coachName}
        </div>

        {/* Fecha de creación */}
        {classInfo.createdAt && (
          <div className="mb-2">
            <strong>Creada:</strong>{" "}
            {new Date(classInfo.createdAt).toLocaleString()}
          </div>
        )}

        {/* Descripción */}
        <div className="mb-3">
          <strong>Descripción:</strong> {classInfo.descrip}
        </div>

        {/* Estado */}
        <div className="mb-3">
          <span
            className={`badge ${
              classInfo.dispo ? "bg-success" : "bg-secondary"
            }`}>
            {classInfo.dispo ? "Disponible" : "No disponible"}
          </span>
        </div>

        <hr />

        <h5>Usuarios:</h5>
        {usersInClass.length === 0 ? (
          <p className="text-center my-4 animate__animated animate__bounce">
            No hay usuarios anotados en esta clase.
          </p>
        ) : (
          <ListUser
            data={usersInClass}
            onDelete={onUserDelete}
            actionUserID={actionUserID}
          />
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewClassModal;
