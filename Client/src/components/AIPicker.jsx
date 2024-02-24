import CustomeButton from "./CustomeButton"




const AIPicker = ({prompt,setPrompt,generatingImg,handleSubmit}) => {
  return (
    <div className="aipicker-container">
        <textarea
          placeholder="Ask AI a texture for your T-shirt ...."
          rows={5}
          onChange={(e) => setPrompt(e.target.value)}
          value={prompt}
          className="aipicker-textarea placeholder:text-white placeholder:opacity-65"
        >
        </textarea>

        <div className="flex flex-wrap gap-3">
            {generatingImg?
              (
              <CustomeButton 
                type="outline"
                title="Asking AI..."
                customStyles="text-xs"
                />
              ):(
                <>
                  <CustomeButton 
                    type="outline"
                    title="AI Logo"
                    handleClick={() => handleSubmit('logo')}
                    customStyles="text-xs"
                  />
      
                  <CustomeButton 
                    type="filled"
                    title="AI Full"
                    handleClick={() => handleSubmit('full')}
                    customStyles="text-xs"
                  />
                </>
              )}
        </div>
         
    </div>
  );
}

export default AIPicker;
