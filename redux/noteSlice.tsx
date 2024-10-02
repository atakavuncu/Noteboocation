import { Note } from '@/data/Note';
import { db } from '../config/Firebase';
import { collection, addDoc, Timestamp, getDocs, doc, updateDoc } from "firebase/firestore";

const addNote = async (userId: string, title: string, description: string, date: Timestamp, categoryId: string) => {
    try {
        const notesRef = collection(db, 'users', userId, 'notes');
        await addDoc(notesRef, {
            title: title,
            description: description,
            date: date,
            category_id: categoryId,
            done_status: false,
        });
        console.log('Note added successfully!');
    } catch (error) {
        console.error('Error adding note: ', error);
    }
};

const addCategory = async (userId: string, name: string, color: string) => {
    try {
        const categoryRef = collection(db, 'users', userId, 'categories')
        await addDoc(categoryRef, {
            name: name,
            color: color
        })
        console.log('Category added successfully!')
    } catch (error) {
        console.error('Error adding category: ', error)
    }
};


export const getNotesById = async (userId: string): Promise<Note[]> => {
    try {
        const notesRef = collection(db, 'users', userId, 'notes');
        const notesSnapshot = await getDocs(notesRef);
        const notesList = notesSnapshot.docs.map(doc => ({
            noteId: doc.id,
            title: doc.data().title,
            description: doc.data().description,
            date: doc.data().date,
            categoryId: doc.data().categoryId,
            doneStatus: doc.data().doneStatus,
        }));
        console.log('Fetching notes')
        return notesList;
    } catch (error) {
        console.error("Error getting notes: ", error);
        return [];
    }
};


const getCategories = async (userId: string) => {
    try {
        const categoriesRef = collection(db, 'users', userId, 'categories')
        const categoriesSnapshot = await getDocs(categoriesRef)
        const categoriesList = categoriesSnapshot.docs.map(doc => ({
            categoryId: doc.id,
            ...doc.data(),
        }))
        return categoriesList
    } catch (error) {
        console.error('Error getting categories', error)
    }
}

const getNotesWithCategory = async (userId: string) => {
    const notesRef = collection(db, 'users', userId, 'notes')
    const notesSnapshot = await getDocs(notesRef)
    
    const notesList = [];

    // BU FONKSİYON DEĞİŞECEK !!!
    for (const doc of notesSnapshot.docs) {
      const noteData = doc.data();
      const categoryRef = noteData.category_id;
  
      const categorySnapshot = await categoryRef.get();
      const categoryData = categorySnapshot.data();
  
      notesList.push({
        note_id: doc.id,
        ...noteData,
        category_name: categoryData.name, // Kategorinin adını da ekliyoruz
        category_color: categoryData.color, // Kategorinin rengini de ekliyoruz
      });
    }
  
    return notesList;
};

export const toggleNoteCompletion = async (userId: string, noteId: string, currentStatus: boolean) => {
    try {
        const noteRef = doc(db, 'users', userId, 'notes', noteId);
        await updateDoc(noteRef, {
            doneStatus: !currentStatus,
        });
        console.log('Note status updated successfully!');
    } catch (error) {
        console.error('Error updating note status: ', error);
    }
};
  

