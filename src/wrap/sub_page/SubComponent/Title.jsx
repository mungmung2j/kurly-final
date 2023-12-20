import React from 'react';

export default function Title({타이틀이미지,타이틀텍스트}) {
    
    return (
        <div className="title">
            <div className="title-image">
                <img src={`./img/sub/sub1/${타이틀이미지}`} alt="" />    
            </div>
            <div className="title-text">
                <h2>{타이틀텍스트}</h2>
            </div>
        </div>
    );
};
