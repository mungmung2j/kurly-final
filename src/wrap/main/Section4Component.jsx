import React from "react";
import './scss/section4.scss';
import axios from "axios";
export default function Section4Component(){

    const [img, setImg] = React.useState('');

    React.useEffect(()=>{
        axios({
            url:'./data/intro/section4.json',
            method:'GET'
        })
        .then((res)=>{
            if(res.status===200){
                setImg(res.data.section.product[0].제품이미지);
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    },[]);




    return(
        <section id="section4">
            <div className="container">
                <div className="content">
                    <a href="!#"><img src={`./img/intro/section4/${img}`} alt="" /></a>
                </div>
            </div>
        </section>
    )
}