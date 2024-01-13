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
      bookedShifts: [   { id: "1", booked: true, area: "Helsinki", startTime: 1705116600000, endTime: 1705127400000 },
      { id: "2", booked: true, area: "Tampere", startTime: 1705120200000, endTime: 1705127400000 },
      { id: "3", booked: true, area: "Turku", startTime: 1705123800000, endTime: 1705131000000 },
      { id: "4", booked: true, area: "Helsinki", startTime: 1705134600000, endTime: 1705143600000 },
      { id: "5", booked: true, area: "Turku", startTime: 1705147200000, endTime: 1705156200000 },
      { id: "6", booked: true, area: "Tampere", startTime: 1705159800000, endTime: 1705168800000 },
      { id: "7", booked: true, area: "Helsinki", startTime: 1705172400000, endTime: 1705181400000 },
      { id: "8", booked: true, area: "Turku", startTime: 1705185000000, endTime: 1705194000000 },
      { id: "9", booked: true, area: "Tampere", startTime: 1705197600000, endTime: 1705206600000 },
      { id: "10", booked: true, area: "Helsinki", startTime: 1705210200000, endTime: 1705219200000 },
      { id: "11", booked: false, area: "Espoo", startTime: 1705222800000, endTime: 1705231800000 },
      { id: "12", booked: true, area: "Vantaa", startTime: 1705235400000, endTime: 1705244400000 },
      { id: "13", booked: false, area: "Oulu", startTime: 1705248000000, endTime: 1705257000000 },
      { id: "14", booked: true, area: "Lahti", startTime: 1705260600000, endTime: 1705269600000 },
      { id: "15", booked: false, area: "Porvoo", startTime: 1705273200000, endTime: 1705282200000 },
      { id: "16", booked: true, area: "Jyväskylä", startTime: 1705285800000, endTime: 1705294800000 }],
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
          // state.bookedShifts = action.payload.filter(shift => shift.booked);
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
          state.items = state.items.map(shift => 
            shift.id === action.payload.id ? { ...shift, booked: true } : shift);
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