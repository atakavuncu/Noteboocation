import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import InputField from "@/components/InputField";
import Spacer, { spacerTypes } from "@/components/Spacer";
import AuthButton from "@/components/AuthButton";
import { Colors } from "@/constants/Colors";
import { useDispatch, useSelector } from "react-redux";
import { setEmail, setPassword, register } from "../../redux/userSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { useState } from "react";

export default function SignUpScreen({navigation}: {navigation: any}) {
    const [ confirmEmail, setConfirmEmail ] = useState("")
    const { email, password } = useSelector((state: RootState) => state.user)
    const dispatch = useDispatch<AppDispatch>()

    const handleRegister = () => {
        if (email && password) {
            if (email == confirmEmail) {
                dispatch(register({ email, password }));
            } else {
                Alert.alert("Hata", "Girilen E-posta adresleri uyuşmuyor.")
            }
        } else {
            Alert.alert("Hata", "E-posta ve parola alanları boş bırakılamaz.");
        }
    };

    return(
        <View style={styles.container}>
            <View>
                <Text style={styles.titleText}>
                    Kayıt Ol
                </Text>
                <Spacer spacerSize={40} spacerType={spacerTypes.vertical}/>
                <InputField
                    label="E-posta"
                    onChangeText={(email) => {dispatch(setEmail(email))}}
                />
                <Spacer spacerSize={20} spacerType={spacerTypes.vertical}/>
                <InputField
                    label="E-posta (tekrar)"
                    onChangeText={(email) => {setConfirmEmail(email)}}
                />
                <Spacer spacerSize={20} spacerType={spacerTypes.vertical}/>
                <InputField
                    label="Parola"
                    onChangeText={(password) => {dispatch(setPassword(password))}}
                    secureTextEntry = {true}
                />
                <Spacer spacerSize={40} spacerType={spacerTypes.vertical}/>
                <AuthButton 
                    buttonText="Kayıt Ol"
                    buttonColor={Colors.black}
                    buttonHoverColor={Colors.hoverBlack}
                    buttonTextColor={Colors.white}
                    onButtonPressed={handleRegister}/>
                <Spacer spacerSize={40} spacerType={spacerTypes.vertical}/>
                <View style={styles.textButton}>
                    <Pressable onPress={() => {navigation.navigate("login")}}>
                        <Text style={styles.textButtonText}>
                            Zaten bir hesabın var mı?
                        </Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        paddingHorizontal: 16,
        paddingVertical: 48,
    },
    titleText: {
        fontSize: 32,
        color: Colors.black,
        fontWeight: "bold"
    },
    textButton: {
        marginTop: 5,
        alignItems: "flex-end"
    },
    textButtonText: {
        color: Colors.black,
        textDecorationLine: "underline"
    }
})