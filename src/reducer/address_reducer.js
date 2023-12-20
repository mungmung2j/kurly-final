import { createSlice } from "@reduxjs/toolkit";

const addressReducer = createSlice({
    name:'postCode',
    initialState: {
        isDaumPostCode: false, //주소 검색 모달창 열기닫기
        주소: null
    },
    reducers: {
        setIsDaumPostCode: (state, action)=>{
            state.isDaumPostCode = action.payload
        },
        setAddress: (state, action)=>{
            state.주소 = action.payload
        }
    }
});

export default addressReducer.reducer;  // 셀렉터 
export const {setIsDaumPostCode, setAddress} = addressReducer.actions; // 디스패쳐(setIsDaumPostCode(페이로드))