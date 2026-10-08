import { SidebarOpen,SidebarClose} from 'lucide-react'
import { useAppContext } from '../App';
function Upbar() {
  const {opensidebar,setopensidebar}=useAppContext()

  return (
    <div className="upbar flex flex-row justify-between items-center p-4 border-b-2 border-gray-300">
      
        <button onClick={() => {setopensidebar(!opensidebar)}} className="flex lg:hidden w-8 h-8 bg-blue-500 rounded-full items-center justify-center">{opensidebar ? <SidebarClose /> : <SidebarOpen />}</button>
        <div className="text-2xl font-light">Code Editor</div>
      
      
    </div>
  )
}

export default Upbar