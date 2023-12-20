import React from "react";
import './scss/slide20.scss';
import axios from "axios";
import Container from "./Container";


export default function Section7Component({viewProductSetter}){

    const [state, setState] = React.useState({
        subject:'',
        캡션1: '',
        캡션2: '',
        product: []
    });

    React.useEffect(()=>{
        axios({
            url:'./data/intro/section7.json',
            method:'GET'
        })
        .then((res)=>{
            if(res.status===200){
                setState({
                    subject: res.data.section.subject,
                    캡션1: res.data.section.caption.캡션1,
                    캡션2: res.data.section.caption.캡션2,
                    product: res.data.section.product
                });
            }
        })
        .catch((err)=>{
            console.log(err);
        });
    },[]);





    return(
        <section id={state.subject}  className="intro-slide20">
            
            <Container viewProductSetter={viewProductSetter} 캡션1={state.캡션1}  캡션2={state.캡션2}   product={state.product} subject={state.subject} />


        </section>
    )
}