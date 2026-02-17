import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL } from '../../config';

const API_URL = `${API_BASE_URL}/api/emergency/`;

const initialState = {
    cases: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

// Get emergency cases
export const getEmergencyCases = createAsyncThunk(
    'emergency/getAll',
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const response = await axios.get(API_URL, config);
            return response.data.data;
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Create emergency case
export const createEmergencyCase = createAsyncThunk(
    'emergency/create',
    async (caseData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const response = await axios.post(API_URL, caseData, config);
            return response.data.data;
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const emergencySlice = createSlice({
    name: 'emergency',
    initialState,
    reducers: {
        reset: () => initialState,
        addEmergencyCaseRealtime: (state, action) => {
            state.cases.unshift(action.payload);
        },
        updateEmergencyCaseRealtime: (state, action) => {
            const index = state.cases.findIndex(c => c._id === action.payload._id);
            if (index !== -1) {
                state.cases[index] = action.payload;
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getEmergencyCases.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getEmergencyCases.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.cases = action.payload;
            })
            .addCase(getEmergencyCases.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(createEmergencyCase.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createEmergencyCase.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.cases.unshift(action.payload);
            })
            .addCase(createEmergencyCase.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset, addEmergencyCaseRealtime, updateEmergencyCaseRealtime } = emergencySlice.actions;
export default emergencySlice.reducer;


