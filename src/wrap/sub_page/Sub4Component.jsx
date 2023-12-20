import React from "react";
import BannerList from './SubComponent/BannerList';
import axios from "axios";
import './scss/sub4.scss';


export default function Sub4Component(){

    const [state, setState] = React.useState({       
        상품: ''
    });


    React.useEffect(()=>{

        axios({
            url:'./data/sub_page/sub4.json',
            method:'GET'
        })
        .then((res)=>{

            setState({               
                상품: res.data.상품
            })

        })
        .catch((err)=>{
            console.log( err );
        });

    },[]);



    return(
        <main id="sub4" className="sub">
            <section id="section1">
                <div className="container">
                    <div className="content">
                       <BannerList 상품={state.상품}/>
                    </div>    
                </div>
            </section>
        </main>
    )
}