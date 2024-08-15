import { Text, View, StyleSheet } from "react-native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Colors } from "@/constants/Colors";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, { useState, useEffect } from 'react';


export default function WrittenLogo() {

    SplashScreen.preventAutoHideAsync();

    const [loaded, error] = useFonts({
        'Pacifico-Regular': require('../assets/fonts/Pacifico-Regular.ttf'),
    });

    useEffect(() => {
        if (loaded || error) {
            SplashScreen.hideAsync();
    }
    }, [loaded, error]);
    
    if (!loaded && !error) {
        return null;
    }

    return (
        <View style = {styles.iconViewStyle}>
            <MaterialCommunityIcons name="notebook-edit" size={120} style = {styles.iconStyle} />
            <Text style = {styles.logoTextStyle}>Noteboocation</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    iconViewStyle: {
        alignItems: "center",
        justifyContent: "center",
    },
    iconStyle: {
        color: Colors.darkYellow
    },
    logoTextStyle: {
        fontSize: 30,
        fontFamily: "Pacifico-Regular"
    }
})