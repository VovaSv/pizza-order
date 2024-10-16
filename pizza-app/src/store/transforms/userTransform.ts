import { UserState, initialState } from '../slices/userSlice';
import { createTransform } from 'redux-persist';

// Define a transform to persist only the 'importantField' field
export const userTransform = createTransform<UserState, Partial<UserState>>(
    // Transform state before saving to localStorage
    (inboundState) => ({
        jwt: inboundState.jwt, // Only persist this field
    }),
    // Transform state before rehydrating
    (outboundState) => { return { ...initialState, ...outboundState } },
    { whitelist: ['user'] } // Apply only to 'someSlice'
);
