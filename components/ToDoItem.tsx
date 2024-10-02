import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { Colors } from "@/constants/Colors";
import React, { useState } from 'react';
import { Note } from "@/data/Note";

interface ToDoItemProps {
    task: Note;
    onToggleComplete: () => void;
}

const ToDoItem: React.FC<ToDoItemProps> = ({ task, onToggleComplete }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onToggleComplete} style={styles.touchableContainer}>
                {task.doneStatus ? (
                    <Ionicons name="checkmark-circle" size={20} style={styles.checkboxContainer} />
                ) : (
                    <Ionicons name="ellipse-outline" size={20} style={styles.checkboxContainer} />
                )}
                <View style={styles.titleBarContainer}>
                    <Text style={[styles.title, { textDecorationLine: task.doneStatus ? 'line-through' : 'none' }]}>
                        {task.title}
                    </Text>
                    <View style={styles.colorBarContainer}>
                        <View style={[styles.colorBar, { backgroundColor: '#2a88ff' }]} />
                        <View style={[styles.colorBar, { backgroundColor: '#ff00ff' }]} />
                    </View>
                    {isExpanded && (
                        <View style={styles.expandedContent}>
                            <Text style={styles.expandedText} numberOfLines={4} ellipsizeMode="tail">
                                {task.description}
                            </Text>
                            <TouchableOpacity style={styles.detailButton}>
                                <Text style={styles.detailButtonText}>Detaya Git</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleExpand}>
                <Ionicons
                    name={isExpanded ? 'chevron-up' : 'chevron-down'}
                    size={24}
                    color="black"
                    style={styles.icon}
                />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
        marginBottom: 10,
    },
    touchableContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        flex: 1,
    },
    checkboxContainer: {
        marginRight: 10,
        marginTop: 6,
        color: 'black',
    },
    titleBarContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        flex: 1,
    },
    title: {
        fontSize: 16,
        color: 'black',
    },
    colorBarContainer: {
        flexDirection: 'row',
        marginTop: 10,
    },
    colorBar: {
        width: 30,
        height: 4,
        borderRadius: 2,
        marginHorizontal: 2,
    },
    expandedContent: {
        marginTop: 10,
    },
    expandedText: {
        fontSize: 14,
        color: '#555',
    },
    detailButton: {
        marginTop: 10,
        backgroundColor: '#000',
        width: 'auto',
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 16,
        alignSelf: 'flex-end'
    },
    detailButtonText: {
        color: '#fff',
        fontSize: 12,
    },
    icon: {
        marginLeft: 10,
        marginTop: 6,
    },
});

export default ToDoItem;
