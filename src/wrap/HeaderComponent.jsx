import React from "react";
import './scss/Header.scss';
import {Link, Outlet} from "react-router-dom";
import { setIsDaumPostCode } from "../reducer/address_reducer";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

export default function HeaderComponent(){

    const dispatch = useDispatch();
    const selector=useSelector((state)=>(state));

    const [istooltipAddress, setIstooltipAddress] = React.useState(false);
    const [header, setHeader] = React.useState(false);
    const [iscategoryMenu, setIsCategoryMenu] = React.useState(false);
    const [isCat, setIsCat] = React.useState(Array(25).fill(false));
    const [state, setState] = React.useState({
        카테고리:[]
    });

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

    React.useEffect(()=>{
        axios({
            url:'./data/header/header.json',
            method:'GET'
        })
        .then((res)=>{
            if(res.status===200){
                setState({
                    카테고리:res.data.category
                })
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    })

    const onClickAddress=(e)=>{
        e.preventDefault();
        dispatch(setIsDaumPostCode(true));
    }

    // 툴팁메뉴 보임
    const onMouseEnterAddress=()=>{
        setIstooltipAddress(true);
    }

    // 툴팁메뉴 숨김
    const onMouseLeaveAddress=()=>{
        setIstooltipAddress(false);
    }

    //배송지 변경
    const onClickAddressSetup=(e)=>{
        e.preventDefault();
        dispatch(setIsDaumPostCode(true));
    }

    //카테고리메뉴 보임
    const onMouseEnterCategory=()=>{
        setIsCategoryMenu(true);
    }

    //카테고리메뉴 숨김
    const onMouseLeaveCategory=()=>{
        setIsCategoryMenu(false);
    }

    const onMouseEnterCat=(index)=>{
        const newIsCat = Array(25).fill(false);
        newIsCat[index] = true;
        setIsCat(newIsCat);
    }

    const onMouseLeaveCat=()=>{
        const newIsCat = Array(25).fill(false);
        setIsCat(newIsCat);
    }
    
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
                                <a href="#">고객센터</a>
                            </aside>
                        </div>
                    </div>
                </div>
                <div className="row2">
                    <div className="container">
                        <div className="content">
                            <div className="left">
                                <Link to="/"><span></span><strong>마켓컬리</strong></Link><i>|</i><a href="#">뷰티컬리</a>
                            </div>
                            <div className={`center${header?' on':''}`}>
                                <input className={header?'on':''} type="text" name="search" id="search" placeholder="검색어를 입력해 주세요" />
                                <button className={header?'on':''}></button>
                            </div>
                            <div className={`right${header?' on':''}`}>
                                <a href="#"  onMouseEnter={onMouseEnterAddress} >
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
                                <a href="#"><img src="./img/header/icon_heart_off.svg" alt="" /></a>
                                <a href="#"><img src="./img/header/icon_cart_off.svg" alt="" /></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`row3${header?' on':''}`}>
                    <div className="container">
                        <div className="content">
                            <div className={`left${header?' on':''}`}>
                                <a href="#" onMouseEnter={onMouseEnterCategory}>
                                    <span></span>
                                    <strong>카테고리</strong>
                                    {iscategoryMenu &&
                                        (<div className="category" onMouseLeave={onMouseLeaveCategory}>
                                            <ul>
                                                {
                                                    state.카테고리.map((categoryData, index)=>{
                                                        return(
                                                        <li key={index} onMouseEnter={()=>onMouseEnterCat(index)} onMouseLeave={()=>onMouseLeaveCat(index)}>
                                                            {isCat[index] ?
                                                                (<img src={`./img/header/${categoryData.col}`} alt="" />)
                                                                :(<img src={`./img/header/${categoryData.img}`} alt=""/>)                                                    
                                                            }
                                                            <span>{categoryData.name}</span>
                                                        </li>
                                                        );
                                                    })
                                                }
                                                

                                            </ul>
                                        </div>)
                                    }
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
                                <a href="#"><em>샛별・택배</em> <span>배송안내</span></a>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <Outlet />
        </>
    )
}