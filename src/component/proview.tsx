
import { useAppContext } from "../App"

function Proview(){
    const {htmlfile}=useAppContext()
    
    

    return(
    <iframe
    srcDoc={htmlfile?.contents || "<p>there isn't HTML file</p>"}
    className="w-full h-full"
    >
       
    </iframe>
)
}
export default Proview
