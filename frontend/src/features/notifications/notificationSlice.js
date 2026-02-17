import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL } from '../../config';

const API_URL = `${API_BASE_URL}/api/notifications`;

export const fetchNotifications = createAsyncThunk('notifications/fetch', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user?.token;
    const res = await axios.get(`${API_URL}/me`, { headers: { Authorization: `Bearer ${token}` } });
    return res.data.data;
  } catch (err) {
    const msg = err.response?.data?.message || err.message || String(err);
    return thunkAPI.rejectWithValue(msg);
  }
});

export const markRead = createAsyncThunk('notifications/markRead', async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user?.token;
    const res = await axios.patch(`${API_URL}/${id}/read`, {}, { headers: { Authorization: `Bearer ${token}` } });
    return res.data.data;
  } catch (err) {
    const msg = err.response?.data?.message || err.message || String(err);
    return thunkAPI.rejectWithValue(msg);
  }
});

const slice = createSlice({
  name: 'notifications',
  initialState: { items: [], isLoading: false, error: null },
  reducers: {
    addRealtime: (state, action) => {
      state.items.unshift(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => { state.isLoading = true; state.error = null; })
      .addCase(fetchNotifications.fulfilled, (state, action) => { state.isLoading = false; state.items = action.payload; })
      .addCase(fetchNotifications.rejected, (state, action) => { state.isLoading = false; state.error = action.payload; })
      .addCase(markRead.fulfilled, (state, action) => {
        const idx = state.items.findIndex(n => n._id === action.payload._id);
        if (idx !== -1) state.items[idx] = action.payload;
      });
  }
});

export const { addRealtime } = slice.actions;
export default slice.reducer;
