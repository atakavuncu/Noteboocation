import { createStackNavigator } from '@react-navigation/stack';

export type StackParamList = {
    Home: undefined;
    Calendar: undefined;
    Menu: undefined;
};

const Stack = createStackNavigator<StackParamList>();
