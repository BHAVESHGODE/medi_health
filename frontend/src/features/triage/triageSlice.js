import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL } from '../../config';

const API_URL = `${API_BASE_URL}/api/triage`;

export const fetchBoard = createAsyncThunk('triage/board', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user?.token;
    const res = await axios.get(`${API_URL}/board`, { headers: { Authorization: `Bearer ${token}` } });
    return res.data.data;
  } catch (err) {
    const msg = err.response?.data?.message || err.message || String(err);
    return thunkAPI.rejectWithValue(msg);
  }
});

const slice = createSlice({
  name: 'triage',
  initialState: { cases: [], isLoading: false, error: null },
  reducers: {
    updateRealtime: (state, action) => {
      const { caseId, score, priority } = action.payload;
      const c = state.cases.find(x => x._id === caseId);
      if (c) { c.triage = { ...(c.triage || {}), score, priority, at: new Date().toISOString() }; }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBoard.pending, (state) => { state.isLoading = true; state.error = null; })
      .addCase(fetchBoard.fulfilled, (state, action) => { state.isLoading = false; state.cases = action.payload; })
      .addCase(fetchBoard.rejected, (state, action) => { state.isLoading = false; state.error = action.payload; });
  }
});

export const { updateRealtime } = slice.actions;
export default slice.reducer;
