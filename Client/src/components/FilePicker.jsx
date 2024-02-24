import CustomeButton from "./CustomeButton";


const FilePicker = ({file,setFile,readFile}) => {
  return (
    <div className="filepicker-container">
        <div className="flex justify-center items-center flex-grow flex-col">
            <input
               id="file-upload"
               type="file"
               accept="image/*"
               onChange={(e)=>{setFile(e.target.files[0])}} />

            <label htmlFor="file-upload" className="cursor-pointer">
               file-upload
            </label>

            <p className="text-gray-500 mt-2 truncate text-xs">
              {file===""?"No file selected":file.name}
            </p>
          </div>

            <div className="flex gap-3 mt-4 flex-wrap">
              <CustomeButton
                 type="outline"
                 title="logo"
                 handleClick={()=>readFile("logo")}
                 customStyles={"text-xs"}
              />

              <CustomeButton
                 type="filled"
                 title="Full"
                 handleClick={()=>readFile("full")}
                 customStyles={"text-xs"}
              />

            </div>
    </div>
  );
}

export default FilePicker;
