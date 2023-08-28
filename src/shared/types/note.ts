import { Timestamp } from "firebase/firestore";

export interface INote {
  id: string;
  title: string;
  content: string;
  created: Timestamp;
  updated: Timestamp;
  userId: string;
}
