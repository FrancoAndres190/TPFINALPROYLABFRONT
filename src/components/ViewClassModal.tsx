import { Modal, Button } from "react-bootstrap";
import ListUser from "./ListUser";
import type { ClassItem } from "../models/ClassItem";
import type { UserItem } from "../models/UserItem";

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
        <div className="mb-3">
          <strong>Horario:</strong> {classInfo.timec}
        </div>
        <div className="mb-3">
          <strong>Descripción:</strong> {classInfo.descrip}
        </div>
        <div className="mb-3">
          <span
            className={`badge ${
              classInfo.dispo ? "bg-success" : "bg-secondary"
            }`}>
            {classInfo.dispo ? "Disponible" : "No disponible"}
          </span>
        </div>

        <hr />

        <h5>Usuarios en esta clase:</h5>
        <ListUser
          data={usersInClass}
          onDelete={onUserDelete}
          actionUserID={actionUserID}
        />
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
