import COLORS from '@/constants/colors'
import React from 'react'
import { ActivityIndicator, View } from 'react-native'

const Loader = () => {
    return (
        <View style={{
            flex:1,
            justifyContent:'center',
            alignItems:"center",
            backgroundColor:COLORS.background
        }}>
            <ActivityIndicator size={20} color={COLORS.primary} />
        </View>
    )
}

export default Loader