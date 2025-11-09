import { Tabs } from 'expo-router'
import React from 'react'

export default function TabLayout() {
    return (
        <Tabs>
            <Tabs.Screen name="index" options={{ headerShown: false, title: 'Home' }} />
            <Tabs.Screen name="create" options={{ headerShown: false, title: 'Create' }} />
            <Tabs.Screen name="profile" options={{ headerShown: false, title: 'Profile' }} />
        </Tabs>
    )
}