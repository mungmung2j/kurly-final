import React from "react";
import './scss/gotop.scss';

export default function GoTopComponent(){

    const [goTop, setGoTop]  = React.useState(false);

    React.useEffect(()=>{

        window.addEventListener('scroll',function(){
            let goTop = false;
            if(this.window.scrollY >= 1500){
                goTop=true;
            }
            else{
                goTop=false;
            }
            setGoTop(goTop);
        });

    },[]);

    return(
        <div id="goTop" className={goTop?'on':''}>
            <a href="#wrap"><img src="./img/intro/icon_gotop.png" alt="" /></a>
        </div>
    )
}