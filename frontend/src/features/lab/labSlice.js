import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL } from '../../config';

const API_URL = `${API_BASE_URL}/api/lab/`;

const initialState = {
    tests: [],
    isLoading: false,
    isError: false,
    message: '',
};

export const getLabTests = createAsyncThunk(
    'lab/getAll',
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

export const createLabTest = createAsyncThunk(
    'lab/create',
    async (testData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const response = await axios.post(API_URL, testData, config);
            return response.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
);

export const labSlice = createSlice({
    name: 'lab',
    initialState,
    reducers: { reset: () => initialState },
    extraReducers: (builder) => {
        builder
            .addCase(getLabTests.pending, (state) => { state.isLoading = true; })
            .addCase(getLabTests.fulfilled, (state, action) => {
                state.isLoading = false;
                state.tests = action.payload;
            })
            .addCase(createLabTest.fulfilled, (state, action) => {
                state.tests.push(action.payload);
            });
    },
});

export const { reset } = labSlice.actions;
export default labSlice.reducer;


