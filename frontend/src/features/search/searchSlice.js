import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL } from '../../config';

const API_URL = `${API_BASE_URL}/api/search`;

export const globalSearch = createAsyncThunk('search/global', async (q, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user?.token;
    const res = await axios.get(`${API_URL}?q=${encodeURIComponent(q)}`, { headers: { Authorization: `Bearer ${token}` } });
    return res.data.data;
  } catch (err) {
    const msg = err.response?.data?.message || err.message || String(err);
    return thunkAPI.rejectWithValue(msg);
  }
});

const slice = createSlice({
  name: 'search',
  initialState: { q: '', results: null, isLoading: false, error: null },
  reducers: {
    setQuery: (state, action) => { state.q = action.payload; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(globalSearch.pending, (state) => { state.isLoading = true; state.error = null; })
      .addCase(globalSearch.fulfilled, (state, action) => { state.isLoading = false; state.results = action.payload; })
      .addCase(globalSearch.rejected, (state, action) => { state.isLoading = false; state.error = action.payload; });
  }
});

export const { setQuery } = slice.actions;
export default slice.reducer;
