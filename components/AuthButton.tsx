import { Colors } from "@/constants/Colors"
import { Pressable, Text, StyleSheet } from "react-native"

const AuthButton = ({ buttonColor, buttonHoverColor, buttonText, buttonTextColor, onButtonPressed }:
    { buttonColor: string, buttonHoverColor: string, buttonText: string, buttonTextColor: string, onButtonPressed: () => void }) => {
    return (
        <Pressable style={({ pressed }) => [styles.button, {backgroundColor: pressed ? buttonHoverColor : buttonColor}]} onPress={onButtonPressed}>
            <Text style={[styles.buttonTextStyle, {color: buttonTextColor}]}>
                {buttonText}
            </Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        height: 50,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonTextStyle: {
        fontWeight: "bold"
    }
})

export default AuthButton