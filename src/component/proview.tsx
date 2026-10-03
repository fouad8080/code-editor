
import { html } from "@codemirror/lang-html"
import { AppContext } from "../App"
import {useContext, useEffect, useState } from "react"

function Proview(){
    const {htmlfile}=useContext(AppContext)
    const {update}=useContext(AppContext)
    const[srcDoc,setsrcDoc]=useState(null)
    
    useEffect(
        ()=>{
            setsrcDoc(htmlfile)
            
            

        }
        ,[update,htmlfile]
    )

    return(
    <iframe
    srcDoc={srcDoc?.contents || "<p>there isn't HTML file</p>"}
    className="w-full h-full"
    >
       
    </iframe>
)
}
export default Proview
