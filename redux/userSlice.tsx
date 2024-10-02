import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "@firebase/auth"
import AsyncStorage from "@react-native-async-storage/async-storage";
import app from '../config/Firebase';

export const login = createAsyncThunk<string, LoginPayload>(
    'user/login', 
    async({email, password}) => {
        try {
            const auth = getAuth(app);
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const userId: any = userCredential.user.uid

            await AsyncStorage.setItem("id", userId);

            return userId;

        } catch (error: any) {
            throw error
        }
    }
)

export const autoLogin = createAsyncThunk<string | null>(
    'user/autoLogin', 
    async () => {
        try {
            const userId = await AsyncStorage.getItem("id");

            if (userId) {
                return userId
            } else {
                throw new Error("User Not Found");
            }


        } catch (error) {
            throw error
        }
    }
)

export const register = createAsyncThunk<string, LoginPayload>(
    'user/register',
    async ({email, password}) => {
        try {
            const auth = getAuth(app)
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            const userId: any = userCredential.user.uid

            await AsyncStorage.setItem("id", userId);

            return userId;
            
        } catch (error) {
            throw error
        }
    }
)

export const logout = createAsyncThunk(
    'user/logout',
    async() => {
        try {
            const auth = getAuth()
            await signOut(auth)

            await AsyncStorage.removeItem("id")
            
            return null
        } catch (error) {
            throw error
        }
    }
)

export const getUserIdFromFirebase = async (): Promise<string> => {
    return new Promise((resolve, reject) => {
        const auth = getAuth()
        onAuthStateChanged(auth, (user) => {
            if (user) {
                resolve(user.uid);
            } else {
                reject('No user is logged in');
            }
        });
    });
};

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        email: null,
        password: null,
        isAuth: false,
        userId: null
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
                state.userId = action.payload
                state.isAuth = true
                console.log("Giriş Yapıldı.")
            })
            .addCase(login.rejected, (state) => {
                state.isAuth = false
                state.userId = null
            })
            .addCase(autoLogin.rejected, (state, action) => {
                state.isAuth = false
                state.userId = null
            })
            .addCase(autoLogin.fulfilled, (state, action) => {
                state.isAuth = true
                state.userId = action.payload
            })
            .addCase(register.rejected, (state, action) => {
                state.isAuth = false
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isAuth = true
                state.userId = action.payload
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.isAuth = false
                state.userId = null
            })
    }
})

export const { setEmail, setPassword } = userSlice.actions;

export default userSlice.reducer