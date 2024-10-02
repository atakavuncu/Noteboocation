import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const CalendarScreen = () => {
    return (
        <View style={styles.container}>
            <Text>CalendarScreen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default CalendarScreen
