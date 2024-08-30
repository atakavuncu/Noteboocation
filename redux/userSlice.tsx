import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "@firebase/auth"
import AsyncStorage from "@react-native-async-storage/async-storage";
import app from '../config/Firebase';

export const login = createAsyncThunk<LoginResponse, LoginPayload>(
    'user/login', 
    async({email, password}) => {
        try {
            const auth = getAuth(app);
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user: any = userCredential.user
            const token = user.stsTokenManager.accessToken

            const userData = {
                token,
                user,
            };

            await AsyncStorage.setItem("userToken", token);

            return userData;

        } catch (error: any) {
            throw error
        }
    }
)

export const autoLogin = createAsyncThunk<string | null>(
    'user/autoLogin', 
    async () => {
        try {
            const token = await AsyncStorage.getItem("userToken");

            if (token) {
                return token;
            } else {
                throw new Error("User Not Found");
            }
        } catch (error) {
            throw error
        }
    }
)

export const register = createAsyncThunk<LoginResponse, LoginPayload>(
    'user/register',
    async ({email, password}) => {
        try {
            const auth = getAuth(app)
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            const user: any = userCredential.user
            const token = user.stsTokenManager.accessToken

            const userData = {
                token,
                user,
            };

            await AsyncStorage.setItem("userToken", token);

            return userData;
            
        } catch (error) {
            throw error
        }
    }
)

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        email: null,
        password: null,
        isAuth: false,
        user: null,
        token: null
    } as UserState,
    reducers: {
        setEmail: (state, action) => {
            state.email = action.payload
        },
        setPassword: (state, action) => {
            state.password = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isAuth = false
            })
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload.user
                state.token = action.payload.token
                state.isAuth = true
                console.log("Giriş Yapıldı.")
            })
            .addCase(login.rejected, (state) => {
                state.isAuth = false
                state.token = null
            })
            .addCase(autoLogin.rejected, (state, action) => {
                state.isAuth = false
                state.token = null
            })
            .addCase(autoLogin.fulfilled, (state, action) => {
                state.isAuth = true
                state.token = action.payload
            })
            .addCase(register.rejected, (state, action) => {
                state.isAuth = false
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isAuth = true
                state.token = action.payload.token
            })
    }
})

export const { setEmail, setPassword } = userSlice.actions;

export default userSlice.reducer