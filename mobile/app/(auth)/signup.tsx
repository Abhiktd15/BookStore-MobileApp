import styles from '@/assets/styles/login.styles'
import COLORS from '@/constants/colors'
import { useAuthStore } from '@/store/authStore'
import { Ionicons } from '@expo/vector-icons'
import { Link } from 'expo-router'
import React from 'react'
import { ActivityIndicator, Alert, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native'

const Signup = () => {
    const [signupData,setsignupData] = React.useState({
        username:'',
        email:'',
        password:''
    })
    const [showPassword,setShowPassword] = React.useState(false)
    const {isLoading,register} = useAuthStore()

    const handleSignup = async () => {
        const result = await register(signupData)
        if(!result.success){
            Alert.alert("error",result.error || "Registration failed")
        }
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >   
            <View style={styles.container}>
                <View style={styles.card}>
                    <View style={styles.header}>
                        <Text style={styles.title}>BookWorm🐛</Text>
                        <Text style={styles.subtitle}>Share your favorite reads</Text>
                    </View>
                    <View style= {styles.formContainer}>
                        {/* Username */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Username</Text>
                            <View style={styles.inputContainer}>
                                <Ionicons name='person-outline' size={20} color={COLORS.primary} style={styles.inputIcon}/>
                                <TextInput 
                                    style={styles.input}
                                    placeholder='johndoe'
                                    placeholderTextColor={COLORS.placeholderText}
                                    keyboardType='default'
                                    autoCapitalize='words'
                                    value={signupData.username}
                                    onChangeText={(text) => setsignupData({...signupData,username:text})}
                                />
                            </View>
                        </View>

                        {/* Email */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Email</Text>
                            <View style={styles.inputContainer}>
                                <Ionicons name='mail-outline' size={20} color={COLORS.primary} style={styles.inputIcon}/>
                                <TextInput 
                                    style={styles.input}
                                    placeholder='johndoe@gmail.com'
                                    placeholderTextColor={COLORS.placeholderText}
                                    keyboardType='email-address'
                                    autoCapitalize='none'
                                    value={signupData.email}
                                    onChangeText={(text) => setsignupData({...signupData,email:text})}
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
                                    placeholder='*******'
                                    placeholderTextColor={COLORS.placeholderText}
                                    secureTextEntry={!showPassword}
                                    value={signupData.password}
                                    onChangeText={(text) => setsignupData({...signupData,password:text})}
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
                    <TouchableOpacity style={styles.button} onPress={handleSignup} disabled={isLoading}>
                        {isLoading ?
                            <ActivityIndicator size="small" color={COLORS.white} />
                        :
                            <Text style={styles.buttonText}>Sign Up</Text>
                        }
                    </TouchableOpacity>
                    {/* Footer */}
                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Already have an account?</Text>
                        <Link href='/(auth)' asChild>
                            <TouchableOpacity>
                                <Text style={styles.link}> Login</Text>
                            </TouchableOpacity>
                        </Link>
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}

export default Signup