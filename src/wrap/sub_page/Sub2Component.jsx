import React from "react";
import "./scss/sub.scss";
import Title from "./SubComponent/Title";
import SubMenu from "./SubComponent/SubMenu";
import ProductList from './SubComponent/ProductList';

import axios from "axios";

export default function Sub2Component({viewProductSetter}){

    const [state, setState] = React.useState({
        타이틀: {
            타이틀이미지: '',
            타이틀텍스트: ''
        },
        서브메뉴: {
            카테고리:'',
            브랜드:{
                가나다순: '',
                상품많은순: ''
            },
            가격:'',
            혜택:'',
            유형:'',
            특정상품제외:''
        },
        상품: ''

    });


    React.useEffect(()=>{

        axios({
            url:'./data/sub_page/sub2.json',
            method:'GET'
        })
        .then((res)=>{

            setState({
                타이틀: {
                    타이틀이미지: res.data.타이틀.타이틀이미지,
                    타이틀텍스트:  res.data.타이틀.타이틀텍스트
                },
                서브메뉴: {
                    카테고리: res.data.서브메뉴.카테고리,
                    브랜드: {
                        가나다순: res.data.서브메뉴.브랜드.가나다순,
                        상품많은순: res.data.서브메뉴.브랜드.상품많은순
                    },                    
                    가격: res.data.서브메뉴.가격,
                    혜택: res.data.서브메뉴.혜택,
                    유형: res.data.서브메뉴.유형,
                    특정상품제외: res.data.서브메뉴.특정상품제외
                },
                상품: res.data.상품
            })

        })
        .catch((err)=>{
            console.log( err );
        });

    },[]);


    return(
        <main id="sub2" className="sub">
            <section id="section1">
                <div className="container">

                   {/* 타이틀컴포넌트 */}
                   <Title  타이틀이미지={state.타이틀.타이틀이미지}  타이틀텍스트={state.타이틀.타이틀텍스트} />

                    <div className="content">
                        <div className="left">
                            <div className="gap">
                                <div className="header">
                                    <h3>필터</h3>
                                    <span className="on">
                                        <img src="./img/sub/icon_reflesh.svg" alt="" />
                                        <button>초기화</button>
                                    </span>
                                </div>

                                {/* 서브메뉴 컴포넌트 */}
                                <SubMenu 서브메뉴={state.서브메뉴} />


                            </div>
                        </div>
                        <div className="right">
                            <div className="header">
                                <h3>총 255건</h3>
                                <span>
                                    <a href="#"><em>추천순</em> <img src="./img/sub/icon_qustion.svg" alt="" /></a>
                                    <a href="#" className="on">신상품순</a>
                                    <a href="#">판매량순</a>
                                    <a href="#">혜택순</a>
                                    <a href="#">낮은 가격순</a>
                                    <a href="#">높은 가격순</a>
                                </span>
                            </div>
                            <div className="product-box">
                                
                                {/* 상품 리스트 컴포넌트 */}
                                <ProductList 상품={state.상품}  viewProductSetter={viewProductSetter} />

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}