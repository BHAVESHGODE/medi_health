import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL } from '../../config';

const API_URL = `${API_BASE_URL}/api/patients/`;

const initialState = {
    patients: [],
    patient: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

// Create new patient
export const createPatient = createAsyncThunk(
    'patients/create',
    async (patientData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const response = await axios.post(API_URL, patientData, config);
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

// Get user patients
export const getPatients = createAsyncThunk(
    'patients/getAll',
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

export const patientSlice = createSlice({
    name: 'patient',
    initialState,
    reducers: {
        reset: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createPatient.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createPatient.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.patients.push(action.payload);
            })
            .addCase(createPatient.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getPatients.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getPatients.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.patients = action.payload;
            })
            .addCase(getPatients.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset } = patientSlice.actions;
export default patientSlice.reducer;


