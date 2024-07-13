import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Shift {
  userId: number;
  startTime: string;
}

interface ShiftState {
  currentShift: Shift | null;
}

const initialState: ShiftState = {
  currentShift: null,
};

const shiftSlice = createSlice({
  name: "shift",
  initialState,
  reducers: {
    openShift: (state, action: PayloadAction<Shift>) => {
      state.currentShift = action.payload;
    },
    closeShift: (state) => {
      state.currentShift = null;
    },
  },
});

export const { openShift, closeShift } = shiftSlice.actions;
export default shiftSlice.reducer;
