import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { signIn } from './thunks/signInThunk';
import { RootState } from './store';
import { signUp } from './thunks/signUpThunk';

export interface AuthInfo {
    id: number;
    email: string;
    isBanned: boolean;
    roles: string[];
}

export interface AuthState {
    status: 'idle' | 'loading' | 'failed' | 'succeeded';
    isAuth: boolean;
    error: null | string;
    info: null | AuthInfo;
}

const initialState: AuthState = {
    status: 'idle',
    isAuth: false,
    error: null,
    info: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signOut: (state) => {
            state.status = 'idle';
            state.isAuth = false;
            state.error = null;
            state.info = null;
        },
        initSignIn: (state, action: PayloadAction<AuthInfo>) => {
            state.status = 'succeeded';
            state.isAuth = true;
            state.info = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signIn.pending, (state, _) => {
                state.status = 'loading';
                state.isAuth = false;
                state.error = null;
            })
            .addCase(signIn.rejected, (state, action) => {
                state.status = 'failed';
                state.isAuth = false;
                state.error = action.payload as string | null;
            })
            .addCase(signIn.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.isAuth = true;
                state.info = action.payload;
            })
            .addCase(signUp.pending, (state, _) => {
                state.status = 'loading';
                state.isAuth = false;
                state.error = null;
            })
            .addCase(signUp.rejected, (state, action) => {
                state.status = 'failed';
                state.isAuth = false;
                state.error = action.payload as string | null;
            })
            .addCase(signUp.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.isAuth = true;
                state.info = action.payload;
            });
    },
});

export default authSlice.reducer;
export const { signOut, initSignIn } = authSlice.actions;

export const selectAuthState = (state: RootState) => state.auth;
