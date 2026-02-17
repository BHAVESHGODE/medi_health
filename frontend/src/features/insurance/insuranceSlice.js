import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL } from '../../config';

const API_URL = `${API_BASE_URL}/api/insurance/`;

const initialState = {
    claims: [],
    isLoading: false,
    isError: false,
    message: '',
};

export const getClaims = createAsyncThunk(
    'insurance/getAll',
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const response = await axios.get(API_URL, config);
            return response.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
);

export const createClaim = createAsyncThunk(
    'insurance/create',
    async (claimData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const response = await axios.post(API_URL, claimData, config);
            return response.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
);

export const insuranceSlice = createSlice({
    name: 'insurance',
    initialState,
    reducers: { reset: () => initialState },
    extraReducers: (builder) => {
        builder
            .addCase(getClaims.pending, (state) => { state.isLoading = true; })
            .addCase(getClaims.fulfilled, (state, action) => {
                state.isLoading = false;
                state.claims = action.payload;
            })
            .addCase(createClaim.fulfilled, (state, action) => {
                state.claims.push(action.payload);
            });
    },
});

export const { reset } = insuranceSlice.actions;
export default insuranceSlice.reducer;


