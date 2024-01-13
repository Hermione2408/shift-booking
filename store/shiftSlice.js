import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const fetchShifts = createAsyncThunk('shifts/fetchShifts', async () => {
    const response = await fetch('http://127.0.0.1:8080/shifts');
    return response.json();
  });
  
export const fetchShift = createAsyncThunk('shifts/fetchShift', async (id) => {
    const response = await fetch(`http://127.0.0.1:8080/shifts/${id}`);
    return response.json();
  });
  
  export const bookShift = createAsyncThunk('shifts/bookShift', async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://127.0.0.1:8080/shifts/${id}/book`, { method: 'POST' });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  });
  
 export const cancelShift = createAsyncThunk('shifts/cancelShift', async (id) => {
    const response = await fetch(`http://127.0.0.1:8080/shifts/${id}/cancel`, { method: 'POST' });
    return response.json();
  });
  
  const shiftSlice = createSlice({
    name: 'shifts',
    initialState: {
      items: [],
      bookedShifts: [],
      availableShifts:[],
      loading: false,
      error: null,
      bookingloading:false
    },
    reducers: {},
    extraReducers: {
        [fetchShifts.pending]: (state) => {
          state.loading = true;
        },
        [fetchShifts.fulfilled]: (state, action) => {
          state.loading = false;
          state.items = action.payload;
          state.bookedShifts = action.payload.filter(shift => shift.booked);
          state.availableShifts = action.payload.filter(shift => !shift.booked);
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
          state.bookingloading = true;
        },
        [bookShift.fulfilled]: (state) => {
          state.bookingloading = false;
        },
        [bookShift.rejected]: (state, action) => {
          state.bookingloading = false;
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