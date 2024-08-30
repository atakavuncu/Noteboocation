import { Colors } from "@/constants/Colors";
import { View, Text } from "react-native";
import { ActivityIndicator } from "react-native-paper";

export default function LoadingScreen() {
    return (
      <View style = {{
        flex: 1,
        position: "absolute",
        width: "100%",
        height: "100%",
        backgroundColor: Colors.white,
        alignItems: "center",
        justifyContent: "center"
    }}>
        <ActivityIndicator size={'large'} color={Colors.black}/>
    </View>
      );
}