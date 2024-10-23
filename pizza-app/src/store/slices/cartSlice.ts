import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { loginAsyncThunk, registerAsyncThunk, getProfileAsyncThunk } from "../thunks/userThunks";



export interface CartState {
    items: CartItem[]
}

export interface CartItem {
    id: number;
    count: number;
}

export const initialState: CartState = {
    items: []
}
export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<number>) => {
            const existed = state.items.find((item) => item.id === action.payload);
            if (!existed) {
                state.items.push({ id: action.payload, count: 1 })
            } else {
                existed.count++;
            }
        },
        removeItem: (state, action: PayloadAction<number>) => {
            const existed = state.items.find((item) => item.id === action.payload);
            if (existed && existed.count === 0) {
                return;
            } else if (existed?.count) {
                existed.count--;
            }
        },
        deleteItem: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter((item) => item.id !== action.payload)
        }

    }, extraReducers: (builder) => {
        builder.addCase(loginAsyncThunk.fulfilled, (state, action) => {


        });
        builder.addCase(loginAsyncThunk.rejected, (state, action) => {
        });
    }
})

export const { actions: cartActions, reducer: cartReducer } = cartSlice;