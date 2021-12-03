import React from 'react';
import { Controller } from '../Controller/Controller';
import "./OffButton.css"
interface Props {
    width:number 
	selectedButton?:string 
	setSelectedButton:(buttonLabel:string)=>void
}
export const OffButton = (props:Props) => {
	const {selectedButton,setSelectedButton,width } = props; 
    const className = (selectedButton && selectedButton === "OFF") ? "OffButton selected" : "OffButton"
    const shrinkPoint = 970;
    // let style = (width < shrinkPoint) ? {transform:"scale("  + (width / shrinkPoint) + ")"} : {}
    const style = {width:width +"px", height:width + "px"}
    return <div className={className} style={style} onClick={()=> {
        
        setSelectedButton("OFF")
        Controller.createRequest("0,0,0,0")
        }}>
                <div className="innerCircle">
                    OFF
                </div>
    </div>

}