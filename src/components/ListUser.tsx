import { useState } from "react";
import type { UserItem } from "../models/UserItem";

interface ListUserProps {
  data: UserItem[];
  onClick?: (user: UserItem) => void;
  onDelete?: (user: UserItem) => Promise<void>; // async
  actionUserID?: number | null; // para saber cuál está eliminando
}

const ListUser = ({ data, onClick, onDelete, actionUserID }: ListUserProps) => {
  const [confirmDeleteID, setConfirmDeleteID] = useState<number | null>(null);

  return (
    <div className="list-group d-grid gap-2 w-75 mx-auto bg-dark text-white">
      {data.map((user, i) => (
        <div
          key={user.userID}
          className="list-group-item animate__animated animate__fadeInDown d-flex justify-content-between align-items-center rounded-2 my-2 py-3 border bg-dark text-white"
          style={{
            animationDelay: `${i * 0.1}s`,
            cursor: onClick ? "pointer" : "default",
          }}
          onClick={() => onClick?.(user)}>
          <div>
            <strong>
              {user.firstName} {user.lastName}
            </strong>
            <div className="small opacity-50">{user.email}</div>
          </div>

          {onDelete && (
            <div className="ms-3 d-flex flex-column gap-2">
              {confirmDeleteID === user.userID ? (
                <>
                  <button
                    className="btn btn-sm btn-danger"
                    disabled={actionUserID === user.userID}
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete?.(user).then(() => {
                        setConfirmDeleteID(null);
                      });
                    }}>
                    {actionUserID === user.userID
                      ? "Eliminando..."
                      : "Confirmar"}
                  </button>
                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={(e) => {
                      e.stopPropagation();
                      setConfirmDeleteID(null);
                    }}>
                    Cancelar
                  </button>
                </>
              ) : (
                <button
                  className="btn btn-sm btn-danger"
                  onClick={(e) => {
                    e.stopPropagation();
                    setConfirmDeleteID(user.userID);
                  }}>
                  Eliminar
                </button>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ListUser;
