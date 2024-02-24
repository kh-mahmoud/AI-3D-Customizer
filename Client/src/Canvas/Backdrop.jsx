import { AccumulativeShadows, RandomizedLight } from '@react-three/drei';
import { useSnapshot } from 'valtio';
import state from '../store';


const Backdrop = () => {

  const snap = useSnapshot(state);


  return (
    <AccumulativeShadows
      temporal
      frames={60}
      alphaTest={0.20}
      rotation={[Math.PI / 2, 0, 0]}
      position={[0, 0, -0.14]}
      color={snap.color}
    >
   
      <RandomizedLight 
        amount={2}
        radius={8}
        intensity={0.8}
        ambient={15}
        position={snap.intro ? [-2, -5, 10]: [-2, 0, -5]}
      />
     
    </AccumulativeShadows>
  )
}

export default Backdrop