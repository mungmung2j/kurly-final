import React from "react";
import Section1Component from "./main/Section1Component";
import Section2Component from "./main/Section2Component";
import Section3Component from "./main/Section3Component";
import Section4Component from "./main/Section4Component";
import Section5Component from "./main/Section5Component";
import Section6Component from "./main/Section6Component";
import Section7Component from "./main/Section7Component";
import Section8Component from "./main/Section8Component";

export default function MainComponent({viewProductSetter}){
    return(
        <main id="main">
            <Section1Component />
            <Section2Component viewProductSetter={viewProductSetter} />
            <Section3Component viewProductSetter={viewProductSetter}  />
            <Section4Component />
            <Section5Component viewProductSetter={viewProductSetter}  />
            <Section6Component viewProductSetter={viewProductSetter}  />            
            <Section7Component viewProductSetter={viewProductSetter}  />
            <Section8Component viewProductSetter={viewProductSetter}  />
        </main>
    )
}