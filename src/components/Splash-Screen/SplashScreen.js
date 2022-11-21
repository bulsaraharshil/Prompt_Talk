import { View, Text, Image } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from "@react-navigation/native";
const SplashScreen = () => {

    const navigation = useNavigation();
    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('Login');
        }, 3000);
    }, [])

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image
                source={require('../../../assets/msg.png')}
                style={{ width: 350, height: 110, resizeMode: 'center' }}
            />
        </View>
    )
}

export default SplashScreen;