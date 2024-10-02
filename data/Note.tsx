import { Timestamp } from "firebase/firestore";

export interface Note {
    noteId: string;
    title: string;
    description: string;
    date: Timestamp;
    categoryId: string;
    doneStatus: boolean;
}