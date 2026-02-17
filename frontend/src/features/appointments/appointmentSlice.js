import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL } from '../../config';

const API_URL = `${API_BASE_URL}/api/appointments/`;

const initialState = {
    appointments: [],
    appointment: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

// Create new appointment
export const createAppointment = createAsyncThunk(
    'appointments/create',
    async (appointmentData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const response = await axios.post(API_URL, appointmentData, config);
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

// Get user appointments
export const getAppointments = createAsyncThunk(
    'appointments/getAll',
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

export const appointmentSlice = createSlice({
    name: 'appointment',
    initialState,
    reducers: {
        reset: () => initialState,
        addAppointmentRealtime: (state, action) => {
            state.appointments.push(action.payload);
        },
        updateAppointmentRealtime: (state, action) => {
            const index = state.appointments.findIndex(app => app._id === action.payload._id);
            if (index !== -1) {
                state.appointments[index] = action.payload;
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createAppointment.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createAppointment.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.appointments.push(action.payload);
            })
            .addCase(createAppointment.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getAppointments.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAppointments.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.appointments = action.payload;
            })
            .addCase(getAppointments.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset, addAppointmentRealtime, updateAppointmentRealtime } = appointmentSlice.actions;
export default appointmentSlice.reducer;


