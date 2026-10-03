import CodeShow from "./component/CodeShow"
import Floders from "./component/floders"
import Upbar from "./component/Upbar"


import {createContext, useState} from 'react'
export const AppContext = createContext(null)
function App() {

  
  type FileHandle = {
    name: string;
    kind: string;
  };
  

  const [getfile, setgetFile] = useState<FileHandle|null>(null)

  return (
    <AppContext.Provider value={{getfile, setgetFile}}>
        <Upbar />
        <div className="flex flex-row">
          <Floders value={{getfile, setgetFile}} />
          <CodeShow value={{getfile, setgetFile}} />
        </div>
    </AppContext.Provider>
  )
}

export default App
