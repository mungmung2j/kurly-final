import React from "react";
import './scss/quickmenu.scss';


export default function QuickMenuComponent({product}){    

    const [quickMenu, setQuickMenu] = React.useState(false);
    const [viewProduct, setViewProduct] = React.useState(false);
    
    React.useEffect(()=>{

        if(product.length>0){
            setViewProduct(true);
        }
        else{
            setViewProduct(false);
        }


        window.addEventListener('scroll', function(){
            let quickMenu = false;
                if(window.scrollY>=460){
                    quickMenu=true;                   
                }
                else {
                    quickMenu=false;
                }
                // 상태변수 변경 세터함수1회설정
                setQuickMenu(quickMenu);
        }); 

    },[product]);

    // 퀵메뉴 슬라이드 구현
    //0. 상태관리 변수 카운트변수
    const [cnt, setCnt] = React.useState(0);

    //1. 선택자 유즈래프 useRef() 
    const refSlideWrap = React.useRef();

    //2-1. 다음 슬라이드 이미지
    const onClickNext=(e)=>{
        e.preventDefault();
        let n = product.length-3;   // 5(전체이미지개수) - 3 = 2 끝  10-3 = 7
        if(cnt<n){
            setCnt(cnt+1); 
        }
    }
    //2-2. 이전 슬라이드 이미지
    const onClickPrev=(e)=>{
        e.preventDefault();
        if(cnt>0){
            setCnt(cnt-1);  // 0 끝
        }
    }

    //3. 카운트 증감이 발생하면 동작하는 리액트 이펙트 구현
    React.useEffect(()=>{
        // 예외처리: 이유 로딩시 선택자를 인식하는데 느리기 때문에
        try{
            refSlideWrap.current.style.transition = 'all 0.3s';
            refSlideWrap.current.style.transform = `translateY(${-85*cnt}px)`;
        }
        catch(e){}
        
    },[cnt]);



    return(
        <div id="quickMenu" className={quickMenu?'on':''}>
            <div className="container">

                <div className="top">
                    <a href="#"><img src="./img/intro/deliveryInfo.png" alt="" /></a> 
                </div>

                <div className="center">
                    <a href="#">등급별 혜택</a>
                    <a href="#">레시피</a>
                </div>

                {
                    viewProduct  &&  (
                        <div className="bottom">
                            <div className="up">
                                <a href="#" onClick={onClickPrev}><img src="./img/quick_menu/icon_up.svg" alt="" /></a> 
                                <h2>최근본상품</h2>
                            </div>
                            <div className="list">
                                <ul ref={refSlideWrap}>
                                    {
                                        product.map((item, idx)=>{
                                            return(
                                                <li key={idx}>
                                                    <a href="#">
                                                        <img src={item.제품이미지} alt="" />
                                                    </a>
                                                </li> 
                                            )
                                        })
                                       
                                    }
                                </ul>
                            </div>
                            <div className="down">
                            <a href="#"  onClick={onClickNext}><img src="./img/quick_menu/icon_up.svg" alt="" /></a> 
                            </div>
                        </div>
                    )
                }

            </div>
        </div>
    )
}