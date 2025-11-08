import { baseUrl } from '@/constants/constants'
import {create} from 'zustand'
import AsyncStorage  from '@react-native-async-storage/async-storage'

type User = {
    username:string;
    email:string;
    password?:string;
}

type StoreState = {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    register: (signupData: User) => Promise<{success: boolean; error?: string}>;
}

export const useAuthStore = create<StoreState>((set) => ({
    user: null,
    token:null,
    isLoading:false,

    register: async (signupData: User) => {
        set({isLoading:true})
        try {
            // API call to register user
            const response = await fetch(`${baseUrl}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(signupData),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Registration failed');
            }
            await AsyncStorage.setItem("user", JSON.stringify(data.user));
            await AsyncStorage.setItem("token", data.token);

            set({user: data.user, token: data.token, isLoading:false});
            return {success:true}
        } catch (error:any) {
            set({isLoading:false})
            return {
                success:false,
                error: error.message
            }
            
        }

    }
}))