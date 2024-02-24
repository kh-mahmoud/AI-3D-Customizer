import { Decal, useGLTF, useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import {easing} from "maath"
import { useSnapshot } from 'valtio'
import state from '../store'


export default function Shirt(props) {
  const snap=useSnapshot(state)
  
  const { nodes, materials } = useGLTF('/shirt_baked/scene.gltf')

//init model texture
  const logoTexture = useTexture(snap.logoDecal)
  const fullTexture = useTexture(snap.fullDecal)

  const ref = useRef(null)



  useFrame((state ,delta)=>
  {
   
   //adding default color to shirt smoothly 
  easing.dampC(materials.lambert1.color, snap.color, 0.25, delta)

  //Define the break points

    const isBreakpoint = window.innerWidth<= 1084 
    const isMobile = window.innerWidth<= 865

  //Default values for the position and camera position
    let cameraTargetPosition = [0.5, 0.05, 0.7];
    let targetPosition= [0.4, 0, 0];

   

    //fix shirt position and camera position for the shirt Model
    if(snap.intro)
    {
      if(isBreakpoint)
      {
          cameraTargetPosition = [0.7, 0.1, 0.8];
          targetPosition = [0.4,-0.1,0]

      } 
      if(isMobile)
        {
            cameraTargetPosition = [0.7, 0.1, 1.2];
            targetPosition = [0.4,-0.54,0]
        }
      }
    else
    {
        cameraTargetPosition = [0, 0.18, 0.5];
        targetPosition= [0, 0, 0];
    }

      easing.dampE(
        ref.current.rotation,
        [state.pointer.y / 10, -state.pointer.x / 5, 0],
        0.25,
        delta
      )

      easing.damp3(state.camera.position, cameraTargetPosition, 0.25, delta)
    
      easing.damp2(ref.current.position, targetPosition, 0.25, delta)

  })
  

  return (
    <group  ref={ref}  castShadow {...props}  dispose={null} >
      <mesh receiveShadow= {true}   castShadow= {true} geometry={nodes.Object_4.geometry} material={materials.lambert1}>

      {snap.isFullTexture &&
        
         <Decal
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
            scale={1}
            map={fullTexture}
          />
      }

       {snap.isLogoTexture &&

         <Decal
            position={[0, 0.07, 0.1]}
            rotation={[0, 0, 0]}
            scale={0.15}
            map={logoTexture}
            depthTest={false}
            depthWrite={true}
          />
      }
      
      </mesh>
    </group>
  )
}

useGLTF.preload('/scene.gltf')
