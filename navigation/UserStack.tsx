import { Colors } from '@/constants/Colors';
import CalendarScreen from '@/screens/user/CalendarScreen';
import HomeScreen from '@/screens/user/HomeScreen';
import MenuScreen from '@/screens/user/MenuScreen';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator(
    
);

export default function UserStack() {
    return (
        <Tab.Navigator 
            initialRouteName="Home" 
            screenOptions={{ 
                headerShown: false,
                tabBarStyle: {
                    height: 70,
                    paddingTop: 10,
                    paddingBottom: 10
                },
                tabBarLabelStyle: {
                    fontSize: 12
                },
                tabBarActiveTintColor: Colors.darkYellow,
                tabBarInactiveTintColor: Colors.black
            }}
        >
            <Tab.Screen 
                name="Calendar" 
                component={CalendarScreen} 
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="calendar-outline" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen 
                name="Home" 
                component={HomeScreen} 
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="checkmark-done-outline" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen 
                name="Menu"
                component={MenuScreen} 
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="menu-outline" size={size} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}