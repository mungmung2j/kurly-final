import React from 'react';

export default function BannerList({상품}) {      
    return (
        <ul className="banner-wrap">
            {
                상품.length>0 && (
                    상품.map((item, idx)=>{
                        return(
                            <li className={`list list${idx+1}`} key={item.제품코드}>
                                <div className="gap">
                                    <div className="img-box">
                                        <a href="!#">
                                            <img src={`./img/sub/sub4/${item.제품이미지}`} alt="" />
                                        </a>
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
