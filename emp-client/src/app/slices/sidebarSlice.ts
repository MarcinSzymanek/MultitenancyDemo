import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface SidebarState {
  selectedIdx: number;
}

const initialState: SidebarState = {
  selectedIdx: 0,
};

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    setSelected(state, action: PayloadAction<number>) {
      state.selectedIdx = action.payload;
    },
  },
});

export const { setSelected } = sidebarSlice.actions;
export default sidebarSlice.reducer;
