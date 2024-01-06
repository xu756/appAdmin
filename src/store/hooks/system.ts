import { createSlice } from '@reduxjs/toolkit';
export const systemStore = createSlice({
    name: 'system',
    initialState: {
        name: 'system',
        menuWidth: 200,
    },
    reducers: {
        setMenuWidth: (state, action) => {
            state.menuWidth = action.payload;
        },
    },
});
export const { setMenuWidth } = systemStore.actions;
