import { createSlice } from '@reduxjs/toolkit';
import { API_BASE_URL } from '../../config';

const initialState = { downloading: false };

const slice = createSlice({
  name: 'exports',
  initialState,
  reducers: {
    start: (state) => { state.downloading = true; },
    stop: (state) => { state.downloading = false; }
  }
});

export const downloadCSV = (endpoint) => async (dispatch, getState) => {
  const token = getState().auth.user?.token;
  try {
    dispatch(slice.actions.start());
    const res = await fetch(`${API_BASE_URL}/api/exports/${endpoint}`, { headers: { Authorization: `Bearer ${token}` } });
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${endpoint}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  } catch (e) {
    console.error(e);
  } finally {
    dispatch(slice.actions.stop());
  }
};

export const { start, stop } = slice.actions;
export default slice.reducer;
