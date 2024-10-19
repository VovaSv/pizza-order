import { createSlice } from "@reduxjs/toolkit";
import { loginAsyncThunk } from "../thunks/userThunks";


export interface UserState {
    jwt: string | null,
    loginErrorMessage: string | undefined,
}

export const initialState: UserState = {
    jwt: null,
    loginErrorMessage: undefined
}
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        /*addJwt: (state, action: PayloadAction<string>) => { Can Remove as we added async Thynk to hdnale login
            state.jwt = action.payload;
        },*/
        logout: (state) => {
            state.jwt = null;
        },
        clearLoginError: (state) => {
            state.loginErrorMessage = undefined;
        }
    }, extraReducers: (builder) => {
        builder.addCase(loginAsyncThunk.fulfilled, (state, action) => {
            state.jwt = action.payload?.access_token ?? null;
            action.payload?.navigate?.('/');

        });
        builder.addCase(loginAsyncThunk.rejected, (state, action) => {
            if (action.payload) {
                // Access the custom error message from `rejectWithValue`
                state.loginErrorMessage = action.payload;
            } else {
                // Fallback to generic error message if no payload
                state.loginErrorMessage = "Something went wrong!";
            }
        });
    }
})

export const { actions: userActions, reducer: userReducer } = userSlice;