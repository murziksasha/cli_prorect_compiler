import { useEffect, useRef, useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import './textEditor.css';

function TextEditor() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [value, setValue] = useState('# Header');
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if(ref.current && e.target && !ref.current?.contains(e.target as Node)) setEditing(false);
    };
    document.addEventListener('click', listener, {capture: true});
    return () => removeEventListener('click', listener, {capture: true});
  }, [])

  const handleChange = (newValue: string | undefined) => {
    if(newValue) setValue(newValue);
  };

  if(editing) {
    return (
      <div ref={ref} style={{marginTop: '60px'}} className='text-editor card'>
        <div className='card'>
          <MDEditor value={value} onChange={handleChange}/>
        </div>
      </div>
    );
  }

  return (
    <div style={{marginTop: '60px'}} onClick={() =>setEditing(true)} className='text-editor card'>
      <div className='card'>
        <MDEditor.Markdown source={value}/>
      </div>
    </div>
  )
}

export default TextEditor;