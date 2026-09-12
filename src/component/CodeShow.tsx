import { useEffect, useRef } from 'react';
import { EditorView, basicSetup } from 'codemirror';
import { javascript } from '@codemirror/lang-javascript';

function CodeShow() {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!editorRef.current) return;

    const view = new EditorView({
      extensions: [basicSetup, javascript()],
      parent: editorRef.current,
    });

    return () => view.destroy();
  }, []);

  return (
    <div className="w-3/4 p-4" >
      <h1>CodePlay</h1>
      <div ref={editorRef} className="border border-gray-300" />
    </div>
  );
}

export default CodeShow;