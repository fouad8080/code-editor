import { useState ,useEffect , useContext} from "react";
import { File,Folder } from "lucide-react"
import { AppContext } from "../App";


function Floders() {
  const { setgetFile} = useContext(AppContext);

  interface interFile {
    Name: string;
    Kind: string;
    handle?: FileHandle | DirectoryHandle;
    children?: interFile[];
    isOpen?: boolean;
  }
  interface interFolder {
    name: string;
    files: interFile[];
  }
  type FileHandle = {
    name: string;
    kind: string;
  };
  type DirectoryHandle = {
    name: string;
    kind: string;
    entries():   AsyncIterableIterator<[string, FileHandle | DirectoryHandle]>;
  };

  const [showfolederfiles,setshowfolderfiles]=useState(true)
  const [folder,setfolder]=useState<interFolder | null>(null)
  const [file,setfile]=useState<interFile []>([])
  const [folderfiles,setfolderfiles]=useState<interFile [] >([])

   const FolderhandleClick = async () => {
    const diradd=await window.showDirectoryPicker();
    const folder: interFolder = {
      name: diradd.name,
      files: []
    };
    
    for await (const [name,handle] of diradd.entries()) {
      
      const file:interFile={
      Name:name,
      Kind:handle.kind,
      handle,
      }
      setfolderfiles(f=>[...f,file])
    }
    setfolder(folder) ;
    
  }

  useEffect(()=>{
    if(folderfiles && folderfiles.length>0){
      setfolder(prevFolder => {
        if (prevFolder) {
          return { ...prevFolder, files: folderfiles };
        }
        return prevFolder;
      });
    }
  },[folderfiles])
  const updateFileInTree = (targetName: string, updates: Partial<interFile>) => {
    const updateRecursive = (items: interFile[]): interFile[] => {
     return items.map(item => {
        if (item.Name === targetName) {
         return { ...item, ...updates };
       }
        if (item.children) {
          return { ...item, children: updateRecursive(item.children) };
        }
        return item;
      });
   };
   setfolderfiles(prev => updateRecursive(prev));
  };
  const toggleFolder = async (targetFile: interFile) => {
  if (targetFile.Kind !== "directory") return;

  // لو مفتوح، أغلقه بس (ما نعيد القراءة)
  if (targetFile.isOpen) {
    updateFileInTree(targetFile.Name, { isOpen: false });
    return;
  }
  
  // لو أول مرة يفتح، اقرأ محتواه
  if (targetFile.children == null) {
    const dirHandle = targetFile.handle as DirectoryHandle;
    const items: interFile[] = [];
    for await (const [name, handle] of dirHandle.entries()) {
      items.push({
        Name: name,
        Kind: handle.kind,
        handle,
        children: handle.kind === "directory" ? null : undefined
      });
    }
    updateFileInTree(targetFile.Name, { children: items, isOpen: true });
  } else {
    updateFileInTree(targetFile.Name, { isOpen: true });
  }
};


  const FilehandleClick = async() => {
    const [fileadd]=await window.showOpenFilePicker();
    const selfile=await fileadd.getFile();

    const selectedfile:interFile={
      Name:selfile.name,
      Kind:fileadd.kind,
      handle:fileadd
    }
    setfile(f=>[...f,selectedfile]);
  }

  const renderTree=(item:interFile[])=>{
    return item.map((item, index) =>(
                  <li className=" flex flex-col px-2 py-2 border-l  border-gray-500" key={index}>
                    {item.Kind === "file" ? (
                      <div className="file flex items-center pl-4 hover:bg-gray-200 cursor-pointer px-2 w-fit">
                        <button className="flex items-center hover:bg-gray-200 cursor-pointer px-2 w-fit" onClick={async () => 
                          {
                            const fileHandle = item.handle as FileHandle;
                            const file = await fileHandle.getFile();
                            const contents = await file.text();
                            setgetFile({Name:item.Name, contents, handle: fileHandle });
                          }}>
                          <File className="w-4 h-4 inline mr-2" />
                          {item.Name}
                        </button>
                      </div>
                    ) : (
                    <div className="flder flex flex-col  pl-4  cursor-pointer px-2">
                      <button  className="flex items-center hover:bg-gray-200 cursor-pointer px-2 w-fit" onClick={() => toggleFolder(item)}>
                        <Folder className="w-4 h-4 inline mr-2" />
                        <div>{item.Name}</div>
                      </button>
                      {item.isOpen && item.children && (
                        <ul>
                          {renderTree(item.children)}
                        </ul>
                      )}
                      </div>
                    )}
                  </li>
                ))
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
          <button onClick={()=>setshowfolderfiles(!showfolederfiles)}><Folder className="w-5 h-5 inline mr-2" />{folder.name}</button>
          {showfolederfiles && (
            <ul>
                {renderTree(folder.files)}
            </ul>)}

          </div>)
              
      }
      {file && (
        <div className="file-info">
          {file.length > 0 && <h2>Selected Files:</h2>}
          <ul>
            {file.length > 0 && file.map((item, index) => (
              
              <li className="flex items-center pl-4 py-2" key={index}>
                <button className="flex items-center hover:bg-gray-200 cursor-pointer px-2 w-fit" onClick={async () => 
                  {console.log(item)
                          const fileHandle = item.handle as FileHandle;
                          const file = await fileHandle.getFile();
                          const contents = await file.text();
                          setgetFile({ contents, handle: fileHandle });
                        }}>
                  <File className="w-4 h-4 inline mr-2" />{item.Name}
                </button>
              </li>
            
            ))}
          </ul>
        </div>
      )}
      
     
      
      
    </div>
  );
}
export default Floders;