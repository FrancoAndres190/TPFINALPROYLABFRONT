import type { ClassItem } from "./ClassItem";
import type { UserItem } from "./UserItem";

export interface ClassData extends ClassItem {
  users: UserItem[];
  coachId?: number;
  coachName?: string;
}
