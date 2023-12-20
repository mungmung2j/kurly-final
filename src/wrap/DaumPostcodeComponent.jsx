import React from 'react';
import './scss/DaumPostcode.scss';
import { useDispatch } from 'react-redux';
import { setIsDaumPostCode } from '../reducer/address_reducer';
import { setAddress } from '../reducer/address_reducer';
import  DaumPostcode  from 'react-daum-postcode';

export default function DaumPostcodeComponent() {

    const dispatch = useDispatch();

    const [state, setState] = React.useState({
        주소1:'',
        주소2:''
    });

    // 카카오 주소검색 API 온컴플리트 메서드 이벤트
    const onCompletePostCode=(data)=>{
        // console.log( '주소검색 결과 데이터 가져오기' );
        // console.log( data );
        // console.log( data.zonecode );
        // console.log( data.address);
        // console.log( data.addressEnglish);
        // console.log( data.roadAddress);
        // console.log( data.jibunAddress);
        // console.log( data.bcode);
        setState({
            ...state,
            주소1: `${data.zonecode} ${data.address}`,
        })
    }



    // 주소1 입력상자 이벤트
    const onChangeAddr1=(e)=>{
        setState({
            ...state,
            주소1: e.target.value
        })
    }

    // 주소2 입력상자 이벤트
    const onChangeAddr2=(e)=>{
        setState({
            ...state,
            주소2: e.target.value
        })
    }

    const onClickClose=(e)=>{
        e.preventDefault();
        dispatch(setIsDaumPostCode(false));
    }

    const onClickAddressSave=(e)=>{
        e.preventDefault();
        // 리덕스 상태관리에 저장
        const obj = {
            주소1: state.주소1,
            주소2: state.주소2
        }
        dispatch(setAddress(obj)); //리덕스 주소를 저장
        //브라우저 저장에 저장하기 : 브라우저 닫기하면 사라지는 세션스토리지에 저장
        sessionStorage.setItem('KURLY_ADDRESS', JSON.stringify(obj))
        dispatch(setIsDaumPostCode(false)); //주소 검색 모달창 닫기
    }

    // 재검색 버튼 클릭이벤트
    const onClickReAddress=(e)=>{
        e.preventDefault();
        // 1단계 닫기
        dispatch(setIsDaumPostCode(false));
        // 비동기식 2단계 열기
        setTimeout(()=>{
            dispatch(setIsDaumPostCode(true));
        },100); // 0.1초 후에 실행
    
    }



    // DaumPostcode 내부스타일
    const daumPostcodeStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 2
    }

    return (
        <div id='daumPostcode'>
            <div id="modal">
                
                <div className="container">
                    {/* 창제목 */}
                    <header className="title">
                        <div className="left">
                            <h1>
                                <img src="./img/intro/favicon.ico" alt="" />
                                <span>컬리 - 마켓컬리/뷰티컬리</span>
                            </h1>
                        </div>
                        <div className="right">
                            <button onClick={onClickClose}><span>×</span></button>
                        </div>
                    </header>
                     
                    {/* 주소검색  */}
                    <div className="content">
                        {/* 카카오주소검색 API 컴포넌트 - 전면 zIndex 2 */}  
                        <DaumPostcode  
                            style={daumPostcodeStyle} 
                            onComplete={onCompletePostCode}
                        />
                        {/* 주소검색완료 후 저장되는 입력상자 박스 - 후면 zIndex 1 */}
                        <ul>                            
                            <li>
                                <div className="gap row1">
                                    <h2><strong>샛별배송</strong><span> 지역입니다.</span></h2>
                                    <h3>매일 새벽, 문 앞까지 신선함을 전해드려요.</h3>
                                </div>
                            </li>
                            <li>
                                <div className="gap row2">
                                    <input 
                                        type="text" 
                                        name='addr1' 
                                        id='addr1'
                                        onChange={onChangeAddr1}
                                        value={state.주소1}
                                    />
                                    <button onClick={onClickReAddress}><img src="./img/intro/icon_zoom.svg" alt="" /><span>재검색</span></button>
                                </div>
                            </li>
                            <li>
                                <div className="gap row3">
                                    <input 
                                        type="text" 
                                        name='addr2' 
                                        id='addr2'
                                        onChange={onChangeAddr2}
                                        value={state.주소2}
                                        placeholder='나머지 주소를 입력하세요'
                                    />
                                </div>
                            </li>
                            <li>
                                <div className="gap row4">
                                    <p>
                                        ※ 저장된 배송지는 최대 7일 간 임시 저장 후 자동 삭제됩니다.<br />
                                        로그인 할 경우, 회원님의 배송지 목록에 추가됩니다.
                                    </p>
                                </div>
                            </li>
                            <li>
                                <div className="gap row5">
                                    <button type='button' onClick={onClickAddressSave}>저장</button>
                                </div>
                            </li>
                            <li>
                                <div className="gap row6">
                                    <h4>
                                        <img src="./img/daum_postcode/notice_14_14_f03f40.svg" alt="" />
                                        <span>샛별배송 지역 중 배송불가 장소 안내</span>
                                    </h4>
                                    <div>
                                        <p>관공서 / 학교 / 병원 / 시장 / 공단지역 / 산간지역 / 백화점 등</p>
                                        <a href="!#">
                                            <span>자세히보기</span> 
                                            <img src="./img/daum_postcode/ico_arrow_down_11x10.svg" alt="" />
                                        </a>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>  

                </div>
            </div>
        </div>
    );
};