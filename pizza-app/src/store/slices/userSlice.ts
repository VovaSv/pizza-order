import { createSlice } from "@reduxjs/toolkit";
import { loginAsyncThunk, registerAsyncThunk, getProfileAsyncThunk } from "../thunks/userThunks";
import { Profile } from "../../interfaces/profile.interfaces";


export interface UserState {
    jwt: string | null,
    loginErrorMessage?: string,
    registerErrorMessage?: string,
    profile?: Profile

}

export const initialState: UserState = {
    jwt: null
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
        },
        clearRegisterError: (state) => {
            state.registerErrorMessage = undefined;
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
        builder.addCase(getProfileAsyncThunk.fulfilled, (state, action) => {
            state.profile = action.payload;

        });

        builder.addCase(registerAsyncThunk.fulfilled, (state, action) => {
            if (action.payload && action.payload.access_token) {
                state.jwt = action.payload.access_token
                action.payload.navigate?.('/');
            }
        });

        builder.addCase(registerAsyncThunk.rejected, (state, action) => {
            if (action.payload) {
                state.registerErrorMessage = action.payload;
            } else {
                state.registerErrorMessage = "Something went wrong!";

            }

        });
    }
})

export const { actions: userActions, reducer: userReducer } = userSlice;