import React from "react";
import './scss/SignInComponent.scss'
import axios from "axios";
import { confirm } from "../../reducer/confirm_reducer";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

export default function SignInComponent(){
    const [state, setState]=React.useState({
        아이디:'',
        비밀번호:''
    })

    const dispatch=useDispatch();

    const onChangeId=(e)=>{
        setState({
            ...state,
            아이디:e.target.value
        })
    }
    
    const onClickSignIn=(e)=>{
        e.preventDefault();
        let formData=new FormData();
        formData.append('userId',state.아이디);

        axios({
            url:'https://sjm6715.com/kurly_week_11/member_login_check.php',
            method:'POST',
            data:'formData'
        })
        .then((res)=>{
            if(res.data===1){
                const obj={
                    isConfirmModal:true,
                    confirmModalMsg:'로그인 성공!'
                }
                dispatch(confirm(obj));
            }
            else if(res.data!==1){
                const obj={
                    isConfirmModal:true,
                    confirmModalMsg:'로그인 실패!'
                }
                dispatch(confirm(obj));
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    }


    return(
    <>
        <main id="signIn">
            <form>
                <h2>로그인</h2>
                <div className="input-box">
                    <input type="text"
                    placeholder="아이디를 입력해주세요"
                    name="userId" 
                    id="userId" 
                    onChange={onChangeId}
                    />
                    <input type="password"
                    placeholder="비밀번호를 입력해주세요"
                    name="userPw"
                    id="userPw"
                    />
                </div>
                <div className="find-box">
                    <a href="#">아이디 찾기</a>
                    <span>|</span>
                    <a href="#">비밀번호 찾기</a>
                </div>
                <div className="btn-box">
                    <button onClick={onClickSignIn}>로그인</button>
                    <Link to="/signup" className="signup-btn">회원가입</Link>
                </div>
            </form>
        </main>
        <Outlet />
    </>
    )
}