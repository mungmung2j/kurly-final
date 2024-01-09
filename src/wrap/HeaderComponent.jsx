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
    const [iscat0, setIsCat0] = React.useState(false);
    const [iscat1, setIsCat1] = React.useState(false);
    const [state, setState] = React.useState({
        카테고리:[],
        컬러카테고리:[]
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
                    카테고리:res.data.category,
                    컬러카테고리:res.data.colcategory
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

    // 툴팁메유 숨김
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

    const onMouseEnterCat0=()=>{
        setIsCat0(true)
    }

    const onMouseLeaveCat0=()=>{
        setIsCat0(false)
    }
    const onMouseEnterCat1=()=>{
        setIsCat1(true)
    }

    const onMouseLeaveCat1=()=>{
        setIsCat1(false)
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
                                                <li onMouseEnter={onMouseEnterCat0} onMouseLeave={onMouseLeaveCat0}>
                                                    {iscat0 ?
                                                        (<img src={`./img/header/${state.컬러카테고리[0].img}`} alt="" />)
                                                        :(<img src={`./img/header/${state.카테고리[0].img}`} alt=""/>)                                                    
                                                    }
                                                    <span>{state.카테고리[0].name}</span>
                                                </li>
                                                <li onMouseEnter={onMouseEnterCat1} onMouseLeave={onMouseLeaveCat1}>
                                                    {iscat1 ?
                                                        (<img src={`./img/header/${state.컬러카테고리[1].img}`} alt="" />)
                                                        :(<img src={`./img/header/${state.카테고리[1].img}`} alt=""/>)                                                    
                                                    }
                                                    <span>{state.카테고리[1].name}</span>
                                                </li>
                                                <li>
                                                    <img src="./img/header/category2.webp" alt="" />
                                                    <span>수산·해물·건어물</span>
                                                </li>
                                                <li>
                                                    <img src="./img/header/category3.webp" alt="" />
                                                    <span>정육·가공육·계란</span>
                                                </li>
                                                <li>
                                                    <img src="./img/header/category4.webp" alt="" />
                                                    <span>국·반찬·메인요리</span>
                                                </li>
                                                <li>
                                                    <img src="./img/header/category5.webp" alt="" />
                                                    <span>간편식·밀키트·샐러드</span>
                                                </li>
                                                <li>
                                                    <img src="./img/header/category6.webp" alt="" />
                                                    <span>면·양념·오일</span>
                                                </li>
                                                <li>
                                                    <img src="./img/header/category7.webp" alt="" />
                                                    <span>생수·음료·커피</span>
                                                </li>
                                                <li>
                                                    <img src="./img/header/category8.webp" alt="" />
                                                    <span>간식·과자·떡</span>
                                                </li>
                                                <li>
                                                    <img src="./img/header/category9.webp" alt="" />
                                                    <span>베이커리</span>
                                                </li>
                                                <li>
                                                    <img src="./img/header/category10.webp" alt="" />
                                                    <span>유제품</span>
                                                </li>
                                                <li>
                                                    <img src="./img/header/category11.webp" alt="" />
                                                    <span>건강식품</span>
                                                </li>
                                                <li>
                                                    <img src="./img/header/category12.webp" alt="" />
                                                    <span>와인·위스키</span>
                                                </li>
                                                <li>
                                                    <img src="./img/header/category13.webp" alt="" />
                                                    <span>전통주</span>
                                                </li>
                                                <li>
                                                    <img src="./img/header/category14.webp" alt="" />
                                                    <span>주방용품</span>
                                                </li>
                                                <li>
                                                    <img src="./img/header/category15.webp" alt="" />
                                                    <span>생활용품·리빙</span>
                                                </li>
                                                <li>
                                                    <img src="./img/header/category16.webp" alt="" />
                                                    <span>가전제품</span>
                                                </li>
                                                <li>
                                                    <img src="./img/header/category17.webp" alt="" />
                                                    <span>가구·인테리어</span>
                                                </li>
                                                <li>
                                                    <img src="./img/header/category18.webp" alt="" />
                                                    <span>유아동</span>
                                                </li>
                                                <li>
                                                    <img src="./img/header/category19.webp" alt="" />
                                                    <span>스포츠·레져·캠핑</span>
                                                </li>
                                                <li>
                                                    <img src="./img/header/category20.webp" alt="" />
                                                    <span>반려동물</span>
                                                </li>
                                                <li>
                                                    <img src="./img/header/category21.webp" alt="" />
                                                    <span>럭셔리뷰티</span>
                                                </li>
                                                <li>
                                                    <img src="./img/header/category22.webp" alt="" />
                                                    <span>스킨케어·메이크업</span>
                                                </li>
                                                <li>
                                                    <img src="./img/header/category23.webp" alt="" />
                                                    <span>헤어·바디·구강</span>
                                                </li>
                                                <li>
                                                    <img src="./img/header/category24.webp" alt="" />
                                                    <span>컬리의 추천</span>
                                                </li>
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