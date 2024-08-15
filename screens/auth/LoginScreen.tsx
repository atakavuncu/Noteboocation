import { Text, View, StyleSheet, Pressable } from "react-native";
import WrittenLogo from '../../components/WrittenLogo';
import '@emotion/styled';
import '@emotion/react';
import { Colors } from "@/constants/Colors";
import { useState } from "react";
import InputField from "@/components/InputField";
import Spacer, { spacerTypes } from "@/components/Spacer";
import AuthButton from "@/components/AuthButton";

export default function LoginScreen() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return(
        <View style={styles.container}>
            <WrittenLogo/>
            <View>
                <Spacer spacerSize={40} spacerType={spacerTypes.vertical}/>
                <InputField
                    label="E-posta"
                    value={email}
                    onChangeText={(value) => {setEmail(value)}}
                />
                <Spacer spacerSize={20} spacerType={spacerTypes.vertical}/>
                <InputField
                    label="Parola"
                    value={password}
                    onChangeText={(value) => {setPassword(value)}}
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
                    onButtonPressed={() => {console.log(email);
                    }}/>
                <Spacer spacerSize={10} spacerType={spacerTypes.vertical}/>
                <AuthButton 
                    buttonText="Kayıt Ol"
                    buttonColor={Colors.black}
                    buttonHoverColor={Colors.hoverBlack}
                    buttonTextColor={Colors.white}
                    onButtonPressed={() => {console.log(password);
                    }}/>
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