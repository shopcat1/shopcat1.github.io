import React from 'react';


import './App.css';
import ComplexDonut from './ComplexDonut/ComplexDonut';
import { CustomValue } from './CustomValue/CustomValue';
import { SegmentInterface } from './Interfaces/SegmentInterface';
import { OffButton } from './OffButton/OffButton';



enum LoadingStatus {
  Loading = "loading",
  Error = "error",
  Loaded = "loaded"
}

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  }


  
function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = React.useState(getWindowDimensions());

  React.useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}


function App() {
const [selectedButton, setSelectedButton] = React.useState<string|undefined>(undefined)
const [segments, setSegments] = React.useState<SegmentInterface[]|undefined>(undefined)
const [loadingStatus, setLoadingStatus] = React.useState<LoadingStatus>(LoadingStatus.Loading)
React.useEffect(()=> {
  fetch("./buttons.json")
  .then(r => r.json())
  .then(segs => {
    setSegments(segs)
    setLoadingStatus(LoadingStatus.Loaded)
  })
  .catch(e => {
    console.warn("Error Loading", e);
    setLoadingStatus(LoadingStatus.Error)
  }) 
}, [])


const { width } = useWindowDimensions();

if (loadingStatus === LoadingStatus.Loading) {
  return     <div className="App"></div>
}
if (loadingStatus === LoadingStatus.Error) {
  return     <div className="App">There was an error loading the buttons.</div>
}

const padding = 20;
const maxWidth = 900;

const computedWidth = width > maxWidth-padding ? maxWidth : (width - (padding*2))
  return (
    <div className="App">
        <div className="appWrapper">
            {/* <div className="offButtonWrapper" style={{width:computedWidth+"px", height:computedWidth/4+"px"}}>
        <OffButton 
                    width={computedWidth/4}
                    selectedButton={selectedButton}
                    setSelectedButton={setSelectedButton}
                    />
                    </div> */}
        <ComplexDonut
		width={computedWidth}
		radius={80}
		segments={segments}
		thickness={40}
		startAngle={-135}
        selectedButton={selectedButton}
        setSelectedButton={setSelectedButton}
	/>
 
        <div className="customRow">
        <CustomValue 
                width={width}
                selectedButton={selectedButton}
                setSelectedButton={setSelectedButton}
        />
        </div>
    </div>
    </div>
  );
}

export default App;
