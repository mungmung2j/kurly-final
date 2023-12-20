import React from "react";
import axios from "axios";

export default function Section3ComponentChild({캡션, 타임세일, 세일시간}){

    const [H, setH] = React.useState(0); // Houre  시
    const [M, setM] = React.useState(0); // Minute 분
    const [S, setS] = React.useState(0); // Second 초

    React.useEffect(()=>{

        let start = new Date( 타임세일 );
        let end   = start.setHours( start.getHours() + 세일시간 ); // 타임세일 48시간(2일간)
        let count = end-new Date();
        let H=0;
        let M=0;
        let S=0;
        let id=0;

        id = setInterval(function(){

            // 타임세일 종료싯점
            if(new Date() >= end){ 
                setH(0);
                setM(0);
                setS(0);
                clearInterval(id);
            }
            else{
                count = end-new Date();

                H = Math.floor(count/(60*60*1000)) % 48;   // 남은시 세일기간(시간) 48
                M = Math.floor(count/(60*1000)) % 60;   // 남은분 1시간 60분
                S = Math.floor(count/(1000)) % 60;   // 남은초 1분 60초

                setH(H);
                setM(M);
                setS(S);
            }

            
        }, 1000); // 1초간격으로 반복 실행
            
    },[타임세일, 세일시간]); // 빈배열 때문에 1회만 실행

    return(
        <li className="slide slide1">
            <div className="gap">
                <h2>{캡션.캡션1}</h2>
                <h3>{캡션.캡션2}<br/><br/>{캡션.캡션3}</h3>
                <div>
                    <span><img src="./img/intro/section3/icon_timer.svg" alt="" /></span>
                    <strong>{H<10?`0${H}`:H}</strong>
                    <i>:</i>
                    <strong>{M<10?`0${M}`:M}</strong>
                    <i>:</i>
                    <strong>{S<10?`0${S}`:S}</strong>
                </div>
                <h4>{캡션.캡션4}</h4>
            </div>
        </li>
    )
}