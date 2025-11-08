import styles from '@/assets/styles/login.styles'
import React from 'react'
import { ActivityIndicator, Image, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import COLORS from '@/constants/colors'
import { Link } from 'expo-router'

const Login = () => {
    const [loginData,setLoginData] = React.useState({
        email:'',
        password:''
    })
    const [showPassword,setShowPassword] = React.useState(false)
    const [isLoading,setIsLoading] = React.useState(false)

    const handleLogin = () => {}

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >   
            <View style={styles.container}>
                {/* Illustration */}
                <View style={styles.topIllustration}>
                    <Image
                        source={require('@/assets/images/LoginImage.png')}
                        style={styles.illustrationImage}
                        resizeMode="contain"
                    />
                </View>
                <View style={styles.card}>
                    <View style= {styles.formContainer}>
                        {/* Email */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Email</Text>
                            <View style={styles.inputContainer}>
                                <Ionicons name='mail-outline' size={20} color={COLORS.primary} style={styles.inputIcon}/>
                                <TextInput 
                                    style={styles.input}
                                    placeholder='Enter your Email'
                                    placeholderTextColor={COLORS.placeholderText}
                                    keyboardType='email-address'
                                    autoCapitalize='none'
                                    value={loginData.email}
                                    onChangeText={(text) => setLoginData({...loginData,email:text})}
                                />
                            </View>
                        </View>
                        {/* Password */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Password</Text>
                            <View style={styles.inputContainer}>
                                <Ionicons name='lock-closed-outline' size={20} color={COLORS.primary} style={styles.inputIcon}/>
                                <TextInput 
                                    style={styles.input}
                                    placeholder='Enter your Password'
                                    placeholderTextColor={COLORS.placeholderText}
                                    secureTextEntry={!showPassword}
                                    value={loginData.password}
                                    onChangeText={(text) => setLoginData({...loginData,password:text})}
                                />
                                {/* eye icon */}
                                <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowPassword(!showPassword)}>
                                    <Ionicons 
                                        name={!showPassword ? 'eye-off-outline' : 'eye-outline'} 
                                        size={20} 
                                        color={COLORS.primary} 
                                        style={styles.inputIcon}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    {/* Login Button */}
                    <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={isLoading}>
                        {isLoading ?
                            <ActivityIndicator size="small" color={COLORS.white} />
                        :
                            <Text style={styles.buttonText}>Login</Text>
                        }
                    </TouchableOpacity>
                    {/* Footer */}
                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Don&apos;t have an account?</Text>
                        <Link href='/(auth)/signup' asChild>
                            <TouchableOpacity>
                                <Text style={styles.link}> Sign Up</Text>
                            </TouchableOpacity>
                        </Link>
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}

export default Login