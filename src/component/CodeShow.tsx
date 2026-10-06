import { useState,useEffect, useRef } from 'react';
import { Save } from 'lucide-react';

import { EditorView, keymap, lineNumbers } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { defaultKeymap, history, historyKeymap, indentWithTab } from '@codemirror/commands';
import { syntaxHighlighting, defaultHighlightStyle } from '@codemirror/language';
import { javascript } from '@codemirror/lang-javascript';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { autocompletion } from '@codemirror/autocomplete';
import { Compartment } from '@codemirror/state';

import { useAppContext } from '../App';
import {buildPreviewHtml} from './tools/buildproviewhtml'
import {findFile} from './tools/buildproviewhtml'


function CodeShow() {


 
  const { getfile ,setgetFile}=useAppContext();
  const { update,setupdate} = useAppContext();
  const { sethtmlfile} =useAppContext()
  const {folderfiles}=useAppContext()
  const {htmlfile}=useAppContext()
  
  const [ Autocomlete, setAutocomlete ] = useState(true); 
  const editorRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);

  const langcompartemet= new Compartment();

  function getlangExt(filename:string | undefined): any {
    if (!filename )return javascript();
    if (filename.endsWith(".html"))return html();
    if (filename.endsWith(".css"))return css();
    return javascript();
  }
  

  useEffect(() => {
    if (!editorRef.current) return;
    

    const extensions = [
      lineNumbers(),
      history(),
      keymap.of([...defaultKeymap, ...historyKeymap,indentWithTab]),
      syntaxHighlighting(defaultHighlightStyle),
      EditorState.tabSize.of(2),
      langcompartemet.of(getlangExt(getfile?.Name)),
    ];

    if (Autocomlete) {
      extensions.push(autocompletion());
    }

    const state = EditorState.create({
      doc: getfile ? getfile.contents : '',
      extensions,
    });

    const view = new EditorView({
      state,
      parent: editorRef.current,
    });
    viewRef.current = view;

    return () => view.destroy();
  }, [getfile]);




  const SaveFile = async () => {
  const newContent = viewRef.current?.state.doc.toString();
  if(newContent===undefined || !getfile) return;
  try {
    
    const writeable = await getfile?.handle?.createWritable();
    await writeable?.write(newContent);
    await writeable?.close();
    alert('File saved successfully!');

    
    const name = getfile?.Name || "";
    if (name.endsWith(".html") || name.endsWith(".css") || name.endsWith(".js")) {
      
      
      if (!htmlfile) {
        alert("No HTML file found for preview.");
        return;
      }
      const htmlEntry = findFile(folderfiles,htmlfile?.Name);
      
      if (htmlEntry) {
        const htmlHandle = htmlEntry.handle as FileSystemFileHandle;
        const htmlFileObj = await htmlHandle.getFile();
        const rawHtml = await htmlFileObj.text();
        
        const finalHtml = await buildPreviewHtml(rawHtml, folderfiles);
        
        sethtmlfile({ Name: htmlEntry.Name, contents: finalHtml, handle: htmlHandle });
      }
      if (getfile) setgetFile({ ...getfile, contents: newContent ?? getfile.contents });
    }
    
    setupdate(!update);
  } catch (error) {
    console.error('Error saving file:', error);
    alert('Failed to save the file.');
  }
};

  return (
    <div className=" p-4">
      <div className="flex justify-between items-center mb-4">
        <h1>CodePlay</h1>
        <div className="flex gap-2">
          <button title="Auto Complete" onClick={() => setAutocomlete(!Autocomlete)} className={`${Autocomlete ? 'bg-blue-500 hover:bg-blue-600' : 'bg-red-500 hover:bg-red-600'} text-white px-4 py-2 rounded `}>AC</button>
          <button title="Save File" onClick={SaveFile} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            <Save />
          </button>
        </div>
        
      </div>
        
      
      <div ref={editorRef} className="border border-gray-300" />
    </div>
  );
}

export default CodeShow;