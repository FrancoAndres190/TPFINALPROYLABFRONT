// Declaración para las clases
type ClassItem = {
  classID: number;
  name: string;
  timec: string;
  dispo: boolean;
  descrip: string;
};

interface ListProps {
  data: ClassItem[];
  actionClassID?: number | null;
  onAdd?: (item: ClassItem) => void;
  onEdit?: (item: ClassItem) => void;
  onDelete?: (item: ClassItem) => void;
}

function List({ data, actionClassID, onAdd, onEdit, onDelete }: ListProps) {
  return (
    <div className="list-group d-grid gap-2 w-50 mx-auto">
      {data.map((item, i) => (
        <div
          key={item.classID}
          className="list-group-item animate__animated animate__fadeInDown d-flex justify-content-between align-items-center rounded-2 my-2 py-3 border"
          style={{ animationDelay: `${i * 0.2}s` }}>
          <div>
            <strong>{item.name}</strong> – {item.timec}
            <span className="d-block small opacity-50">{item.descrip}</span>
            <span
              className={`badge mt-1 ${
                item.dispo ? "bg-success" : "bg-secondary"
              }`}>
              {item.dispo ? "Disponible" : "No disponible"}
            </span>
          </div>

          <div
            className="ms-3 d-flex flex-column gap-2"
            style={{ cursor: "pointer" }}>
            {onAdd && (
              <button
                className="btn btn-sm btn-primary"
                disabled={actionClassID === item.classID}
                onClick={() => onAdd(item)}>
                {actionClassID === item.classID ? "Agregando..." : "Agregar"}
              </button>
            )}

            {onEdit && (
              <button
                className="btn btn-sm btn-warning"
                onClick={() => onEdit(item)}>
                Editar
              </button>
            )}

            {onDelete && (
              <button
                className="btn btn-sm btn-danger"
                disabled={actionClassID === item.classID}
                onClick={() => onDelete(item)}>
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
