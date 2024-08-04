import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAuth, signInWithEmailAndPassword } from "@firebase/auth"

export const login = createAsyncThunk(
    'user/login', 
    async({email, password}: { email: string; password: string }) => {
        try {
            const auth = getAuth()
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            const user: any = userCredential.user
            const token = user.stsTokenManager.accessToken

            const userData = {
                token,
                user: user
            }

            return userData

        } catch (error) {
            throw error
        }
})

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        email: null,
        password: null,
        isAuth: false,
        user: null,
        token: null
    },
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
            })
            .addCase(login.rejected, (state, action) => {
                state.isAuth = false
            })
    }
})

export default userSlice.reducer