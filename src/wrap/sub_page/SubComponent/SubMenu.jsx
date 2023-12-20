import React from 'react';

export default function SubMenu({서브메뉴}) {

    
    // 서브메뉴 체크박스 이벤트를 A링크 버튼을 이용 구현
    // 상태변수 배열처리
    const [state, setState] = React.useState({
        isSub1Chk: [],
        isSub21Chk: [],
        isSub22Chk: [],
        isSub3Chk: [],
        isSub4Chk: [],
        isSub5Chk: [],
        isSub6Chk: [],
        tab: true,
    });

    React.useEffect(()=>{
        for(let i=0; i<서브메뉴.카테고리.length; i++){
            state.isSub1Chk[i] = false;
        }
        for(let i=0; i<서브메뉴.브랜드.가나다순.length; i++){
            state.isSub21Chk[i] = false;
        }
        for(let i=0; i<서브메뉴.브랜드.상품많은순.length; i++){
            state.isSub22Chk[i] = false;
        }
        for(let i=0; i<서브메뉴.가격.length; i++){
            state.isSub3Chk[i] = false;
        }
        for(let i=0; i<서브메뉴.혜택.length; i++){
            state.isSub4Chk[i] = false;
        }
        for(let i=0; i<서브메뉴.유형.length; i++){
            state.isSub5Chk[i] = false;
        }
        for(let i=0; i<서브메뉴.특정상품제외.length; i++){
            state.isSub6Chk[i] = false;
        }
    },[서브메뉴]);  // 로딩시    



    // 체크박스 클릭시 체크변경
    // 서브1
    const onClickSub1Check=(e, n)=>{
        e.preventDefault();

        let arr = state.isSub1Chk;
        arr[n] = !arr[n];  // n번째 채크박스 선택 토글 기능 [체크 true] & [해제 false]

        setState({
            ...state,
            isSub1Chk: arr
        })       
    }

    // 서브2 탭버튼 클릭 이벤트
    const onClickTabBtn=(e)=>{
        e.preventDefault();

        setState({
            ...state,
            tab: !state.tab
        });
        
    }


    // 서브2-1
    const onClickSub21Check=(e, n)=>{
        e.preventDefault();

        let arr = state.isSub21Chk;
        arr[n] = !arr[n]; 

        setState({
            ...state,
            isSub21Chk: arr
        })       
    }
    // 서브2-2
    const onClickSub22Check=(e, n)=>{
        e.preventDefault();

        let arr = state.isSub22Chk;
        arr[n] = !arr[n]; 

        setState({
            ...state,
            isSub22Chk: arr
        })       
    }

    // 서브3
    const onClickSub3Check=(e, n)=>{
        e.preventDefault();

        let arr = state.isSub3Chk;
        arr[n] = !arr[n];  // n번째 채크박스 선택 토글 기능 [체크 true] & [해제 false]

        setState({
            ...state,
            isSub3Chk: arr
        })  
    } 

    // 서브4
    const onClickSub4Check=(e, n)=>{
        e.preventDefault();

        let arr = state.isSub4Chk;
        arr[n] = !arr[n];  // n번째 채크박스 선택 토글 기능 [체크 true] & [해제 false]

        setState({
            ...state,
            isSub4Chk: arr
        })  
    } 
    // 서브5
    const onClickSub5Check=(e, n)=>{
        e.preventDefault();

        let arr = state.isSub5Chk;
        arr[n] = !arr[n];  // n번째 채크박스 선택 토글 기능 [체크 true] & [해제 false]

        setState({
            ...state,
            isSub5Chk: arr
        })  
    } 
    // 서브6
    const onClickSub6Check=(e, n)=>{
        e.preventDefault();

        let arr = state.isSub6Chk;
        arr[n] = !arr[n];  // n번째 채크박스 선택 토글 기능 [체크 true] & [해제 false]

        setState({
            ...state,
            isSub6Chk: arr
        })  
    }

    return (
        <nav className="nav">
            <ul>
                <li>
                    <a href="!#"><span>카테고리</span><i><img src="./img/sub/icon_arrow.svg" alt="" /></i></a>
                    <div className="sub sub1">
                        <ul>
                            {
                                서브메뉴.카테고리.length > 0 && (
                                    서브메뉴.카테고리.map((item, idx)=>{
                                        return(
                                            <li key={idx}>
                                                <a href="!#" onClick={(e)=>onClickSub1Check(e, idx)} className={state.isSub1Chk[idx]?'on':''}><span>{item}</span><em>40</em></a>
                                            </li>
                                        )
                                    })
                                )

                            }
                        </ul>
                    </div>
                </li>
                <li>
                    <a href="!#"><span>브랜드</span><i><img src="./img/sub/icon_arrow.svg" alt="" /></i></a>
                    <button className={`tab-btn1${state.tab?' on':''}`} onClick={onClickTabBtn}>가나다순</button>                    
                    <button className={`tab-btn2${!state.tab?' on':''}`} onClick={onClickTabBtn}>상품많은순</button>                    
                    {
                        state.tab && (
                            <div className="sub sub2 sub2-1">
                                <ul>
                                    {
                                        서브메뉴.브랜드.가나다순.length > 0 && (
                                            서브메뉴.브랜드.가나다순.map((item, idx)=>{
                                                return(
                                                    <li key={idx}>
                                                        <a href="!#" onClick={(e)=>onClickSub21Check(e, idx)} className={state.isSub21Chk[idx]?'on':''}><span>{item}</span><em>40</em></a>
                                                    </li>
                                                )
                                            })
                                        )

                                    }
                                </ul>
                            </div>
                        )
                    }

                    {
                        !state.tab && (
                            <div className="sub sub2 sub2-2">
                                <ul>
                                    {
                                        서브메뉴.브랜드.상품많은순.length > 0 && (
                                            서브메뉴.브랜드.상품많은순.map((item, idx)=>{
                                                return(
                                                    <li key={idx}>
                                                        <a href="!#" onClick={(e)=>onClickSub22Check(e, idx)} className={state.isSub22Chk[idx]?'on':''}><span>{item}</span><em>40</em></a>
                                                    </li>
                                                )
                                            })
                                        )

                                    }
                                </ul>
                            </div>
                        )
                    }

                </li>
                <li>
                    <a href="!#"><span>가격</span><i><img src="./img/sub/icon_arrow.svg" alt="" /></i></a>
                    <div className="sub sub3">
                        <ul>
                            {
                                서브메뉴.가격.length > 0 && (
                                    서브메뉴.가격.map((item, idx)=>{
                                        return(
                                            <li key={idx}>
                                                <a href="!#" onClick={(e)=>onClickSub3Check(e, idx)} className={state.isSub3Chk[idx]?'on':''}><span>{item}</span><em>40</em></a>
                                            </li>
                                        )
                                    })
                                )

                            }
                        </ul>
                    </div>
                </li>
                <li>
                    <a href="!#"><span>혜택</span><i><img src="./img/sub/icon_arrow.svg" alt="" /></i></a>
                    <div className="sub sub4">
                        <ul>
                            {
                                서브메뉴.혜택.length > 0 && (
                                    서브메뉴.혜택.map((item, idx)=>{
                                        return(
                                            <li key={idx}>
                                                <a href="!#" onClick={(e)=>onClickSub4Check(e, idx)} className={state.isSub4Chk[idx]?'on':''}><span>{item}</span><em>40</em></a>
                                            </li>
                                        )
                                    })
                                )

                            }
                        </ul>
                    </div>
                </li>
                <li>
                    <a href="!#"><span>유형</span><i><img src="./img/sub/icon_arrow.svg" alt="" /></i></a>
                    <div className="sub sub5">
                        <ul>
                            {
                                서브메뉴.유형.length > 0 && (
                                    서브메뉴.유형.map((item, idx)=>{
                                        return(
                                            <li key={idx}>
                                                <a href="!#" onClick={(e)=>onClickSub5Check(e, idx)} className={state.isSub5Chk[idx]?'on':''}><span>{item}</span><em>40</em></a>
                                            </li>
                                        )
                                    })
                                )

                            }
                        </ul>
                    </div>
                </li>
                <li>
                    <a href="!#"><span>특정상품제외</span><i><img src="./img/sub/icon_arrow.svg" alt="" /></i></a>
                    <div className="sub sub6">
                        <ul>
                            {
                                서브메뉴.특정상품제외.length > 0 && (
                                    서브메뉴.특정상품제외.map((item, idx)=>{
                                        return(
                                            <li key={idx}>
                                                <a href="!#" onClick={(e)=>onClickSub6Check(e, idx)} className={state.isSub6Chk[idx]?'on':''}><span>{item}</span><em>40</em></a>
                                            </li>
                                        )
                                    })
                                )

                            }
                        </ul>
                    </div>
                </li>
            </ul>
        </nav>
    );
};
