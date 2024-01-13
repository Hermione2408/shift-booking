import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


const fetchShifts = createAsyncThunk('shifts/fetchShifts', async () => {
    const response = await fetch('/shifts');
    return response.json();
  });
  
  const fetchShift = createAsyncThunk('shifts/fetchShift', async (id) => {
    const response = await fetch(`/shifts/${id}`);
    return response.json();
  });
  
  const bookShift = createAsyncThunk('shifts/bookShift', async (id) => {
    const response = await fetch(`/shifts/${id}/book`, { method: 'POST' });
    return response.json();
  });
  
  const cancelShift = createAsyncThunk('shifts/cancelShift', async (id) => {
    const response = await fetch(`/shifts/${id}/cancel`, { method: 'POST' });
    return response.json();
  });
  
  const shiftSlice = createSlice({
    name: 'shifts',
    initialState: {
      items: [],
      loading: false,
      error: null
    },
    reducers: {},
    extraReducers: {
        [fetchShifts.pending]: (state) => {
          state.loading = true;
        },
        [fetchShifts.fulfilled]: (state, action) => {
          state.loading = false;
          state.items = action.payload;
        },
      [fetchShifts.rejected]:(state,action)=>{
        state.loading=false;
        state.error=action.error.message
      },
        // Handling fetchShift
        [fetchShift.pending]: (state) => {
          state.loading = true;
        },
        [fetchShift.fulfilled]: (state, action) => {
          state.loading = false;
          state.items = [...state.items, action.payload];
        },
        [fetchShift.rejected]: (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        },
      
        // Handling bookShift
        [bookShift.pending]: (state) => {
          state.loading = true;
        },
        [bookShift.fulfilled]: (state, action) => {
          state.loading = false;
          state.items = state.items.map(shift => 
            shift.id === action.payload.id ? action.payload : shift);
        },
        [bookShift.rejected]: (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        },
      
        // Handling cancelShift
        [cancelShift.pending]: (state) => {
          state.loading = true;
        },
        [cancelShift.fulfilled]: (state, action) => {
          state.loading = false;
          state.items = state.items.map(shift => 
            shift.id === action.payload.id ? action.payload : shift);
        },
        [cancelShift.rejected]: (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        },
      }
      
  });
  export default shiftSlice