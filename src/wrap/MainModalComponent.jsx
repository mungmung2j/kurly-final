import React from "react";
import './scss/mainModal.scss';

export default function MainModalComponent({modalCloseMethod}){

    // 오늘 하루 안보기
    const onClickOneDayClose=(e)=>{
        e.preventDefault();
        modalCloseMethod(1);
    }
    
    // 모달 닫기
    const onClickClose=(e)=>{
        e.preventDefault();
        modalCloseMethod();
    }

    return(
        <div id="mainModal">
           <div className="container">
                <div className="content">
                    <div className="modal-wrap">
                        <ul>
                            <li>
                                <div className="img-box">
                                    <img src="./img/intro/main_modal/8a80e15a-6dd8-4ab8-a0ba-2d0176b1a76c.jpg" alt="" />
                                </div>
                            </li>
                            <li>
                                <div className="button-box">
                                    <button onClick={onClickOneDayClose}>오늘 하루 안보기</button>
                                    <button onClick={onClickClose}>닫기</button>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
           </div>
        </div>
    )
}