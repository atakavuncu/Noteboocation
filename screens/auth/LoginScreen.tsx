import { Text, View, StyleSheet, Pressable, Alert } from "react-native";
import WrittenLogo from '../../components/WrittenLogo';
import '@emotion/styled';
import '@emotion/react';
import { Colors } from "@/constants/Colors";
import InputField from "@/components/InputField";
import Spacer, { spacerTypes } from "@/components/Spacer";
import AuthButton from "@/components/AuthButton";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { setEmail, setPassword, login, autoLogin } from "../../redux/userSlice";
import { useEffect, useState } from "react";
import LoadingScreen from "../LoadingScreen";

export default function LoginScreen({navigation}: {navigation: any}) {
    const [loading, setLoading] = useState(true);
    const { email, password } = useSelector((state: RootState) => state.user)

    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(autoLogin())

        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, [])

    if (loading) {
        return <LoadingScreen />;
    }

    const handleLogin = () => {
        if (email && password) {
            dispatch(login({ email, password }));
        } else {
            Alert.alert("Hata", "E-posta ve parola alanları boş bırakılamaz.");
        }
    };

    return(
        <View style={styles.container}>
            <WrittenLogo/>
            <View>
                <Spacer spacerSize={40} spacerType={spacerTypes.vertical}/>
                <InputField
                    label="E-posta"
                    onChangeText={(email) => {dispatch(setEmail(email))}}
                />
                <Spacer spacerSize={20} spacerType={spacerTypes.vertical}/>
                <InputField
                    label="Parola"
                    onChangeText={(password) => {dispatch(setPassword(password))}}
                    secureTextEntry = {true}
                />
                <View style={styles.textButton}>
                    <Pressable onPress={() => console.log("Forgot password")}>
                        <Text style={styles.textButtonText}>
                            Parolamı unuttum
                        </Text>
                    </Pressable>
                </View>
                <Spacer spacerSize={40} spacerType={spacerTypes.vertical}/>
                <AuthButton 
                    buttonText="Giriş Yap"
                    buttonColor={Colors.darkYellow}
                    buttonHoverColor={Colors.hoverDarkYellow}
                    buttonTextColor={Colors.white}
                    onButtonPressed={handleLogin}/>
                <Spacer spacerSize={10} spacerType={spacerTypes.vertical}/>
                <AuthButton 
                    buttonText="Kayıt Ol"
                    buttonColor={Colors.black}
                    buttonHoverColor={Colors.hoverBlack}
                    buttonTextColor={Colors.white}
                    onButtonPressed={() => {navigation.navigate('signUp')}}/>
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
    textButton: {
        marginTop: 5,
        alignItems: "flex-end"
    },
    textButtonText: {
        color: Colors.black,
        textDecorationLine: "underline"
    }
})