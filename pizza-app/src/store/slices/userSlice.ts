import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { loginAsyncThunk } from "../thunks/userThunks";
import { LoginResponse } from "../../interfaces/loginResponse.interface";


export interface UserState {
    jwt: string | null
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
        }
    }, extraReducers: (builder) => {
        builder.addCase(loginAsyncThunk.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
            state.jwt = action.payload.access_token;
            action.payload.navigate?.('/');

        })
    }
})

export const { actions: userActions, reducer: userReducer } = userSlice;