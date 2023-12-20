import React from 'react';
import './scss/ConfirmModal.scss';
import { useDispatch, useSelector } from 'react-redux';
import { confirm } from '../reducer/confirm_reducer'; 
export default function ConfirmModalComponent () {

    const dispatch = useDispatch();
    const selector = useSelector((state)=>state);


    const onClickClose=(e)=>{
        e.preventDefault();
        const obj = {
            isConfirmModal: false,
            confirmModalMsg: '',
        }
        dispatch(confirm(obj));
    }
    return (
        <div id='confimModal'>
            <div className="container">
                <div className="content">
                    <div className="modal-box">
                        <ul>
                            <li><h2>{selector.confirm.confirmModalMsg}</h2></li>
                            <li><button onClick={onClickClose}>확인</button></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};