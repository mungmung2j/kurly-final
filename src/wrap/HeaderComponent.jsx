import React from "react";
import './scss/Header.scss';
import {Link, Outlet} from "react-router-dom";
import { setIsDaumPostCode } from "../reducer/address_reducer";
import { useDispatch, useSelector } from "react-redux";

export default function HeaderComponent(){

    const dispatch = useDispatch();
    const selector=useSelector((state)=>(state));

    const [istooltipAddress, setIstooltipAddress] = React.useState(false);
    const [header, setHeader] = React.useState(false);

    React.useEffect(()=>{
        window.addEventListener('scroll', function(){
            let header = false;
            if(this.window.scrollY>=142){
                header = true;
            }
            else{
                header = false;
            }
            setHeader(header);
        });
    },[]);


    const onClickAddress=(e)=>{
        e.preventDefault();
        dispatch(setIsDaumPostCode(true));
    }

    // 툴팁메유 보임
    const onMouseEnterAddress=()=>{
        setIstooltipAddress(true);
    }

    // 툴팁메유 숨김
    const onMouseLeaveAddress=()=>{
        setIstooltipAddress(false);
    }

    //배송지 변경
    const onClickAddressSetup=(e)=>{
        e.preventDefault();
        dispatch(setIsDaumPostCode(true));    }

    return(
        <>
            <header id="header">
                <div className="row1">
                    <div className="container">
                        <div className="content">
                            <aside id="aside">
                                <Link to="/signup" className="on">회원가입</Link>
                                <i>|</i>                            
                                <Link to="/signin">로그인</Link>
                                <i>|</i>
                                <Link to="/notice">고객센터</Link>
                            </aside>
                        </div>
                    </div>
                </div>
                <div className="row2">
                    <div className="container">
                        <div className="content">
                            <div className="left">
                                <Link to="/"><span></span><strong>마켓컬리</strong></Link><i>|</i><a href="!#">뷰티컬리</a>
                            </div>
                            <div className={`center${header?' on':''}`}>
                                <input className={header?'on':''} type="text" name="search" id="search" placeholder="검색어를 입력해 주세요" />
                                <button className={header?'on':''}></button>
                            </div>
                            <div className={`right${header?' on':''}`}>
                                <a href="!#"  onMouseEnter={onMouseEnterAddress} >
                                    <img src="./img/header/icon_map_off.svg" alt=""/>
                                {
                                    istooltipAddress && (
                                    <div className="tooltip-address" onMouseLeave={onMouseLeaveAddress}>
                                        {
                                            selector.address.주소 === null && (
                                                <ul>
                                                    <li><em>배송지를 등록</em><span>하고</span></li>
                                                    <li><span>구매 가능한 상품을 확인하세요!</span></li>
                                                    <li>
                                                        <button>로그인</button>
                                                        <button onClick={onClickAddress}><img src="./img/daum_postcode/icon+zoom.png" alt="" /><span>주소등록</span></button>
                                                    </li>
                                                </ul>
                                            )
                                            
                                        }
                                        {
                                            selector.address.주소 !== null &&(
                                                <ul>
                                                    <li><span>{selector.address.주소.주소1} {selector.address.주소.주소2}</span></li>
                                                    <li><em>샛별배송</em></li>
                                                    <li>
                                                        <button className="addressUpdateBtn" onClick={onClickAddressSetup}>배송지 변경</button>
                                                    </li>
                                                </ul>
                                            )
                                            
                                        }
                                    </div>
                                    )
                                }
                                </a>
                                <a href="!#"><img src="./img/header/icon_heart_off.svg" alt="" /></a>
                                <a href="!#"><img src="./img/header/icon_cart_off.svg" alt="" /></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`row3${header?' on':''}`}>
                    <div className="container">
                        <div className="content">
                            <div className={`left${header?' on':''}`}>
                                <a href="!#">
                                    <span></span>
                                    <strong>카테고리</strong>
                                </a>
                            </div>
                            <div className={`center${header?' on':''}`}>
                                <nav>
                                    <Link to="/sub1">신상품</Link>
                                    <Link to="/sub2">베스트</Link>
                                    <Link to="/sub3">알뜰상품</Link>
                                    <Link to="/sub4">특가혜택</Link>
                                </nav>
                            </div>
                            <div className={`right${header?' on':''}`}>
                                <a href="!#"><em>샛별・택배</em> <span>배송안내</span></a>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <Outlet />
        </>
    )
}