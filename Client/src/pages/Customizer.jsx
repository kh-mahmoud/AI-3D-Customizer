import {useState } from "react"
import {motion,AnimatePresence} from "framer-motion"
import { useSnapshot } from "valtio"


import state from "../store"
import {reader } from "../config/helpers"
import { EditorTabs,FilterTabs,DecalTypes } from "../config/constants"
import {fadeAnimation,slideAnimation} from "../config/motion"
import { AIPicker, ColorPicker, CustomeButton, FilePicker, Tab } from "../components"

import axios from "axios"

const Customizer = () => {
  const snap = useSnapshot(state)

  const [File,setFile] = useState('')

  
  const [prompt,setPrompt] = useState()
  const [generatingImg,setGeratingImg] = useState(false)

  const [activeEditorTab, setActiveEditorTab] = useState("");



  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false,
  })


  const handleDecals=(type,result)=>
  {
  //set an image for the T-SHIRT dynamicly logo/full
     const decalType =DecalTypes[type]
     state[decalType.stateProperty] = result
   
  //activate texture if it's not activated
    if(!activeFilterTab[decalType.filterTab]) {
        handleActiveFilterTab(decalType.filterTab)
    } 
  }
  
//change the active filter tab state
  const handleActiveFilterTab = (tabName) => {
    switch (tabName) {
      case "logoShirt":
          state.isLogoTexture = !activeFilterTab[tabName];

        break;
      case "stylishShirt":
        state.isFullTexture = !activeFilterTab[tabName]; 

       break;
      default:
        state.isLogoTexture = true;
        state.isFullTexture = false;
        break;
    }

    //toggle active tab

      setActiveFilterTab((prevState) => ({
        ...prevState,
        [tabName]: !prevState[tabName],
      }));
  }

//reading the file image
  const readFile= (type)=>
  {
    reader(File).then((result)=>
    {
       handleDecals(type,result)
       setActiveEditorTab("")
    })
  }


  const handleSubmit=async(type)=>
  {
      if(!prompt) return alert("Please enter a prompt ")

      try {
         setGeratingImg(true)
         const {data} = await axios.post("http://localhost:3000/api/v1/dalle",{prompt},{headers:{
            "Content-Type":"application/json",
         }})

          handleDecals(type,`data:image/png;base64,${data.url}`)

         setGeratingImg(false)
         setActiveEditorTab("")
         setPrompt("")

      } catch (error) {
         console.log(error.message)
         setGeratingImg(false)
      }

  }

  const generateTabContent = () =>{
     switch(activeEditorTab){
           case "colorpicker":
            return <ColorPicker/>

           case "filepicker":
            return <FilePicker file={File} setFile={setFile} readFile={readFile}/>

           case "aipicker":
            return <AIPicker
                     prompt={prompt}
                     setPrompt={setPrompt}
                     generatingImg={generatingImg}
                     handleSubmit={handleSubmit}
                    />

           default:
            return null 
      }}


  return (
    <AnimatePresence>
       {!snap.intro &&(
        <>
          <motion.div className="absolute top-52 left-0 z-10" {...slideAnimation('left')}>
              <div className="editortabs-container tabs">

                  {EditorTabs.map((tab)=>(
                     <Tab  
                        key={tab.name} 
                        tab={tab}
                        handleClick={(e)=>{activeEditorTab ===tab.name?setActiveEditorTab(""):setActiveEditorTab(tab.name),e.stopPropagation()}}/>
                ))}
                 {generateTabContent()}
              </div>

          </motion.div>

          <motion.div className="absolute z-10 top-5 right-5" {...fadeAnimation}>
          
            <CustomeButton
                type="filled"
                title="Go Back"
                handleClick={()=>{state.intro = true}}
                customStyles="w-fit px-4 py-2.5 font-bold text-sm"
                />
          </motion.div>


          <motion.div  className="filtertabs-container " {...slideAnimation("up")}>
              {FilterTabs.map((tab)=>(
                     <Tab  
                        key={tab.name} 
                        tab={tab}
                        isFilterTab
                        isActiveTab = {activeFilterTab[tab.name]}
                        handleClick = {()=>{handleActiveFilterTab(tab.name)}}
                        />
                ))}
          </motion.div>
        </>
       )}
    </AnimatePresence>
  )
}

export default Customizer
