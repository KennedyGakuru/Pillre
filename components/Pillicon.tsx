import Svg, { Rect, ClipPath, Defs, G } from 'react-native-svg';

const Pillicon = ({
  width = 38,
  height = 18,
  leftColor = "#ffffcc",  
  rightColor = "#ff0000", 
  rotation = -45
}) => {

  return (
    <Svg width={width} height={height} viewBox='0 0 40 20' fill='none'>
      <Defs>
        
        <ClipPath id="leftHalf">
          <Rect x="0" y="0" width="19" height="18" />
        </ClipPath>
        
        
        <ClipPath id="rightHalf">
          <Rect x="19" y="0" width="19" height="18" />
        </ClipPath>
      </Defs>
      
      <G transform={`rotate(${rotation}, 20, 10)`}>
       
        <Rect
          x="0"
          y="0"
          width="38"
          height="18"
          rx="12"
          fill={leftColor}
          clipPath="url(#leftHalf)"
        />
        
        
        <Rect
          x="0"
          y="0"
          width="38"
          height="18"
          rx="12"
          fill={rightColor}
          clipPath="url(#rightHalf)"
        />
      </G>
    </Svg>
  );
};

export default Pillicon;