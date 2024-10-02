import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { logout } from '@/redux/userSlice'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/redux/store'

const MenuScreen = () => {

    const dispatch = useDispatch<AppDispatch>()

    const handleLogout = () => {
        dispatch(logout())
    };


    return (
        <View style={styles.container}>
        <Button title="Logout" onPress={handleLogout} />
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

export default MenuScreen
