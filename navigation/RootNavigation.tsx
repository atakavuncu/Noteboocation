import app from "@/config/Firebase";
import React from "react";
import { useSelector, TypedUseSelectorHook } from "react-redux";
import { createStackNavigator } from '@react-navigation/stack';
import { RootState } from "@/redux/store";
import AuthStack from "./AuthStack";
import UserStack from "./UserStack";

const Stack = createStackNavigator();

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default function RootNavigation() {
    const isAuth = useTypedSelector((state) => state.user.isAuth);

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {isAuth ? (
                <Stack.Screen name="UserStack" component={UserStack} />
            ) : (
                <Stack.Screen name="AuthStack" component={AuthStack} />
            )}
        </Stack.Navigator>
    );
}
