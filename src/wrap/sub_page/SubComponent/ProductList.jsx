import React from 'react';

export default function Title({상품, viewProductSetter}) {
    
        //1. 최근 본 상품 클릭 이벤트
        const onClickViewProduct=(e, item, imgPath)=>{
            e.preventDefault();
            
            // 최상위 컴포넌트의 있는 메서드에게 전달
            viewProductSetter(item, imgPath);
        }
    

    return (
        <ul className="slide-wrap">
            {
                상품.length>0 && (
                    상품.map((item, idx)=>{
                        return(
                            <li className={`slide slide${idx+1}`} key={item.제품코드}>
                                <div className="gap" onClick={(e)=>onClickViewProduct(e, item, './img/sub/sub1/')}>
                                    <div className="img-box"><img src={`./img/sub/sub1/${item.제품이미지}`} alt="" /></div>
                                    <div className="txt-box">
                                        <a href="!#"><img src="./img/intro/section5/icon_cart_black.svg" alt="" />담기</a>
                                        <h6>{item.배송}</h6>
                                        <h3>{item.제품명}</h3>
                                        <h6>{item.상품설명}</h6>
                                        {
                                            item.할인율 > 0 && <h4>{item.정가.toLocaleString('ko-KR')}원</h4>
                                        }
                                        <h5>
                                            {
                                               item.할인율 > 0 && <strong>{Math.round(item.할인율*100)}%</strong> 
                                            }
                                            <em className={item.할인율===0?`on`:''}>{Math.round(item.정가*(1-item.할인율)).toLocaleString('ko-KR')}원</em>
                                        </h5>
                                        <p>{item.판매처}</p>
                                        <h6><img src="./img/intro/section5/icon_mal.svg" alt="" />{item.리뷰}</h6>
                                    </div>

                                </div>
                            </li>
                        )
                    })    
                )    
            }
        </ul>
    );
};
