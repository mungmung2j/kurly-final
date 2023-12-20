//topModal_reducer.js
import { createSlice } from "@reduxjs/toolkit";

const topModalReducer = createSlice({
    name:'topModal',
    initialState: {
        topModal: true
    },
    reducers: {
        topModal: (state, action) => {
            console.log( 'action' );
            console.log( action );
            state.topModal = action.payload
        }
    }
});

export default topModalReducer.reducer;
export const { topModal } = topModalReducer.actions;