import { useState } from "react";
import { File,Folder } from "lucide-react"


function Floders() {
  interface interFile {
    Name: string;
    size: number;
    Kind: string;
  }
  interface interFolder {
    name: string;
    files: interFile[];
  }


  const [folder,setfolder]=useState<interFolder | null>(null)
  const [file,setfile]=useState<interFile | null>(null)

   const FolderhandleClick = async () => {
    const diradd=await window.showDirectoryPicker();
    const folder: interFolder = {
      name: diradd.name,
      files: []
    };
    for await (const [name,handle] of diradd.entries()) {
      console.log(`Name: ${name}, Kind: ${handle.kind}`);
    }
    setfolder(folder) ;
  }
  const FilehandleClick = async() => {
    const fileadd=await window.showOpenFilePicker()
    console.log(fileadd)
    setfile(fileadd);
  }

  return (
    <div className="floders w-1/4 border border-gray-300 p-4 h-screen overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <h1>Floders Component</h1>
        <button onClick={FilehandleClick}>
          <File className="w-6 h-6 text-gray-600 cursor-pointer" />
        </button>
        <button onClick={FolderhandleClick}>
          <Folder className="w-6 h-6 text-gray-600 cursor-pointer" />
        </button>
      </div>
      {folder && (
        <div className="folder-info mb-4">
          <h2><Folder className="w-5 h-5 inline mr-2" />{folder.name}</h2>
          <ul>
            <button className="w-full text-left">
              {folder.files.map((file, index) => (
                <li key={index}>
                  <File className="w-4 h-4 inline mr-2" />{file.name} - {file.size} bytes - {file.kind}
                </li>
              ))}
            </button>
          </ul>
        </div>
      )}
      {file && (
        <div className="file-info flex items-center mb-4">
          <h2 className="text-lg text-gray-800"><File className="w-5 h-5 inline mr-2" />file {file.Name}</h2>
          <p>Size: {file.size} bytes</p>
        </div>
      )}
     
      
      
    </div>
  );
}
export default Floders;