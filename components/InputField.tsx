import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { TextInput, Button } from 'react-native-paper';
import { Colors } from "@/constants/Colors";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from "react";


const InputField = ({ label, onChangeText, secureTextEntry = false }: 
    { label: string, onChangeText: (text: string) => void, secureTextEntry?: boolean }) => {

    const [isPasswordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!isPasswordVisible);
    };

    return (
        <View style={styles.container}>
            <TextInput
                label={label}
                underlineColor="transparent"
                activeUnderlineColor={Colors.darkYellow}
                style={styles.textInput}
                onChangeText={onChangeText}
                secureTextEntry = {secureTextEntry ? !isPasswordVisible : false}
            />
            {
                secureTextEntry 
                ? <TouchableOpacity onPress={togglePasswordVisibility} style={styles.iconContainer} activeOpacity={1}>
                        <Ionicons
                            name = {isPasswordVisible ? "eye-off" : "eye"}
                            size={24}
                            color="gray"
                        />
                    </TouchableOpacity>
                : <View></View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
        borderColor: Colors.beige,
        borderWidth: 1,
        borderRadius: 5,
    },
    textInput: {
        backgroundColor: Colors.beige,
        flex: 1,
        borderRadius: 5,
    },
    input: {
        flex: 1,
        height: 40,
        fontSize: 16,
    },
    iconContainer: {
        backgroundColor: Colors.beige,
        padding: 16,
    },
})

export default InputField