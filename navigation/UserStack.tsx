import HomeScreen from '@/screens/user/HomeScreen';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function UserStack() {
    return (
        <Stack.Navigator initialRouteName="home" screenOptions={{headerShown: false}}>
            <Stack.Screen name="home" component={HomeScreen}/>
        </Stack.Navigator>
    );
}