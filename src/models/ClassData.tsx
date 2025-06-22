import type { ClassItem } from "./ClassItem";
import type { UserItem } from "./UserItem";

export interface ClassData extends ClassItem {
  users: UserItem[]; // Los usuarios que están en la clase
  coachId?: number;
  coachName?: string;
}
