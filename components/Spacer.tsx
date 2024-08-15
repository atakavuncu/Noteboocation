import { View } from "react-native";

export enum spacerTypes {
    "vertical",
    "horizontal"
}

const Spacer = ({spacerSize, spacerType} : {spacerSize: number, spacerType: spacerTypes}) => {
    return (
        <View style = {
            spacerType == spacerTypes.vertical
            ? {
                height: spacerSize
            }
            : {
                width: spacerSize
            }
        }>

        </View>
    )
}

export default Spacer