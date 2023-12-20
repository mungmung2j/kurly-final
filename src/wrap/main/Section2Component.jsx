import React from "react";
import './scss/slide20.scss';
import './scss/section2.scss';
import axios from "axios";

export default function Section2Component({viewProductSetter}){

    const [state, setState] = React.useState({
        캡션:{},
        상품:[]
    });

    // 로딩시 
    React.useEffect(()=>{

        // REST API
        axios({
            url:'./data/intro/section2.json',
            method:'GET'
        })
        .then((res)=>{
            if(res.status===200){
                setState({
                    캡션: res.data.section.caption,
                    상품: res.data.section.product
                });
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
        <section id="section2"  className="intro-slide20">
            <div className="container">

                <div className="content">
                    <div className="slide-container">
                        <div className="slide-view">
                            <ul className="slide-wrap">

                                <li className="slide slide1">
                                    <div className="gap">
                                        <h2>{state.캡션.캡션1}</h2>
                                        <h3>{state.캡션.캡션2}</h3>
                                        <h4>{state.캡션.캡션3}</h4>
                                    </div>
                                </li>

                                {
                                    state.상품.map((item)=>{
                                        return(
                                            <li className="slide slide2" key={item.제품코드}>
                                                <div className="gap" onClick={(e)=>onClickViewProduct(e, item, './img/intro/section2/')}>
                                                    <div className="img-box"><img src={`./img/intro/section2/${item.제품이미지}`} alt="" /></div>
                                                    <div className="txt-box">
                                                        <a href="!#"><img src="./img/intro/section5/icon_cart_black.svg" alt="" />담기</a>
                                                        <h3>{item.제품명}</h3>
                                                        <h4>{item.정가}원</h4>
                                                        <h5><strong>{item.할인율*100}%</strong> <em>{item.정가*(1-item.할인율)}원</em></h5>
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