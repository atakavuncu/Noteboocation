import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import ToDoItem from "@/components/ToDoItem";
import { Ionicons } from "@expo/vector-icons";
import { getNotesById, toggleNoteCompletion } from "@/redux/noteSlice";
import { Note } from "@/data/Note";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const HomeScreen = () => {
  const [tasks, setTasks] = useState<Note[]>([]);
  const [completedTasks, setCompletedTasks] = useState<Note[]>([]);

  const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
  const userId = useTypedSelector((state) => state.user.userId);

  useEffect(() => {
    const fetchNotes = async () => {
      if (userId) {
        try {
          const fetchedNotes = await getNotesById(userId);
  
          const activeTasks = fetchedNotes.filter(note => !note.doneStatus);
          const completed = fetchedNotes.filter(note => note.doneStatus);
  
          setTasks(activeTasks);
          setCompletedTasks(completed);
        } catch (error) {
          console.error("Error fetching notes: ", error);
        }
      }
    };
  
    fetchNotes();
  }, [userId]);
  

  const handleToggleTaskComplete = async (task: Note)  => {
    if(userId){
      try {
        await toggleNoteCompletion(userId, task.noteId, task.doneStatus);
        if (task.doneStatus) {
            setCompletedTasks(prevCompletedTasks => prevCompletedTasks.filter(t => t.noteId !== task.noteId));
            setTasks(prevTasks => [...prevTasks, { ...task, doneStatus: !task.doneStatus }]);
        } else {
            setTasks(prevTasks => prevTasks.filter(t => t.noteId !== task.noteId));
            setCompletedTasks(prevCompletedTasks => [...prevCompletedTasks, { ...task, doneStatus: !task.doneStatus }]);
        }
      } catch (error) {
        console.error('Error toggling task: ', error)
      }
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.dateRow}>
          <Text style={styles.dateText}>3 Eylül 2024</Text>
          <TouchableOpacity style={styles.dateButton}>
            <Ionicons name="calendar-outline" style={styles.dateButtonIcon} size={14}/>
            <Text style={styles.dateButtonText}>Tarih Değiştir</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.filterContainer}>
          <TouchableOpacity style={styles.filterButton}><Text style={styles.filterText}>Hepsi</Text></TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}><Text style={styles.filterText}>İş</Text></TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}><Text style={styles.filterText}>Spor</Text></TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}><Text style={styles.filterText}>Kitap</Text></TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}><Text style={styles.filterText}>Yazılım</Text></TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}><Text style={styles.filterText}>Sanat</Text></TouchableOpacity>
        </ScrollView>
      </View>

      <ScrollView style={styles.todoContainer}>
        <View style={styles.todoTitle}>
          <Text style={styles.sectionTitle}>Yapılacak</Text>
          <TouchableOpacity style={styles.addTaskButton}>
            <Text style={styles.addTaskButtonText}>+  Görev Ekle</Text>
          </TouchableOpacity>
        </View>
        {tasks.map((task, index) => (
          <ToDoItem
            key={index}
            task={task}
            onToggleComplete={() => handleToggleTaskComplete(task)}
          />
        ))}

        <Text style={styles.sectionTitle}>Tamamlandı</Text>
        {completedTasks.map((task, index) => (
          <ToDoItem
            key={index}
            task={task}
            onToggleComplete={() => handleToggleTaskComplete(task)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  dateText: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  dateButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginStart: 10,
    borderRadius: 16,
  },
  dateButtonIcon: {
    color: '#333',
    paddingEnd: 5
  },
  dateButtonText: {
    color: '#333',
    fontSize: 12,
    fontWeight: 'bold',
  },
  filterContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#ddd',
    borderRadius: 16,
    marginRight: 8,
  },
  filterText: {
    color: '#333',
  },
  todoContainer: {
    paddingHorizontal: 20,
  },
  todoTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  addTaskButton: {
    marginVertical: 20,
    backgroundColor: '#000',
    width: 'auto',
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 16,
    alignSelf: 'flex-end'
  },
  addTaskButtonText: {
    color: '#fff',
    fontSize: 12,
  },
  completedContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 20
  },
});

export default HomeScreen;
