export type ClassItem = {
  classID: number;
  name: string;
  timec: string;
  dispo: boolean;
  descrip: string;
  coachId?: number;
  coachName?: string;

  maxCapacity: number | null;
  durationMinutes: number | null;
  createdAt: string | null;
};
