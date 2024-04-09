
import Editor, {OnChange} from '@monaco-editor/react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
import { useEffect, useRef } from 'react';

interface IProps {
  initializeCode: string;
  onChange(value: string): void;
}

function MonacoEditor({initializeCode, onChange}: IProps) {

  const editorRef = useRef<any>(null);

  useEffect(() => {
    editorRef.current = initializeCode;
    //ts-ignore
   handleMount(editorRef.current);
  }, [])

  const handleMount: OnChange = (getValue) => {
    if(!getValue) return;

    editorRef.current = getValue;
    onChange(editorRef.current);
  };

  return (
    <>
      <Editor
        onChange={handleMount}
        defaultLanguage="javascript" 
        defaultValue={initializeCode} 
        theme='vs-dark' 
        options={{
          wordWrap: 'on',
          minimap: {enabled: false},
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2
        }}
      />
    </>
    
  )
}

export default MonacoEditor