import LoginScreen from "@/screens/auth/LoginScreen";
import SignUpScreen from "@/screens/auth/SignUpScreen";
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function AuthStack() {
    return (
        <Stack.Navigator initialRouteName="login" screenOptions={{headerShown: false}}>
            <Stack.Screen name="login" component={LoginScreen}/>
            <Stack.Screen name="signUp" component={SignUpScreen}/>
        </Stack.Navigator>
    );
}