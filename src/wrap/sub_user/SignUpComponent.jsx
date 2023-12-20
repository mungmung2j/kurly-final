import React from "react";
import './scss/SignUpComponent.scss';
import { useDispatch, useSelector } from "react-redux";
import { confirm } from "../../reducer/confirm_reducer";
import { setIsDaumPostCode } from "../../reducer/address_reducer";
import axios from "axios";

export default function SignUpComponent(){

    const refHp = React.useRef(); // 휴대폰 입력상자
    const dispatch = useDispatch();
    const selector = useSelector((state)=>state);
    

    // 3분 카운트 타이머 세터함수
    const [timer, setTimer] = React.useState({
        setId: 0,
        M: 0,   // 분
        S: 0    // 초
    });

    const [state, setState] = React.useState({
        아이디:'',
        infoId:'',
        아이디중복확인: false,

        비밀번호:'',
        infoPw1:'',

        비밀번호확인:'',
        infoPw2:'',

        이름:'',
        infoName:'',

        이메일:'',
        infoEmail:'',
        이메일중복확인: false,

        휴대폰:'',
        infoHp:'',
        isHpButton: false,
        휴대폰인증번호입력:'',
        인증번호발급: null, // 인증번호 발급 안된상태
        인증: false,  // 인증 성공 여부
        휴대폰인증: false,
        infoHp2:'',
        isHpButton2: false,

        

        // 성별
        성별: '선택안함',

        // 생년월일
        생년:'',
        생월:'',
        생일:'',
        infoBirth: '테스트 내용 가이드 ',

        // 추가입력사항
        추가입력사항:'',
        추천인아이디:'',
        참여이벤트명:'',

        // 이용약관동의
        // 이용약관전체
        이용약관동의: [],
        이용약관전체: [
            "이용약관 동의(필수)",
            "개인정보 수집∙이용 동의(필수)",
            "개인정보 수집∙이용 동의(선택)",
            "무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)",
            "SNS",
            "이메일",
            "본인은 만 14세 이상입니다.(필수)"
        ],
        

    });





    // 1. 아이디 입력상자
    // 입력제한 규칙 => 정규표현식 regexp => 검증 test() true, false 반환
    // 6자 이상 16자 이하의 영문 혹은 영문과 숫자를 조합
    // 공백허용 안함
    // 한글입력 허용안함
    // 글자수 . 6~16
    // 특수문자 입력시 삭제 => 특수문자를 공백문자로 replace() 대체(삭제)    
    const onChangeId=(e)=>{
        const regExp1 = /(?=.*[A-Za-z])+(?=.*[0-9])*/g;    //true 이면 정상 6자 이상 16자 이하의 영문 혹은 영문과 숫자를 조합
        const regExp2 = /\s/g   // 공백 true 오류
        const regExp3 = /[가-힣ㄱ-ㅎㅏ-ㅣ]/g   // 한글이면 true 오류
        const regExp4 = /.{6,16}/g   // 글자수 6자이상 ~ 16자이하 true 이면 정상 아니면 false 오류
        const regExp5 = /[`~!@#$%^&*()\-_=+|[\]{};:'"/?,.<>]/g   // 글자수 6자이상 ~ 16자이하 \-  \]
        let 아이디 = '';
        let infoId = '';

        // 특수문자 입력과 동시에 삭제하는 replace() 치환
        아이디 = e.target.value.replace(regExp5, '');  // 필터링
        if(regExp1.test(아이디)===false || regExp2.test(아이디)===true || regExp3.test(아이디)===true || regExp4.test(아이디)===false){
            infoId = '6자 이상 16자 이하의 영문 혹은 영문과 숫자를 조합';
        }
        else{
            infoId ='';
        }
        setState({
            ...state,
            아이디: 아이디,
            infoId: infoId
        })
    }

    // 1-2  아이디 중복확인
    const onClickIdCheck=(e)=>{
        e.preventDefault();
        const regExp1 = /(?=.*[A-Za-z])+(?=.*[0-9])*/g;    //true 이면 정상 6자 이상 16자 이하의 영문 혹은 영문과 숫자를 조합
        const regExp2 = /\s/g   // 공백 true 오류
        const regExp3 = /[가-힣ㄱ-ㅎㅏ-ㅣ]/g   // 한글이면 true 오류
        const regExp4 = /.{6,16}/g   // 글자수 6자이상 ~ 16자이하 true 이면 정상 아니면 false 오류
        const regExp5 = /[`~!@#$%^&*()\-_=+|[\]{};:'"/?,.<>]/g   // 글자수 6자이상 ~ 16자이하 \-  \]
        let msg = '';

        if(regExp1.test(state.아이디)===false || regExp2.test(state.아이디)===true || regExp3.test(state.아이디)===true || regExp4.test(state.아이디)===false){
            msg = '6자 이상 16자 이하의 영문 혹은 영문과 숫자를 조합';
        }
        else{

            let formData = new FormData();
            formData.append('userId', state.아이디);
            axios({
                url:'https://sjm6715.com/kurly_week_11/member_id_check.php',               
                method: 'POST',
                data: formData
            })
            .then((res)=>{ 
                if(res.data===0){
                    const obj = {
                        isConfirmModal: true,
                        confirmModalMsg: '사용 가능한 아이디 입니다.'
                    }
                    dispatch(confirm(obj));
                    // 데이터베이스에서 중복검사 사용 가능 & 불가능 체크
                    setState({
                        ...state,
                        아이디중복확인: true
                    });   
                } 
                else if(res.data===1){
                    const obj = {
                        isConfirmModal: true,
                        confirmModalMsg: '이미 사용중인 아이디 입니다.'
                    }
                    dispatch(confirm(obj));
                    // 데이터베이스에서 중복검사 사용 가능 & 불가능 체크
                    setState({
                        ...state,
                        아이디중복확인: false
                    });   
                }                 
            })
            .catch((err)=>{
                console.log( err );
            });           
        }
        const obj = {
            isConfirmModal: true,
            confirmModalMsg: msg
        }
        dispatch(confirm(obj));       
    }



    // 2. 비밀번호 입력상자
    // 최소 10자 이상 입력 ~ 16
    // 영문/숫자/특수문자(공백 제외)만 허용하며, 2개 이상 조합(영문/숫자+, 영문/특수문자+, 숫자/특수문자+)
    // 공백 제외
    // 한글 입력 허용안함
    // 동일한 숫자 3개 이상 연속 사용 불가     
    const onChangePw1=(e)=>{
        const regExp1 = /.{10,16}/g;
        const regExp2 = /((?=.*[A-Za-z])+(?=.*[0-9])+)|((?=.*[A-Za-z])+(?=.*[`~!@#$%^&*()\-_=+|[\]{};:'"/?,.<>])+)|((?=.*[0-9])+(?=.*[`~!@#$%^&*()\-_=+|[\]{};:'"/?,.<>])+)/g;
        const regExp3 = /\s/g;  // true 이면 오류
        const regExp4 = /[가-힣ㄱ-ㅎㅏ-ㅣ]/g; // true 이면 오류
        // const regExp5 = /(.)\1\1/g;  // 연속 (문자)(숫자) 3개 이상 허용안함 true 이면 오류
        const regExp5 = /(\d)\1\1/g;  // 연속 숫자 3개 이상 허용안함 true 이면 오류
        let 비밀번호 = e.target.value;
        let infoPw1 = '';
    
        if(regExp1.test(비밀번호)===false ){
            infoPw1 ='최소 10자 이상 입력';
        }
        else if(regExp2.test(비밀번호)===false || regExp3.test(비밀번호)===true || regExp4.test(비밀번호)===true ) {
            infoPw1 ='영문/숫자/특수문자(공백 제외)만 허용하며, 2개 이상 조합';
        }        
        else if(regExp5.test(비밀번호)===true ){
            infoPw1 ='연속 숫자 3개 이상 허용안함';
        }
        else {
            infoPw1 ='';
        }

        setState({
            ...state,
            비밀번호: 비밀번호,
            infoPw1: infoPw1
        })
    }

    // 3. 비밀번호확인 입력상자
    const onChangePw2=(e)=>{
        let infoPw2 = '';
        let 비밀번호확인 = e.target.value;
        if(비밀번호확인!==state.비밀번호){
            infoPw2 ='동일한 비밀번호를 입력';
        }        
        else{
            infoPw2 ='';
        }
        setState({
            ...state,
            비밀번호확인: 비밀번호확인,
            infoPw2: infoPw2
        })
    }

    // 4. 이름 입력상자
    // 특수문자 입력동시 삭제
    const onChangeName=(e)=>{
        const regExp = /[`~!@#$%^&*()\-_=+|[\]{};:'"/?,.<>]/g;
        let 이름 = '';
        let infoName = '';

        이름 = e.target.value.replace(regExp, '');
        if(이름===''){
            infoName = '이름을 입력해 주세요.';
        }
        else{
            infoName = '';
        }

        setState({
            ...state,
            이름: 이름,
            infoName: infoName
        })
    }

    // 5. 이메일 입력상자
    // @  ( ) \  [ ] " , <  > ; : 
    // arobiana@nav.er.com
    // arobi-ana@nav.er.co.kr
    // arobZ_iana@nav.er.com
    // arob.iana@nav.er.com
    // arobiana@nav.er.com
    // 이메일을 입력해 주세요.
    // 이메일 형식으로 입력해 주세요.
    const onChangeEmail=(e)=>{
        let 이메일 = e.target.value;
        let infoEmail = '';
        const regExp = /^[A-Za-z0-9`~!#$%^&*\-_=+|{}'/?]+((\.)?[A-Za-z0-9`~!#$%^&*\-_=+|{}'/?]+)*@[A-Za-z0-9`~!#$%^&*\-_=+|{}'/?.]+\.[A-Za-z0-9`~!#$%^&*\-_=+|{}'/?.]+$/g

        if(이메일===''){
            infoEmail = '이메일을 입력해 주세요.';
        }
        else if(regExp.test(이메일)===false){
            infoEmail = '이메일 형식으로 입력해 주세요.';
        }
        else{
            infoEmail = '';
        }

        setState({
            ...state,
            이메일: 이메일,
            infoEmail: infoEmail
        })


    }

    // 5-2  이메일 중복확인
      const onClickEmailCheck=(e)=>{
        e.preventDefault();
        
        let msg = '';
        const regExp = /^[A-Za-z0-9`~!#$%^&*\-_=+|{}'/?]+((\.)?[A-Za-z0-9`~!#$%^&*\-_=+|{}'/?]+)*@[A-Za-z0-9`~!#$%^&*\-_=+|{}'/?.]+\.[A-Za-z0-9`~!#$%^&*\-_=+|{}'/?.]+$/g

        if(state.이메일===''){
            msg = '이메일을 입력해 주세요.';
        }
        else if(regExp.test(state.이메일)===false){
            msg = '이메일 형식으로 입력해 주세요.';
        }
        else{
            
            let formData = new FormData();
            formData.append('userEmail', state.이메일);
            axios({
                url:'https://sjm6715.com/kurly_week_11/member_email_check.php',
                method: 'POST',
                data: formData
            })
            .then((res)=>{ 
                if(res.data===0){
                    const obj = {
                        isConfirmModal: true,
                        confirmModalMsg: '사용 가능한 이메일 입니다.'
                    }
                    dispatch(confirm(obj));
                    // 데이터베이스에서 중복검사 사용 가능 & 불가능 체크
                    setState({
                        ...state,
                        이메일중복확인: true
                    });   
                } 
                else if(res.data===1){
                    const obj = {
                        isConfirmModal: true,
                        confirmModalMsg: '이미 사용중인 이메일 입니다.'
                    }
                    dispatch(confirm(obj));
                    // 데이터베이스에서 중복검사 사용 가능 & 불가능 체크
                    setState({
                        ...state,
                        이메일중복확인: false
                    });   
                }                 
            })
            .catch((err)=>{
                console.log( err );
            }); 

        }

        const obj = {
            isConfirmModal: true,
            confirmModalMsg: msg,
        }
        dispatch(confirm(obj));  

    }


    // 6. 휴대폰 입력상자
    const onChangeHp=(e)=>{
        let 휴대폰 = '';
        let isHpButton = false;
        let infoHp = '';
        let regExp = /[^0-9]/g;

        휴대폰 = e.target.value.replace(regExp, '');

        if(e.target.value.length > 1){
            isHpButton = true;
            infoHp = '';
        }       
        else{
            infoHp = '휴대폰 번호를 입력해주세요';
            isHpButton = false;
        }

        setState({
            ...state,
            휴대폰: 휴대폰,
            infoHp: infoHp,
            isHpButton: isHpButton
        });
    }
    
    // 카운트 타이머 3분 제한시간
    const countTimer=()=>{
        const minute = 3; // 제한시간 3분
        let M = 0;
        let S = 0;
        let now = new Date(); // 현재날짜시간
        let endTime = now.setMinutes(now.getMinutes()+minute); // 현재시간에 3분을 설정
        let setId = 0;
        
        setId = setInterval(()=>{
            now = new Date();
            const result = endTime - now;  // 1970-1-1 ~ 현재까지 1000분의1초단위로 표기
            // console.log( result ); // 1970-1-1 ~ 현재까지 1000분의1초단위로 표기
            M = Math.floor(result/(60*1000)) % minute; // 남은시간 분 나머지
            S = Math.floor(result/(1000)) % 60; // 남은시간 초 나머지

            setTimer({
                setId: setId,
                M: M,
                S: S
            });

        },1000);
    }



    // 7. 인증번호 받기 버튼클릭 => 잘못된 휴대폰 번호 입니다. 확인 후 다시 시도 해 주세요.
    // 인증번호 발급 6자리 숫자 렌덤
    // 8. 다른번호 인증 버튼 클릭 => 
    // 가. 인증번호 받기로 변경(비활성) 
    // 나. 입력상자 지우고 포커스 입력대기상태로 
    // => 처음으로 돌아감
    const onClickHpBtn=(e)=>{
        e.preventDefault();
        let regExp = /^01[0-9]{1}[0-9]{3,4}[0-9]{4}$/g; // 010 348 6441  019 7942 5305
        let 인증번호발급 = '';
        let isHpButton = false;

        if(state.인증===true){ // 8. 다른번호 인증
            setState({
                ...state,
                휴대폰:'',
                isHpButton: false,  // 처음과 같이 비활성
                인증: false         // 처음과 같이 초기화        
            })

            refHp.current.focus();// 커서를 포커스한다.            

        }
        else { //7. 인증번호 받기
            if(regExp.test(state.휴대폰)===false){                    
                const obj = {
                    isConfirmModal: true,
                    confirmModalMsg: '잘못된 휴대폰 번호 입니다. 확인 후 다시 시도 해 주세요.',
                }
                dispatch(confirm(obj)); 
                isHpButton = true;
            }
            else {
                // 6자리 
                인증번호발급 = Math.floor(Math.random() * 900000 + 100000);
                const obj = {
                    isConfirmModal: true,
                    confirmModalMsg: `인증번호가 발송되었습니다. ${인증번호발급}`,
                }
                dispatch(confirm(obj));
                isHpButton = false;
                // 카운트 타이머 동작
                countTimer();
            }
    
            setState({
                ...state,
                인증번호발급: 인증번호발급,
                isHpButton: isHpButton
            })
            
        }


       
    }

    // 인증번호 입력 상자
    const onChangeHp2=(e)=>{
        let 휴대폰인증번호입력 = '';
        let isHp2Button = false;
        let infoHp2 = '';
        let regExp = /[^0-9]/g;

        휴대폰인증번호입력 = e.target.value.replace(regExp, '');

        if(e.target.value.length > 1){
            isHp2Button = true;
            infoHp2 = '';
        }       
        else{
            infoHp2 = '휴대폰 인증번호를 입력해주세요';
            isHp2Button = false;
        }

        setState({
            ...state,
            휴대폰인증번호입력: 휴대폰인증번호입력,
            infoHp2: infoHp2,
            isHp2Button: isHp2Button
        });
    }

    // 인증번호 확인 버튼
    const onClickHp2Btn=(e)=>{
        e.preventDefault();
        let isHpButton = false;
        let 인증 = false;
        let 휴대폰인증 = false;
        let 인증번호발급 = state.인증번호발급;

        // 인증번호 입력상자 인증번호 문자열와 인증번호 발급 번호 숫자와 비교
        if(state.인증번호발급 === Number(state.휴대폰인증번호입력)){
            const obj = {
                isConfirmModal: true,
                confirmModalMsg: `인증에 성공 하였습니다.`,
            }
            dispatch(confirm(obj));
            isHpButton = true;
            인증 = true;
            휴대폰인증 = true;
            인증번호발급 = null;
            // 카운트타이머 중지
            clearInterval(timer.setId);
            setTimer({
                setId: 0,
                M: 0,
                S: 0
            })
        }
        else{            
            const obj = {
                isConfirmModal: true,
                confirmModalMsg: `잘못된 인증 코드 입니다.`,
            }
            dispatch(confirm(obj));
            isHpButton = false;
            인증 = false;
            휴대폰인증 = false;
        }

        setState({
            ...state,
            isHpButton: isHpButton,
            인증: 인증,
            휴대폰인증: 휴대폰인증,
            인증번호발급: 인증번호발급 // 인증 성공하면 null 아니면 원래 발급번호 그대로
        })

    }
    

    // 주소검색 API 
    const onClickAddressSearch=(e)=>{
        e.preventDefault();
        dispatch(setIsDaumPostCode(true));
    }

    // 성별
    const onChangeGender=(e)=>{
        setState({
            ...state,
            성별: e.target.value
        })
    }

    // 생년월일
    const onChangeYear=(e)=>{
        setState({
            ...state,
            생년: e.target.value

        })
    }
    const onChangeMonth=(e)=>{
        setState({
            ...state,
            생월: e.target.value           
        })

    }
    const onChangeDate=(e)=>{
        setState({
            ...state,
            생일: e.target.value
        })
    }

    // 생년월일 입력값 변경되면 동작 이벤트
    React.useEffect(()=>{
        // 생년 생월 생일 모두 비어있으면 
        // 가이드 텍스트 표시 안한다.        
        if(state.생년==='' &&  state.생월==='' && state.생일===''){
            setState({
                ...state,
                infoBirth: ''
            })
        }
        else{
            // 생년 체크 
            // 1. 미래 입력 불가
            if(Number(state.생년) > new Date().getFullYear()){
                setState({
                    ...state,
                    infoBirth: '생년월일이 미래로 입력 되었습니다.'
                })
            }
            else if(Number(state.생년) >= (new Date().getFullYear()-14)){
                setState({
                    ...state,
                    infoBirth: '만 14세 미만은 가입이 불가합니다.'
                })
            }
            else if(Number(state.생년) < (new Date().getFullYear()-100)){
                setState({
                    ...state,
                    infoBirth: '생년월일을 다시 확인해주세요. 100살 초과 불가'
                })
            }

            else{
                 // 생월 체크
                 if(Number(state.생월) < 1 || Number(state.생월) > 12){
                    setState({
                        ...state,
                        infoBirth: '태어난 월을 정확하게 입력해주세요.'
                    })
                 }
                 else{
                     // 생일 체크
                     if(Number(state.생일) < 1 || Number(state.생일) > 31){
                        setState({
                            ...state,
                            infoBirth: '태어난 일을 정확하게 입력해주세요.'
                        })
                     }
                     else{
                        //  모두 정상인 경우
                        setState({
                            ...state,
                            infoBirth: ''
                        })
                     }
                 }
            }
        }
    },[state.생년, state.생월, state.생일]);


    // 추가 입력 사항
    const onChangeChoogaInput=(e)=>{
        setState({
            ...state,
            추가입력사항: e.target.value
        })
    }

    // 추가 입력 사항 : 추천인 아이디
    const onChangeChoogaIdInput=(e)=>{
        setState({
            ...state,
            추천인아이디: e.target.value
        });
    }

    // 추천인 아이디 조회
    const onClickChoochuninId=(e)=>{
        e.preventDefault();

            let formData = new FormData();
            formData.append('userId', state.아이디);
            axios({
                url:'https://sjm6715.com/kurly_week_11/member_id_check.php',
                method: 'POST',
                data: formData
            })
            .then((res)=>{ 
                if(res.data===0){
                    const obj = {
                        isConfirmModal: true,
                        confirmModalMsg: '존재하지 않는 아이디 입니다.'
                    }
                    dispatch(confirm(obj));
                      
                } 
                else if(res.data===1){
                    const obj = {
                        isConfirmModal: true,
                        confirmModalMsg: '존재하는 아이디 입니다. 친구초대 이벤트에 참여 가능해요.'
                    }
                    dispatch(confirm(obj));   
                }                 
            })
            .catch((err)=>{
                console.log( err );
            });   
    }

    // 추가 입력 사항 : 참여 이벤트명
    const onChangeChoogaEventInput=(e)=>{
        setState({
            ...state,
            참여이벤트명: e.target.value
        });

    }

    // 이용약관동의 체크박스 이벤트
    // 체크박스 : 전체이용약관동의
    const onChangeCheckAll=(e)=>{
        let 이용약관동의 = state.이용약관동의;

        if( e.target.checked===true ){
            이용약관동의 = state.이용약관전체;
        }
        else {
            이용약관동의 = [];
        } 

        // 상태관리
        setState({
            ...state,
            이용약관동의: 이용약관동의
        })
    }

    // 체크박스 : 개별체크
    const onChangeChk=(e)=>{
        let 이용약관동의 = state.이용약관동의;

        if( e.target.checked === true ){
           
            // 무료배송 SNS 이메일
            if(e.target.value.includes("무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)") && state.이용약관동의.includes('SNS')===false && state.이용약관동의.includes('이메일')===false ){
                이용약관동의 = [...이용약관동의, e.target.value, 'SNS', '이메일']; 
            }
            else if(e.target.value==="무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)" && state.이용약관동의.includes('SNS')===true && state.이용약관동의.includes('이메일')===false ){
                이용약관동의 = [...이용약관동의, e.target.value, '이메일']; 
            }
            else if(e.target.value==="무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)" && state.이용약관동의.includes('SNS')===false && state.이용약관동의.includes('이메일')===true ){
                이용약관동의 = [...이용약관동의, e.target.value, 'SNS']; 
            }
            else if(e.target.value==="SNS" && state.이용약관동의.includes('무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)')===false && state.이용약관동의.includes('이메일')===true ){
                이용약관동의 = [...이용약관동의, e.target.value, '무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)']; 
            }
            else if(e.target.value==="이메일" && state.이용약관동의.includes('무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)')===false && state.이용약관동의.includes('SNS')===true ){
                이용약관동의 = [...이용약관동의, e.target.value, '무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)']; 
            }
            else{
                이용약관동의 = [...이용약관동의, e.target.value];
            }

        }
        else{
            // 배열안에 항목 삭제
            // 배열안에 현재 취소된 항목을 제외하고 저장 한다. (필터)
            if(e.target.value==="무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)" && state.이용약관동의.includes('SNS')===true && state.이용약관동의.includes('이메일')===true ){
                이용약관동의 = 이용약관동의.filter((itemn)=>itemn!== e.target.value );
                이용약관동의 = 이용약관동의.filter((itemn)=>itemn!== 'SNS' );
                이용약관동의 = 이용약관동의.filter((itemn)=>itemn!== '이메일' );
            }
            else if(e.target.value==="SNS" && state.이용약관동의.includes('무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)')===true && state.이용약관동의.includes('이메일')===true ){           
                이용약관동의 = 이용약관동의.filter((itemn)=>itemn!== e.target.value );
                이용약관동의 = 이용약관동의.filter((itemn)=>itemn!== '무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)' );
            }
            else if(e.target.value==="이메일" && state.이용약관동의.includes('무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)')===true && state.이용약관동의.includes('SNS')===true ){           
                이용약관동의 = 이용약관동의.filter((itemn)=>itemn!== e.target.value );
                이용약관동의 = 이용약관동의.filter((itemn)=>itemn!== '무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)' );
            }
            else{
                이용약관동의 = 이용약관동의.filter((item)=>item !== e.target.value);
            }            
        }

        // 상태관리
        setState({
            ...state,
            이용약관동의: 이용약관동의
        })        
    }

    // 폼전송 버튼(SUBMIT) 클릭 이벤트
    const onSubmitSignUp=(e)=>{
        e.preventDefault();  // 폼전송 버튼 클릭시 폼데이터 전송되는 이벤트 제거한다.
        // 모든 필수 입력 사항 반드시 빈칸은 안된다.
        // ※ 필수입력사항
        // 1. 아이디
        // 2. 중복확인 아이디(DB에 저장된 아이디와 비교 중복된 아이디 가입불가)
        // 3. 비밀번호
        // 4. 비밀번호확인
        // 5. 이름
        // 6. 이메일
        // 7. 중복확인 이메일(DB에 저장된 이메일와 비교 중복된 이메일 가입불가)
        // 8. 휴대폰
        // 9. 휴대폰 인증 유무
        //10. 주소
        //11. 이용약관동의 필수 입력사항 => 3개
        let 이용약관동의필수 = 0;        
        state.이용약관동의.map((item)=>{
            if(item.includes('필수')){
                이용약관동의필수++;
            }
        })

        let msg = '';        
        if(state.아이디===''){
            msg = '아이디를 입력하세요';
            const obj = {
                isConfirmModal: true,
                confirmModalMsg: msg
            }
            dispatch(confirm(obj));  
        }
        else if(state.아이디중복확인===false){
            msg = '아이디 중복 확인을 해주세요';
            const obj = {
                isConfirmModal: true,
                confirmModalMsg: msg
            }
            dispatch(confirm(obj));  
        }
        // 비밀번호는 빈칸도 안되고
        // 오류메시지가 있어도 안된다.
        else if(state.비밀번호==='' || state.infoPw1!==''){
            msg = '비밀번호를 확인하고 입력하세요';
            const obj = {
                isConfirmModal: true,
                confirmModalMsg: msg
            }
            dispatch(confirm(obj));  
        }
        else if(state.비밀번호확인==='' || state.infoPw2!==''){
            msg = '동일한 비밀번호를 한번더 입력하세요';
            const obj = {
                isConfirmModal: true,
                confirmModalMsg: msg
            }
            dispatch(confirm(obj));  
        }
        else if(state.이름===''){
            msg = '이름을 입력하세요';
            const obj = {
                isConfirmModal: true,
                confirmModalMsg: msg
            }
            dispatch(confirm(obj));  
        }
        else if(state.이메일==='' || state.infoEmail!==''){            
            msg = '이메일을 확인하고 입력하세요';
            const obj = {
                isConfirmModal: true,
                confirmModalMsg: msg
            }
            dispatch(confirm(obj));  
        }        
        else if(state.이메일중복확인===false){
            msg = '이메일 중복 확인을 해주세요';
            const obj = {
                isConfirmModal: true,
                confirmModalMsg: msg
            }
            dispatch(confirm(obj));  
        }
        else if(state.휴대폰===''){
            msg = '휴대폰 번호를 입력하세요';
            const obj = {
                isConfirmModal: true,
                confirmModalMsg: msg
            }
            dispatch(confirm(obj));  
        }
        else if(state.휴대폰인증===false){
            msg = '휴대폰 번호를 인증 해주세요';
            const obj = {
                isConfirmModal: true,
                confirmModalMsg: msg
            }
            dispatch(confirm(obj));  
        }
        else if(selector.address.주소===null){
            msg = '주소를 검색 해주세요';
            const obj = {
                isConfirmModal: true,
                confirmModalMsg: msg
            }
            dispatch(confirm(obj));  
        }            
        else if(이용약관동의필수 < 3){
            msg = '이용약관동의 필수 항목을 선택을 해주세요';
            const obj = {
                isConfirmModal: true,
                confirmModalMsg: msg
            }
            dispatch(confirm(obj));  
        }
        else { 

            const regExp = /^(\d{3})(\d{3,4})(\d{4})$/g;
            
            let formData = new FormData();
            formData.append('userId', state.아이디);
            formData.append('userPw', state.비밀번호);
            formData.append('userName', state.이름);
            formData.append('userEmail',  state.이메일);
            formData.append('userHp',  state.휴대폰.replace(regExp, "$1-$2-$3"));
            formData.append('userAddr1', selector.address.주소.주소1);
            formData.append('userAddr2',  selector.address.주소.주소2);
            formData.append('userGender', state.성별);
            formData.append('userBirth', `${state.생년}-${state.생월}-${state.생일}` );
            formData.append('userChooga', state.추가입력사항);
            formData.append('userChoogaId', state.추천인아이디);
            formData.append('userChoogaEvent', state.참여이벤트명);
            formData.append('userService', state.이용약관동의);

            axios({
                url:'https://sjm6715.com/kurly_week_11/member_signup_insert.php',               
                method: 'POST',
                data: formData
            })
            .then((res)=>{      
                const obj = {
                    isConfirmModal: true,
                    confirmModalMsg: '폼데이터 서버에 전송 성공!'
                }
                dispatch(confirm(obj));
            })
            .catch((err)=>{
                console.log( err );
            });
        }
       
    }
   
    return(
        <main id="signUp">
            <section id='section1'>
                <div className="container">
                    <div className="title">
                        <h2>회원가입</h2>
                        <h3>
                            <span>
                                <i>*</i>
                                <em>(필수)입력사항</em>
                            </span>
                        </h3>
                    </div>
                    <div className="content">
                        <form onSubmit={onSubmitSignUp}>
                            <ul>                            
                                <li className="row group1" data-name='userId'>
                                    <div className="gap">
                                        <div className="left-box">
                                            <label htmlFor="userId"><span>아이디</span><i>*</i></label>
                                        </div>
                                        <div className="center-box">
                                            <input 
                                                type="text" 
                                                name="userId" 
                                                id="userId" 
                                                placeholder="아이디를 입력해주세요"
                                                maxLength={16}
                                                value={state.아이디}
                                                onChange={onChangeId}
                                            />
                                        </div>
                                        <div className="right-box">
                                            <button onClick={onClickIdCheck}>중복확인</button>
                                        </div>
                                    </div>
                                    <p className={`info${state.infoId.length>0?' on':''}`}>{state.infoId}</p>
                                </li>

                                <li className="row group1" data-name='userPw'>
                                    <div className="gap">
                                        <div className="left-box">
                                            <label htmlFor="userPw"><span>비밀번호</span><i>*</i></label>
                                        </div>
                                        <div className="center-box">
                                            <input 
                                                type="password" 
                                                name="userPw1" 
                                                id="userPw" 
                                                placeholder="비밀번호를 입력해주세요" 
                                                value={state.비밀번호}
                                                onChange={onChangePw1}
                                                maxLength={16}
                                            />
                                        </div>
                                        <div className="right-box">
                                            
                                        </div>
                                    </div>
                                    <p className={`info${state.infoPw1.length>0?' on':''}`}>{state.infoPw1}</p>
                                </li>

                                <li className="row group1" data-name='userPw2'>
                                    <div className="gap">
                                        <div className="left-box">
                                            <label htmlFor="userPw2"><span>비밀번호확인</span><i>*</i></label>
                                        </div>
                                        <div className="center-box">
                                            <input 
                                                type="password" 
                                                name="userPw2" 
                                                id="userPw2" 
                                                placeholder="비밀번호를 입력해주세요" 
                                                value={state.비밀번호확인}
                                                onChange={onChangePw2}
                                                maxLength={16}
                                            />
                                        </div>
                                        <div className="right-box">
                                            
                                        </div>
                                    </div>
                                    <p className={`info${state.infoPw2.length>0?' on':''}`}>{state.infoPw2}</p>
                                </li>

                                <li className="row group1" data-name='userName'>
                                    <div className="gap">
                                        <div className="left-box">
                                            <label htmlFor="userName"><span>이름</span><i>*</i></label>
                                        </div>
                                        <div className="center-box">
                                            <input 
                                                type="text" 
                                                name="userName" 
                                                id="userName" 
                                                placeholder="이름을 입력해주세요" 
                                                value={state.이름}
                                                onChange={onChangeName}
                                            />
                                        </div>
                                        <div className="right-box">
                                            
                                        </div>
                                    </div>
                                    <p className={`info${state.infoName.length>0?' on':''}`}>{state.infoName}</p>
                                </li>

                                <li className="row group1" data-name='userEmail'>
                                    <div className="gap">
                                        <div className="left-box">
                                            <label htmlFor="userEmail"><span>이메일</span><i>*</i></label>
                                        </div>
                                        <div className="center-box">
                                            <input 
                                                type="text" 
                                                name="userEmail" 
                                                id="userEmail" 
                                                placeholder="이메일을 입력해주세요" 
                                                value={state.이메일}
                                                onChange={onChangeEmail}
                                            />
                                        </div>
                                        <div className="right-box">
                                            <button onClick={onClickEmailCheck}>중복확인</button>
                                        </div>
                                    </div>
                                    <p className={`info${state.infoEmail.length>0?' on':''}`}>{state.infoEmail}</p>
                                </li>

                                <li className="row group1" data-name='userHp'>
                                    <div className="gap">
                                        <div className="left-box">
                                            <label htmlFor="userHp"><span>휴대폰</span><i>*</i></label>
                                        </div>
                                        <div className="center-box">
                                            <input 
                                                type="text" 
                                                name="userHp" 
                                                id="userHp" 
                                                placeholder="휴대폰 번호를 입력해주세요" 
                                                onChange={onChangeHp}
                                                value={state.휴대폰}
                                                ref={refHp}
                                            />
                                        </div>
                                        <div className="right-box">
                                            <button 
                                                className={`user-hp${state.isHpButton?' on':''}`} 
                                                disabled={!state.isHpButton}
                                                onClick={onClickHpBtn}
                                            >{state.인증===true?'다른번호 인증':'인증번호 받기'}
                                            </button>
                                        </div>
                                    </div>
                                    <p className={`info${state.infoHp.length>0?' on':''}`}>{state.infoHp}</p>
                                </li>
                            {
                                state.인증번호발급!==null && (    
                                <li className="row group1" data-name='userHp2'>
                                    <div className="gap hp2">

                                        <div className="center-box">
                                            <input 
                                                type="text" 
                                                name="userHp2" 
                                                id="userHp2" 
                                                placeholder="인증번호를 입력해주세요"
                                                onChange={onChangeHp2}
                                                value={state.휴대폰인증번호입력}
                                            />
                                            <span className="count-timer">
                                                <em>{timer.M<10?`0${timer.M}`:timer.M}</em>
                                                <i>:</i>
                                                <em>{timer.S<10?`0${timer.S}`:timer.S}</em>
                                            </span>
                                        </div>
                                        <div className="right-box">
                                            <button 
                                                className={`user-hp2${state.isHp2Button?' on':''}`} 
                                                disabled={!state.isHp2Button}
                                                onClick={onClickHp2Btn}
                                            >인증번호 확인
                                            </button>
                                        </div>
                                    </div>
                                    <p className={`info${state.infoHp2.length>0?' on':''}`}>{state.infoHp2}</p>
                                </li>
                                )                            
                            }

                                {/* 주소검색 버튼 */}
                            {
                                selector.address.주소===null && (
                                    <li className="row group1" data-name='userAddress'>
                                        <div className="gap address1">
                                            <div className="left-box">
                                                <label><span>주소</span><i>*</i></label>
                                            </div>
                                            <div className="center-box">
                                                <button onClick={onClickAddressSearch}><img src="./img/intro/icon_zoom.svg" alt="" />주소 검색</button>
                                                <p>배송지에 따라 상품 정보가 달라질 수 있습니다.</p>
                                            </div>
                                            <div className="right-box">
                                                
                                            </div>
                                        </div>                                
                                    </li>
                                )
                            }

                            {
                                selector.address.주소!==null && (
                                    <>  {/* 주소검색 완료되면 보인다. */}
                                        {/* 주속검색 완료 후 바인딩 주소1 입력상자 */}
                                        <li className="row group1" data-name='userAddress'>
                                            <div className="gap address2">
                                                <div className="left-box">
                                                    <label htmlFor="userAddress1"><span>주소</span><i>*</i></label>
                                                </div>
                                                <div className="center-box">
                                                    <input 
                                                        type="text" 
                                                        name="userAddress1" 
                                                        id="userAddress1" 
                                                        placeholder="주소1 검색"
                                                        value={selector.address.주소.주소1}
                                                        
                                                    />
                                                </div>
                                                <div className="right-box">
                                                    <button onClick={onClickAddressSearch}><img src="./img/intro/icon_zoom.svg" alt="" /><span>재검색</span></button>
                                                </div>
                                            </div>                                
                                        </li>
                                        {/* 주속검색 완료 후 바인딩 주소2 입력상자 */}
                                        <li className="row group1" data-name='userAddress'>
                                            <div className="gap address3">
                                                <div className="left-box">
                                            
                                                </div>
                                                <div className="center-box">
                                                    <input 
                                                        type="text" 
                                                        name="userAddress1" 
                                                        id="userAddress1" 
                                                        placeholder="주소2 입력" 
                                                        value={selector.address.주소.주소2}
                                                        
                                                    />
                                                </div>
                                                <div className="right-box">
                                                
                                                </div>
                                            </div>                                
                                        </li>     
                                        {/* 주속검색 완료 후  주소 가이드 텍스트 */}                      
                                        <li className="row group1" data-name='userAddress'>
                                            <div className="gap address4">
                                                <div className="left-box">
                                            
                                                </div>
                                                <div className="center-box">
                                                    <p>샛별배송</p>
                                                    <p>배송지에 따라 상품 정보가 달라질 수 있습니다.</p>
                                                </div>
                                                <div className="right-box">
                                                
                                                </div>
                                            </div>                                
                                        </li>
                                    </>
                                )
                            }
                                {/* 성별 */}
                                <li className="row group1 gender-li" data-name='userGender'>
                                    <div className="gap gender">
                                        <div className="left-box">
                                            <label><span>성별</span></label>
                                        </div>
                                        <div className="center-box">
                                            <label htmlFor="userMale">
                                                <input 
                                                    type="radio" 
                                                    name="userGender" 
                                                    id="userMale" 
                                                    value='남자'
                                                    onChange={onChangeGender}
                                                    checked={state.성별==='남자'}
                                                />                                            
                                                <em>남자</em>
                                            </label>
                                            <label htmlFor="userFemale">
                                                <input 
                                                    type="radio" 
                                                    name="userGender" 
                                                    id="userFemale" 
                                                    value='여자'
                                                    onChange={onChangeGender}
                                                    checked={state.성별==='여자'}
                                                />                                            
                                                <em>여자</em>
                                            </label>                                       
                                            <label htmlFor="userNone">
                                                <input 
                                                    type="radio" 
                                                    name="userGender" 
                                                    id="userNone" 
                                                    value='선택안함'
                                                    onChange={onChangeGender}
                                                    checked={state.성별==='선택안함'}
                                                />                                            
                                                <em>선택안함</em>
                                            </label>                                       
                                        </div>
                                        <div className="right-box">
                                            
                                        </div>
                                    </div>                               
                                </li>

                                {/* 생년월일 */}
                                <li className="row group1" data-name='userBirth'>
                                    <div className="gap birth">
                                        <div className="left-box">
                                            <label><span>생년월일</span></label>
                                        </div>
                                        <div className="center-box">
                                            <ul>
                                                <li> 
                                                    <input 
                                                        type="text" 
                                                        name="userYear" 
                                                        id="userYear" 
                                                        value={state.생년}
                                                        placeholder="YYYY"
                                                        onChange={onChangeYear}
                                                        maxLength={4}                                                    
                                                    />
                                                </li>
                                                <li><i>/</i></li>
                                                <li>
                                                    <input 
                                                        type="text" 
                                                        name="userMonth" 
                                                        id="userMonth" 
                                                        value={state.생월}
                                                        placeholder="MM"
                                                        onChange={onChangeMonth}
                                                        maxLength={2}
                                                    />   
                                                </li>
                                                <li><i>/</i></li>
                                                <li>
                                                    <input 
                                                        type="text" 
                                                        name="userDate" 
                                                        id="userDate" 
                                                        value={state.생일}
                                                        placeholder="DD"
                                                        onChange={onChangeDate}
                                                        maxLength={2}
                                                    />    
                                                </li>
                                            </ul>
                                                                                
                                        </div>
                                        <div className="right-box">
                                            
                                        </div>
                                    </div>  
                                    <p className={`info${state.infoBirth.length>0?' on':''}`}>{state.infoBirth}</p>
                                </li>

                                {/* 추가입력사항 */}
                                <li className="row group1 gender-li" data-name='userGender'>
                                    <div className="gap gender">
                                        <div className="left-box">
                                            <label><span>추가입력 사항</span></label>
                                        </div>
                                        <div className="center-box">
                                            <label htmlFor="userChoogaId">
                                                <input 
                                                    type="radio" 
                                                    name="userChooga" 
                                                    id="userChoogaId" 
                                                    value='친구초대 추천인 아이디'
                                                    onChange={onChangeChoogaInput}
                                                    checked={state.추가입력사항==='친구초대 추천인 아이디'}
                                                />                                            
                                                <em>친구초대 추천인 아이디</em>
                                            </label>
                                            <label htmlFor="userChoogaEvent">
                                                <input 
                                                    type="radio" 
                                                    name="userChooga" 
                                                    id="userChoogaEvent" 
                                                    value='참여 이벤트명'
                                                    onChange={onChangeChoogaInput}
                                                    checked={state.추가입력사항==='참여 이벤트명'}
                                                />                                            
                                                <em>참여 이벤트명</em>
                                            </label>                                       
                                            
                                                                        
                                        </div>
                                        <div className="right-box">
                                            
                                        </div>
                                    </div>                               
                                </li>

                                {/* 추가입력사항 > 추천인아이디 입력상자 */}
                            {
                                state.추가입력사항==='친구초대 추천인 아이디' && (
                                <li className="row group1" data-name='userChooga'>
                                    <div className="gap hp2">

                                        <div className="center-box">
                                            <input 
                                                type="text" 
                                                name="userChoogaIdInput" 
                                                id="userChoogaIdInput" 
                                                placeholder="추천인 아이디를 입력해 주세요."
                                                onChange={onChangeChoogaIdInput}
                                                value={state.추천인아이디}
                                            />                                        
                                        </div>
                                        <div className="right-box">
                                            <button                                             
                                                onClick={onClickChoochuninId}
                                            >아이디 확인
                                            </button>
                                        </div>
                                    </div>
                                    <p className="chooga">가입 후 7일 내 첫 주문 배송완료 시, 친구초대 이벤트 적립금이 지급됩니다.</p>
                                </li>)
                            }

                                {/* 추가입력사항 > 참여이벤트명 입력상자 */}

                            {
                                state.추가입력사항==='참여 이벤트명' && (
                                <li className="row group1" data-name='userHp2'>
                                    <div className="gap hp2">

                                        <div className="center-box">
                                            <input 
                                                type="text" 
                                                name="userChoogaEventInput" 
                                                id="userChoogaEventInput" 
                                                placeholder="참여 이벤트명을 입력해 주세요."
                                                onChange={onChangeChoogaEventInput}
                                                value={state.참여이벤트명}
                                            />                                        
                                        </div>
                                        <div className="right-box">
                                    
                                        </div>
                                    </div>
                                    <p className="chooga">
                                        추천인 아이디와 참여 이벤트명 중 하나만 선택 가능합니다.<br/>
                                        가입 이후는 수정이 불가능 합니다.<br/>
                                        대소문자 및 띄어쓰기에 유의해주세요.
                                    </p>
                                </li>)
                            }
                                <li className="row hr">
                                    <hr />
                                </li>

                                {/* 이용약관동의 */}
                                <li className="row group2" data-name='userService'>
                                    <div className="gap">
                                        <div className="left-box">
                                            <label><span>이용약관동의</span><i>*</i></label>
                                        </div>
                                        <div className="center-box">
                                            <label htmlFor="chkAll">
                                                <input 
                                                    type="checkbox" 
                                                    name="chkAll" 
                                                    id="chkAll"
                                                    value='전체 동의합니다.'
                                                    onChange={onChangeCheckAll}
                                                    checked={state.이용약관동의.length===7}
                                                />
                                                <span className="chk-all">전체 동의합니다.</span>
                                            </label>
                                        </div>                                   
                                    </div>
                                    <p>선택항목에 동의하지 않은 경우도 회원가입 및 일반적인 서비스를 이용할 수 있습니다.</p>                                
                                </li>
                                <li className="row group2" data-name='userService'>
                                    <div className="gap">
                                        <div className="left-box"></div>
                                        <div className="center-box">
                                            <label htmlFor="chk1">
                                                <input 
                                                    type="checkbox" 
                                                    name="chk1" 
                                                    id="chk1"
                                                    value='이용약관 동의(필수)'
                                                    checked={state.이용약관동의.includes('이용약관 동의(필수)')}
                                                    onChange={onChangeChk}
                                                />
                                                <span>이용약관 동의</span>
                                            </label>
                                            <em>(필수)</em>
                                        </div>                                   
                                    </div>                                
                                </li>

                                <li className="row group2" data-name='userService'>
                                    <div className="gap">
                                        <div className="left-box"></div>
                                        <div className="center-box">
                                            <label htmlFor="chk2">
                                                <input 
                                                    type="checkbox" 
                                                    name="chk2" 
                                                    id="chk2"
                                                    value='개인정보 수집∙이용 동의(필수)'
                                                    checked={state.이용약관동의.includes('개인정보 수집∙이용 동의(필수)')}
                                                    onChange={onChangeChk}
                                                />
                                                <span>개인정보 수집∙이용 동의</span>
                                            </label>
                                            <em>(필수)</em>
                                        </div>                                   
                                    </div>                                
                                </li>
                                <li className="row group2" data-name='userService'>
                                    <div className="gap">
                                        <div className="left-box"></div>
                                        <div className="center-box">
                                            <label htmlFor="chk3">
                                                <input 
                                                    type="checkbox" 
                                                    name="chk3" 
                                                    id="chk3"
                                                    value='개인정보 수집∙이용 동의(선택)'
                                                    checked={state.이용약관동의.includes('개인정보 수집∙이용 동의(선택)')}
                                                    onChange={onChangeChk}
                                                />
                                                <span>개인정보 수집∙이용 동의</span>
                                            </label>
                                            <em>(선택)</em>
                                        </div>                                   
                                    </div>                                
                                </li>
                                <li className="row group2" data-name='userService'>
                                    <div className="gap">
                                        <div className="left-box"></div>
                                        <div className="center-box">
                                            <label htmlFor="chk4">
                                                <input 
                                                    type="checkbox" 
                                                    name="chk4" 
                                                    id="chk4"
                                                    value='무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)'
                                                    checked={state.이용약관동의.includes('무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)')}
                                                    onChange={onChangeChk}
                                                />
                                                <span>무료배송, 할인쿠폰 등 혜택/정보 수신 동의</span>
                                            </label>
                                            <em>(선택)</em>
                                        </div>                                   
                                    </div>                                
                                </li>

                                <li className="row group2" data-name='userService'>
                                    <div className="gap">
                                        <div className="left-box"></div>
                                        <div className="center-box sns-email">
                                            <label htmlFor="chk5">
                                                <input 
                                                    type="checkbox" 
                                                    name="chk5" 
                                                    id="chk5"
                                                    value='SNS'
                                                    checked={state.이용약관동의.includes('SNS')}
                                                    onChange={onChangeChk}
                                                />
                                                <span>SNS</span>
                                            </label>
                                            <label htmlFor="chk6">
                                                <input 
                                                    type="checkbox" 
                                                    name="chk6" 
                                                    id="chk6"
                                                    value='이메일'
                                                    checked={state.이용약관동의.includes('이메일')}
                                                    onChange={onChangeChk}
                                                />
                                                <span>이메일</span>
                                            </label>
                                        </div>                                   
                                    </div> 
                                    <p className="sns-email-p">동의 시 한 달간 [5%적립] + [2만원 이상 무료배송] 첫 주문 후 안내</p>
                                </li>
                                <li className="row group2" data-name='userService'>
                                    <div className="gap">
                                        <div className="left-box"></div>
                                        <div className="center-box">
                                            <label htmlFor="chk7">
                                                <input 
                                                    type="checkbox" 
                                                    name="chk7" 
                                                    id="chk7"
                                                    value='본인은 만 14세 이상입니다.(필수)'
                                                    checked={state.이용약관동의.includes('본인은 만 14세 이상입니다.(필수)')}
                                                    onChange={onChangeChk}
                                                />
                                                <span>본인은 만 14세 이상입니다.</span>
                                            </label>
                                            <em>(필수)</em>
                                        </div>                                   
                                    </div>                                
                                </li>
                            </ul>

                            <div className="button-box">
                                <button type="submit">가입하기</button>    
                            </div>    
                        </form>
                    </div>
                </div>
            </section>
        </main>
    )
}