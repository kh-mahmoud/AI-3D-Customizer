import { SketchPicker } from 'react-color'
import { useSnapshot } from "valtio";
import state from "../store";

const ColorPicker = () => {
  const snap = useSnapshot(state)


  return (
    <div className="ml-3 absolute left-full">
      <SketchPicker 
         color={snap.color}
         disableAlpha
         onChange={(color)=>{state.color = color.hex}}
         />
    </div>
  );
}

export default ColorPicker;
