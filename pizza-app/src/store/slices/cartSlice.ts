import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { loginAsyncThunk } from "../thunks/userThunks";



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
        },
        clearCart: (state) => {
            /*
            In contrast, if you were to directly modify state, like state = initialState, it wouldn't
            work as expected because you cannot directly reassign state in reducers.
            State reassignment is not tracked by Immer, so it wouldn't result in the state actually changing.
            In a reducer, state = initialState does not work because:
            Redux reducers don’t allow you to reassign the state parameter.
            You are working with a proxy object provided by Immer, so
            mutating that object is fine (e.g., state.user = null),
            but reassigning state itself will not work because you're not allowed to directly
            change the reference to the state object.
            Avoid reassigning state (e.g., state = initialState) because Redux reducers expect you
            to either mutate parts of the state or return a new state object.
            */
            return initialState;
        }

    }, extraReducers: (builder) => {
        builder.addCase(loginAsyncThunk.fulfilled, (state, action) => {


        });
        builder.addCase(loginAsyncThunk.rejected, (state, action) => {
        });
    }
})

export const { actions: cartActions, reducer: cartReducer } = cartSlice;