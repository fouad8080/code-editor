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

  type FileHandle = FileSystemFileHandle;

interface AppContextType {
  getfile: { Name: string; contents: string; handle: FileHandle } | null;
  setgetFile: React.Dispatch<React.SetStateAction<{ Name: string; contents: string; handle: FileHandle } | null>>;
  update: boolean;
  setupdate: React.Dispatch<React.SetStateAction<boolean>>;
  htmlfile: { Name: string; contents: string; handle: FileHandle } | null;
  sethtmlfile: React.Dispatch<React.SetStateAction<{ Name: string; contents: string; handle: FileHandle } | null>>;
  folderfiles: interFile[];
  setfolderfiles: React.Dispatch<React.SetStateAction<interFile[]>>;
  setopensidebar: React.Dispatch<React.SetStateAction<boolean>>;
  opensidebar: boolean;
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



  
  const [opensidebar,setopensidebar]=useState<boolean>(true)
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
    <AppContext.Provider value={{getfile,update, setgetFile ,htmlfile ,sethtmlfile,setupdate,setfolderfiles,folderfiles,setopensidebar,opensidebar}}>
        <Upbar />
        <div className="flex flex-row w-full h-[calc(100vh-64px)]">
          <div className={` ${opensidebar ? "block w-full" : "hidden"} lg:block lg:w-1/4 border border-gray-300 p-4 h-screen overflow-y-auto`}>
            <Floders  />
          </div>
          
            <div className={`flex flex-col w-full ${opensidebar ? "hidden" : "block"} lg:block lg:w-3/4 `}>
                <div className="flex gap-2 border-b border-gray-300 p-2 ">
                <button onClick={() => setActiveTab("editor")} className={` text-white px-4 py-2 rounded ${activeTab ? "bg-blue-500 hover:bg-blue-600" :"bg-blue-600 hover:bg-blue-700"}` }>Editor</button>
                <button onClick={() => setActiveTab("preview")} className={`  text-white px-4 py-2 rounded ${activeTab ? "bg-blue-500 hover:bg-blue-600" :"bg-blue-600 hover:bg-blue-700"} ` }>Preview</button>
              </div>
              
              {activeTab === "editor" && <CodeShow  />}
              {activeTab === "preview" && <Proview />}
              
            </div>
            
        </div>
    </AppContext.Provider>
  )
}

export default App
