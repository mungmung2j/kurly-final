import React from 'react';

export default function Container({viewProductSetter,캡션1, 캡션2, product,subject}) {



    // 섹션 슬라이드 구현

    const refSlideWrap = React.useRef();
    const [cnt, setCnt] = React.useState(0);

    const mainSlide=()=>{
        refSlideWrap.current.style.transition = `all 0.5s`;
        refSlideWrap.current.style.transform = `translateX(${-1068*cnt}px)`;
    }

    React.useEffect(()=>{
        mainSlide();
    },[cnt]);


    const onClickNextArrowBtn=(e)=>{
        e.preventDefault();
        if(cnt>=4){
            setCnt(4);
        }
        else{
            setCnt(cnt+1);
        }       
    }
    const onClickPrevArrowBtn=(e)=>{
        e.preventDefault();        
        if(cnt<=0){
            setCnt(0);
        }
        else{
            setCnt(cnt-1);
        }
    }



    //1. 최근 본 상품 클릭 이벤트
    const onClickViewProduct=(e, item, imgPath)=>{
        e.preventDefault();
        console.log( item )
        console.log( imgPath )
        // 최상위 컴포넌트의 있는 메서드에게 전달
        viewProductSetter(item, imgPath);
    }



    return (
        <div className="container">
            <div className="title">
                <h2><a href="!#">{캡션1}</a></h2>
                <h3>{캡션2}</h3>
            </div>
            <div className="content">
                <div className="slide-container">
                    <div className="slide-view">
                        <ul ref={refSlideWrap} className="slide-wrap">
                            {
                                product.map((item, idx)=>{
                                    return(
                                        <li className={`slide slide${idx+1}`}  key={item.제품코드}>
                                            <div className="gap"  onClick={(e)=>onClickViewProduct(e, item, `./img/intro/${subject}/`)} >
                                                <div className="img-box"><img src={`./img/intro/${subject}/${item.제품이미지}`} alt="" /></div>
                                                <div className="txt-box">
                                                    <a href="!#"><img src={`./img/intro/${subject}/icon_cart_black.svg`} alt="" />담기</a>
                                                    <h3>{item.제품명}</h3>
                                                    <h4>{item.정가}원</h4>
                                                    <h5><strong>20%</strong> <em>{item.정가*(1-item.할인율)}원</em></h5>
                                                    <h6><img src={`./img/intro/${subject}/icon_mal.svg`} alt="" />{item.리뷰}</h6>
                                                </div>
                                            </div>
                                        </li>
                                    )
                                })    
                            }
                        </ul>
                    </div>

                    <a href="!#" onClick={onClickNextArrowBtn} className="next-arrow-btn blind">next-arrow-btn</a>
                    <a href="!#" onClick={onClickPrevArrowBtn} className="prev-arrow-btn blind">prev-arrow-btn</a>

                </div>
            </div>
        </div>
    );
};
