import React from 'react';
import { Controller } from '../Controller/Controller';
import { SegmentInterface } from '../Interfaces/SegmentInterface';
// import PropTypes from 'prop-types';
import './ComplexDonut.css';

let rotateAngle = 0;


const getTotal = values => 360; 
const getPercent = (value, total) => value / total;
// const sortValues = values => values.sort((a, b) => b.value - a.value);
const getCircumference = radius => 2 * Math.PI * radius;
const convertDegreesToRadians = angle => angle * (Math.PI / 180);
const size = 200; 

interface DonutWedgeProps {
	i:number 
	circleProps:any 
	radius:number 
	halfSize:number 
	segment:any 
	thickness:number 
	circumference:number
	getStrokeDashOffset:any 
	textProps:any 
	selectedButton?:string 
	setSelectedButton:(buttonLabel:string)=>void
}
const DonutWedge = (props:DonutWedgeProps) => {
	const {i, circleProps, radius, halfSize,segment,thickness,circumference, getStrokeDashOffset, textProps,selectedButton,setSelectedButton } = props; 
	const onClick = () => {
		setSelectedButton(segment.label)
		Controller.createRequest(segment.arg)

	}
	return <g key={i} className="segmentGroup" onClick={onClick}>
	<circle
		{...circleProps}
		className="segmentCircle"
		r={radius}
		cx={halfSize}
		cy={halfSize}
		transform={segment.rotate}
		stroke={segment.color}
		strokeWidth={(selectedButton && segment.label === selectedButton) ? thickness + 10 : thickness}
		strokeDasharray={circumference}
		strokeDashoffset={getStrokeDashOffset(segment.value, circumference)}
	/>
	<text
		{...textProps}
		x={segment.textCoords.x}
		y={segment.textCoords.y}
		dy="3px"
		textAnchor="middle"
	>
		{segment.label}
	</text>
</g>
}



const ComplexDonut = (props:ComplexDonutProps) => {

	const total = getTotal(props.segments);

	const getTextCoordinates = (value, angleOffset) => {
		const { radius, segments } = props;
		
		const total = getTotal(segments);
		const angle = (getPercent(value, total) * 360) / 2 + angleOffset;
		const radians = convertDegreesToRadians(angle);
		const textRadius = radius * 1.03;
		return {
			x: textRadius * Math.cos(radians) + size / 2,
			y: textRadius * Math.sin(radians) + size / 2
		};
	};

	const getTransforms = () => {
		const rotations:any[] = [];
		const textCoords:any[] = [];
		const { startAngle, segments } = props;
		const total = getTotal(segments);

		rotateAngle = startAngle;

		segments.forEach(({ value }) => {
			const data = rotateAngle;
			const percent = getPercent(value, total);
			const { x, y } = getTextCoordinates(value, rotateAngle);

			rotations.push(data);
			
			textCoords.push({ x, y });

			const result = rotations[rotations.length - 1] || startAngle;

			rotateAngle = percent * 360 + result;
		});

		return { rotations, textCoords };
	};

	const getStrokeDashOffset = (value, circumference) => {
		const diff = getPercent(value, total) * circumference;
		return circumference - diff;
	};

	const [segments, setSegments] = React.useState<any>([]);
	const isLoaded = true; 
	
	React.useEffect(() => {
		const { rotations, textCoords } = getTransforms();

		setSegments(
			props.segments.map(({ value, color,label,arg }, i) => ({
				value,
				color,
				percent: getPercent(value, total),
				rotate: `rotate(${rotations[i]}, ${size / 2}, ${size / 2})`,
				textCoords: textCoords[i],
                label:label ,
				arg

			}))
		);

		
	}, []);

	const { width, radius, thickness, className, circleProps, textProps, selectedButton,  setSelectedButton } = props;
	const halfSize = size / 2;
	const circumference = getCircumference(radius);

	const wrapperSize = size + 12; 

	const offX = size * 1.09;
	const offY =  0 - (size * 0.09)


	const offClicked = () => {
		setSelectedButton("OFF")
        Controller.createRequest("0,0,0,0")

	}

	return (
		<div className={`donut-complex${isLoaded ? ' donut-complex--loaded ' : ' '}${className}`}>
			<svg scale={width/size} height={width } width={width} viewBox={`-6 -30  ${wrapperSize * 1.3} ${wrapperSize}`}>
				
				{segments.map((segment:any, i) => (
				<DonutWedge 
					key={i}
					i={i} 
					circleProps={circleProps} 
					radius={radius}
					halfSize={halfSize} 
					segment={segment} 
					thickness={thickness} 
					circumference={circumference}
					getStrokeDashOffset={getStrokeDashOffset} 
					textProps={textProps} 
					selectedButton={selectedButton}
					setSelectedButton={setSelectedButton}
				/>
				
				
				
				))}
                	<g key={"Center"}>
						<circle
                            className="centerCircle"
							r={radius * 0.84}
							cx={halfSize}
							cy={halfSize}
                            fill={"#efefef"}
							z={1000}
						/>
					</g>


					<g key={"OffButton"} className="offButtonWrapper" onClick={offClicked}>
						<circle
                            className="OffButton"
							r={radius * 0.55}
							cx={offX}
							cy={ offY}
                            fill={"#FFF"}
							z={1000}
						/>
						<circle
                            className="OffButtonInner"
							r={radius * 0.21}
							cx={offX}
							cy={offY}
                            fill={"#000"}
							z={1000}
						/>
							<text
								x={offX}
								y={offY}
							dy="3px"
							className="whiteText"
							textAnchor="middle"
						>OFF</text>
					</g>
			</svg>
		</div>
	);
};

interface ComplexDonutProps  {
	width: number,
	radius: number,
	segments: SegmentInterface[],
	thickness: number,
	startAngle: number,
	className: string,
	circleProps: object,
	textProps: object
	selectedButton?:string 
	setSelectedButton:(buttonLabel:string)=>void
};

ComplexDonut.defaultProps = {
	// size: 160,
	radius: 60,
	segments: [],
	thickness: 30,
	startAngle: -90,
	className: '',
	circleProps: {},
	textProps: {}
};

export { ComplexDonut };
export default ComplexDonut;