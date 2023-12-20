import React from "react";
import './scss/TopModal.scss';
import { useDispatch, useSelector } from "react-redux";
import { topModal } from "../reducer/topModal_reducer";

export default function TopModalComponent(){

    const dispatch = useDispatch();
    const selector = useSelector((state)=>state);


    // 탑모달 버튼 클릭이벤트
    const onClickTopModalClose=(e)=>{
        e.preventDefault();        
        let toDay = new Date(); // 현재날짜시간
        let expires = '';       // 만료일        
        // toDay.setDate( toDay.getDate()+3 ); // 탑모달 오늘지금날짜 + 3일간 열리지 않음        
        // toDay.setMinutes( toDay.getMinutes()+1 ); // 탑모달 오늘지금날짜 + 1분간 열리지 않음        
        toDay.setDate( toDay.getDate()+1 ); // 1일간 열리지 않음

        expires = toDay.getTime(); // 1970-01-01 ~ 날짜까지의 1/1000초 단위 숫자  1695189283290        
        // 만료기한정한 로컬스토레이지 키, 키값 설정
        localStorage.setItem('topmodal', expires); // 로컬스토레이지(localstorage) 저장소에 저장하기

        // 리덕스
        dispatch(topModal(false));
    }

    return(
        <div id="topModal">
            <div className="container">
                <div className="content">
                    <a href="https://www.kurly.com/shop/event/kurlyEventV2.php?lego=event/2023/0911/join/coupon"><span>지금 가입하고, </span><strong>1만원 할인 쿠폰</strong><span> 받아가세요!</span></a>
                    <button onClick={onClickTopModalClose}><img src="./img/top_modal/close.svg" alt="" /></button>
                </div>
            </div>
        </div>
    )
}