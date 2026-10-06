import CodeShow from "./component/CodeShow"
import Floders from "./component/floders"
import Upbar from "./component/Upbar"
import Proview from "./component/proview"

import {createContext, useContext, useState} from 'react'


interface interFile {
    Name: string;
    Kind: string;
    handle?: FileSystemFileHandle | FileSystemDirectoryHandle;
    children?: interFile[];
    isOpen?: boolean;
  }

  type FileHandle = {
    name: string;
    kind: string;
  };

interface AppContextType {
  getfile: { Name: string; contents: string; handle: FileHandle } | null;
  setgetFile: React.Dispatch<React.SetStateAction<{ Name: string; contents: string; handle: FileHandle } | null>>;
  update: boolean;
  setupdate: React.Dispatch<React.SetStateAction<boolean>>;
  htmlfile: { Name: string; contents: string; handle: FileHandle } | null;
  sethtmlfile: React.Dispatch<React.SetStateAction<{ Name: string; contents: string; handle: FileHandle } | null>>;
  folderfiles: interFile[];
  setfolderfiles: React.Dispatch<React.SetStateAction<interFile[]>>;
}

export const AppContext = createContext<AppContextType | null>(null)
export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContext.Provider");
  }
  return context;
}

function App() {



  

  const [folderfiles,setfolderfiles]=useState<interFile [] >([])
  const [htmlfile,sethtmlfile] = useState<{Name:string, contents:string, handle: FileHandle}|null>(null) 
  const [update,setupdate]=useState<boolean>(true)
  const [getfile, setgetFile] = useState<{Name:string, contents:string, handle: FileHandle}|null>(
    ()=>{
      const foldersaved=localStorage.getItem("folder");
      return foldersaved ? JSON.parse(foldersaved) : null
    }
  )
  
  const [activeTab, setActiveTab] = useState<"editor" | "preview">("editor");



  return (
    <AppContext.Provider value={{getfile,update, setgetFile ,htmlfile ,sethtmlfile,setupdate,setfolderfiles,folderfiles}}>
        <Upbar />
        <div className="flex flex-row">
          <Floders value={{getfile, setgetFile ,htmlfile,sethtmlfile,update,folderfiles,setfolderfiles}} />
            <div className="flex flex-col w-full  ">
                <div className="flex gap-2 border-b border-gray-300 p-2 ">
                <button onClick={() => setActiveTab("editor")} className={` text-white px-4 py-2 rounded ${activeTab ? "bg-blue-500 hover:bg-blue-600" :"bg-blue-600 hover:bg-blue-700"}` }>Editor</button>
                <button onClick={() => setActiveTab("preview")} className={`  text-white px-4 py-2 rounded ${activeTab ? "bg-blue-500 hover:bg-blue-600" :"bg-blue-600 hover:bg-blue-700"} ` }>Preview</button>
              </div>
              
              {activeTab === "editor" && <CodeShow value={{getfile, setgetFile,setupdate,update,htmlfile,sethtmlfile,folderfiles,setfolderfiles}} />}
              {activeTab === "preview" && <Proview value={{htmlfile,update}}/>}
              
            </div>
            
        </div>
    </AppContext.Provider>
  )
}

export default App
