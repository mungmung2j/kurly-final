import React from "react";
import './scss/section1.scss';
import axios from "axios";

export default function Section1Component(){  
    
    
    // REST API => AXIOS 구현
    const [state, setState] = React.useState({
        메인슬라이드: [],
        n: null
    });

    React.useEffect(()=>{
        axios({
            url: './data/intro/section1.json',
            method: 'GET',            
        })
        .then((res)=>{
            if(res.status===200){
                setState({
                    메인슬라이드: res.data.메인슬라이드,
                    n: res.data.메인슬라이드.length
                })                      
            }
        })
        .catch((err)=>{
            console.log( err );
        });
    },[]); // 빈배열 1회실행

    // 슬라이드 랩퍼 박스 21개의 전체 너비를 설정
    // 언제 상태변수 메인슬라이드에 배열에 들어오면 
    // 그 다음에 처리
   React.useEffect(()=>{
        
        refSlideWrap.current.style.width = `${(state.n+2)*100}%`; // 2100%

   },[state.메인슬라이드]); 


    // 돔요소 선택 : 유즈래프
    const refSlideWrap = React.useRef();  // 슬라이드 래퍼박스

    // 상태관리 => 메인슬라이드 구현
    const [cnt, setCnt] = React.useState(0);
    const [toggle, setToggle] = React.useState(false);
    const [isArrow, setIsArrow] = React.useState(false);
    
    // 상태변수 변경되면 동작하는  리액트 동적 이팩트
    React.useEffect(()=>{        
        // 자동타이머실행시 디버깅
        if(toggle===false){  // 리턴 없는상태
            mainSlide();
        }
        else{ // 리턴이 발생한상태 버그해결 => 디버깅
            setTimeout(()=>{
                setToggle(false); // 리턴 초기화
                mainSlide();  
            },100);  // 0.1초대기하고 그리고 실행하고 타임아웃
        }
    },[cnt]);

    // 메인슬라이드 함수
    const mainSlide=()=>{

        if(cnt>state.n){ // 리턴 : 처음으로 되돌아간다.    
            setToggle(true);       
            refSlideWrap.current.style.transition = 'none'; // 순간이동 하기위해서 none 논 또는 난
            refSlideWrap.current.style.transform = `translateX(${-1903*0}px)`; // 처음으로이동
            setCnt(1);            
        }
        else if(cnt<0){ // 리턴 : 마지막으로 되돌아간다.    
            setToggle(true);       
            refSlideWrap.current.style.transition = 'none'; // 순간이동 하기위해서 none
            refSlideWrap.current.style.transform = `translateX(${-1903*state.n}px)`; // 마지막으로이동(슬라이드전체개수)
            setCnt(state.n-1); // 19개(0 ~ 18)           
        }
        else { // 0 ~ 19
            refSlideWrap.current.style.transition = 'all 0.4s';
            refSlideWrap.current.style.transform = `translateX(${-1903*cnt}px)`;
        }

    }

    // 다음카운트
    const onClickNextArrowBtn=(e)=>{
        e.preventDefault();
        // 1씩 증가
        setCnt(cnt+1);
    }

    // 이전카운트
    const onClickPrevArrowBtn=(e)=>{
        e.preventDefault();
        // 1씩 감소
        setCnt(cnt-1);
    }   
    
    // 슬라이드 다음화살버튼, 이전화살버튼 보이기, 숨기기 이벤트
    const onMouseEnterSlideContainer=()=>{
        setIsArrow(true);
    }
    const onMouseLeaveSlideContainer=()=>{
        setIsArrow(false);
    }

    // 자동 타이머 3초간격 무한반복
    // 로딩시(홈페이지가 열릴 때) 
    // 단, 메인슬라이드에 마우스 올리면(마우스오버이면)
    // 타이머 정지
    // 즉, isArrow===true 화살 버튼이 보이면 자동타이머정지  
    // isArrow===false 화살 버튼이 안보이면 자동타이머실행

    React.useEffect(()=>{

        if(isArrow===false){ //isArrow] 변수값이 false 이면 자동실행
            let id = setInterval(function(){
                setCnt(cnt=>cnt+1);
            }, 3000)
            return () => clearInterval(id);
        }                
        
    },[isArrow]); // [isArrow] 변수값이 true 이면 일시정지

    return(
        <section id="section1">
            <div onMouseEnter={onMouseEnterSlideContainer} onMouseLeave={onMouseLeaveSlideContainer} className="slide-container">
                <div className="slide-view">
                    <ul ref={refSlideWrap} className="slide-wrap">
                        {
                            state.메인슬라이드.map((item,idx)=>{
                                if(idx===(state.n-1)){   // 마지막슬라이드 인덱스 18
                                    return(
                                        <li key={0} className={`slide slide${item.번호}`}>
                                            <a href="#"><img src={`./img/intro/section1/${item.이미지}`} alt="" /></a>
                                        </li>
                                    )
                                }
                            })  
                        }
                        { 
                            state.메인슬라이드.map((item,idx)=>{
                                return(
                                    <li key={item.번호} className={`slide slide${item.번호}`}>
                                        <a href="#"><img src={`./img/intro/section1/${item.이미지}`} alt="" /></a>
                                    </li>
                                )
                            })   
                        } 
                        {  
                            state.메인슬라이드.map((item,idx)=>{
                                if(idx===0){ // 첫번째 슬라이드
                                    return(
                                        <li key={item.번호+1} className={`slide slide${item.번호}`}>
                                            <a href="#"><img src={`./img/intro/section1/${item.이미지}`} alt="" /></a>
                                        </li>
                                    )
                                }
                            })     
                        }
                    </ul>
                </div>
                <a href="#" onClick={onClickNextArrowBtn} className={`next-arrow-btn${isArrow?' on':''}`}><img src="./img/intro/section1/icon_arrow_bg_gray.svg" alt="" /></a>
                <a href="#" onClick={onClickPrevArrowBtn} className={`prev-arrow-btn${isArrow?' on':''}`}><img src="./img/intro/section1/icon_arrow_bg_gray.svg" alt="" /></a>
                <span className="page-number-box"><strong>{(cnt+1) > state.n ? 1 : (cnt+1)}</strong><i>/</i><em>{state.n}</em> </span>
            </div>
            
        </section>
    )
}