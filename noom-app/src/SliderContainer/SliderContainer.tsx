import Slider from "rc-slider/lib/Slider"
import 'rc-slider/assets/index.css';
import { Controller } from "../Controller/Controller";

interface SliderContrainerProps {
    width: number;
    whiteBrightness: number
	selectedButton?:string 
    setWhiteBrightness: (value: number) => void
}
export const SliderContainer = (props:SliderContrainerProps) => {
    const {width, whiteBrightness,selectedButton,setWhiteBrightness} = props
    const onChange = (value:number) => {
        setWhiteBrightness(value)
        if (selectedButton === "WHITE") {
            const arg  = `0,0,0,${whiteBrightness}`
			Controller.createRequest(arg)

        }
    }

    const top = width > 500 ? "380px" : "180px"

    return <div className="sliderContainer" style={{top:top}} > 
    <Slider 
        vertical 
        min={0} 
        max={255} 
        marks={[]} 
        step={1} 
        included={false} 
        defaultValue={255} 
        value={whiteBrightness}
        onChange={onChange}
        onAfterChange={onChange}
        />
        <span>White Brightness</span>
    </div>

}