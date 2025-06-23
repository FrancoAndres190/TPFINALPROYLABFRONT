import type { ClassItem } from "../models/ClassItem";
import { useAuth } from "./AuthContext";

interface ListProps {
  data: ClassItem[];
  actionClassID?: number | null;
  onAdd?: (item: ClassItem) => void;
  onEdit?: (item: ClassItem) => void;
  onDelete?: (item: ClassItem) => void;
  onClick?: (item: ClassItem) => void;
}

function List({
  data,
  actionClassID,
  onAdd,
  onEdit,
  onDelete,
  onClick,
}: ListProps) {
  const { roles } = useAuth();
  const isUser = roles.includes("ROLE_USER");

  return (
    <div
      style={{
        cursor: onClick ? "pointer" : "default",
      }}
      className="list-group d-grid gap-2 w-50 mx-auto">
      {data.map((item, i) => (
        <div
          key={item.classID}
          onClick={() => onClick?.(item)}
          className="list-group-item animate__animated animate__fadeInDown d-flex justify-content-between align-items-center rounded-2 my-2 py-3 border"
          style={{ animationDelay: `${i * 0.2}s` }}>
          <div>
            <span className="me-2">
              <strong>{item.name}</strong> – {item.timec}hs
            </span>
            <span
              className={`badge ${item.dispo ? "bg-success" : "bg-secondary"}`}>
              {item.dispo ? "Disponible" : "No disponible"}
            </span>

            {/*El profesor no ve su nombre en sus clases*/}
            {(isUser || (!isUser && !!onAdd)) && (
              <div className="d-block small">Profesor: {item.coachName}</div>
            )}

            {item.maxCapacity !== null && (
              <div className="d-block small">Cupos: {item.maxCapacity}</div>
            )}

            {item.durationMinutes !== null && (
              <div className="d-block small">
                Duración: {item.durationMinutes} minutos
              </div>
            )}
          </div>

          <div className="ms-3 d-flex flex-column gap-2">
            {onAdd && isUser && (
              <button
                className="btn btn-sm btn-primary"
                disabled={actionClassID === item.classID}
                onClick={(e) => {
                  e.stopPropagation();
                  onAdd(item);
                }}>
                {actionClassID === item.classID ? "Agregando..." : "Agregar"}
              </button>
            )}

            {onEdit && (
              <button
                className="btn btn-sm btn-warning"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(item);
                }}>
                Editar
              </button>
            )}

            {onDelete && (
              <button
                className="btn btn-sm btn-danger"
                disabled={actionClassID === item.classID}
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(item);
                }}>
                {actionClassID === item.classID ? "Borrando..." : "Borrar"}
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default List;
