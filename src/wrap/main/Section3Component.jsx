import React from "react";
import './scss/slide20.scss';
import './scss/section3.scss';
import axios from "axios";
import Section3ComponentChild from "./Section3ComponentChild";

export default function Section3Component({viewProductSetter}){

    const [state, setState] = React.useState({
        타임세일: '1970-01-01 00:00:00',
        세일시간: 24,
        캡션: {},
        상품: []
    });

    
    React.useEffect(()=>{

        axios({
            url:'./data/intro/section3.json',
            method:'GET'
        })
        .then((res)=>{
            if(res.status===200){
                setState({    
                    타임세일:res.data.section.caption.타임세일,
                    세일시간:res.data.section.caption.세일시간,                
                    캡션: res.data.section.caption,
                    상품: res.data.section.product,
                })
            }
        })
        .catch((err)=>{
            console.log( err );
        });

    },[]);


    
    //1. 최근 본 상품 클릭 이벤트
    const onClickViewProduct=(e, item, imgPath)=>{
        e.preventDefault();
        
        // 최상위 컴포넌트의 있는 메서드에게 전달
        viewProductSetter(item, imgPath);
    }

 
    return(
        <section id="section3"  className="intro-slide20">
            <div className="container">

                <div className="content">
                    <div className="slide-container">
                        <div className="slide-view">
                            <ul className="slide-wrap">

                                <Section3ComponentChild 타임세일={state.타임세일} 세일시간={state.세일시간}  캡션={state.캡션} />

                                {
                                 state.상품.map((item)=>{
                                    return(
                                        <li className="slide slide2" key={item.제품코드}>
                                            <div className="gap"   onClick={(e)=>onClickViewProduct(e, item, './img/intro/section3/')}>
                                                <div className="img-box"><img src={`./img/intro/section3/${item.제품이미지}`} alt="" /></div>
                                                <div className="txt-box">
                                                    <a href="!#"><img src="./img/intro/section5/icon_cart_black.svg" alt="" />담기</a>
                                                    <h3>{item.제품명}</h3>
                                                    <h4>{item.정가}원</h4>
                                                    <h5><strong>{item.할인율*100}%</strong> <em>{item.정가*((1-item.할인율))}원</em></h5>
                                                    <h6><img src="./img/intro/section5/icon_mal.svg" alt="" />{item.리뷰}</h6>
                                                </div>
        
                                            </div>
                                        </li>
                                    )
                                 })   
                                
                                }

                            </ul>
                        </div>
                       
                    </div>
                </div>
            </div>
        </section>
    )
}