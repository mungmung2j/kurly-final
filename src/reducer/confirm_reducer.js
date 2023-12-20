// confirm_reducer.js
import { createSlice } from "@reduxjs/toolkit";

const confirmReducer = createSlice({
    name: 'confirm',
    initialState: {
        isConfirmModal: false,
        confirmModalMsg: '',
    },
    reducers: {
        confirm: (state,action)=>{
            state.isConfirmModal = action.payload.isConfirmModal
            state.confirmModalMsg = action.payload.confirmModalMsg
        }
    }
});

export default confirmReducer.reducer;
export const {confirm} = confirmReducer.actions;