import React from 'react';
import { Controller } from '../Controller/Controller';
import "./CustomValue.css"
interface Props {
    width:number 
	selectedButton?:string 
	setSelectedButton:(buttonLabel:string)=>void
}
interface CustomValueInterface {
    r:number 
    g:number 
    b: number 
    w: number 
}

export const CustomValue = (props:Props) => {
    const [values, setValues] = React.useState<CustomValueInterface>({r:0, g:0, b:0, w:0})
	const {selectedButton,setSelectedButton,width } = props; 
    const className = (selectedButton && selectedButton === "CUSTOM") ? "CustomValue selected" : "CustomValue"
    const shrinkPoint = 970;
    let style = (width < shrinkPoint) ? {transform:"scale("  + (width / shrinkPoint) + ")"} : {}


    const onChange = (e:any) => {
        const {value, name } = e.target; 
        if (value >= 0 && value <= 255) {
        let newValue = {...values} 
            newValue[name] = value; 
            setValues(newValue)  
            setSelectedButton("--")
        }
        
    }
    const setClicked = () => {
        setSelectedButton("CUSTOM") 
        Controller.createRequest(`${values.r},${values.g},${values.b},${values.w}`)
    }

    return <div className={className} style={style} >
                <h3>CUSTOM</h3>
                <div className="fields">
                <input type="number" name="r" value={values.r} onChange={onChange} />
                <input type="number" name="g" value={values.g} onChange={onChange} />
                <input type="number" name="b" value={values.b} onChange={onChange} />
                <input type="number" name="w" value={values.w} onChange={onChange} />
                </div>
                <div onClick={setClicked} className="setButton">SET</div>

    </div>

}