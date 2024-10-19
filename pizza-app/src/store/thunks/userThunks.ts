import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { API_URL_PREFIX } from '../../configs/API';

import { LoginResponse } from '../../interfaces/loginResponse.interface';
import { NavigateFunction } from 'react-router-dom';
//import { userActions } from '../../store/slices/userSlice';



// Thunk to fetch user
export const loginAsyncThunk = createAsyncThunk<
    LoginResponse | undefined, // Return type
    { email: string; password: string, navigate?: NavigateFunction }, // Extra argument type,
    { rejectValue: string }
>('user/login', async (values: { email: string, password: string, navigate?: NavigateFunction }, { rejectWithValue }) => {

    try {
        const { data } = await axios.post<LoginResponse>(`${API_URL_PREFIX}/auth/login`, {
            email: values.email, password: values.password
        });
        console.log('loginAsyncThunk')
        //localStorage.setItem('jwt', data.access_token);
        //dispatch(userActions.addJwt(data.access_token))
        //navigate('/');
        //extra.navigate('/');
        if (data.access_token && values.navigate) {
            //values.navigate('/');
        }
        return { ...data, navigate: values.navigate };

    } catch (error) {
        if (error instanceof AxiosError) {
            return rejectWithValue(error.response?.data.message);
        }
        return rejectWithValue('An unknown error occurred');
    }

    //return data;

});