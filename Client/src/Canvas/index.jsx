import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls } from '@react-three/drei';

import Shirt from './Shirt';
import Backdrop from './Backdrop';
import { Suspense} from 'react';





const CanvasModel = () => {


  return (
    <>
      <Canvas
         shadows
         className='w-full max-w-full   bg-[#488BEF]'
       >
          <ambientLight intensity={0.5} />
          <OrbitControls enableRotate={false}/>

          <Suspense fallback={null}>
             <Backdrop/>
              <Shirt/>
          </Suspense>
        <Environment preset="city" />
      </Canvas>
    </>
  );
}

export default CanvasModel;
