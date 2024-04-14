import { useEffect, useRef, useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import './textEditor.css';
import { Cell } from '../../state';
import { useActions } from '../../hooks/use-actions';


interface IProps {
  cell: Cell;
}

function TextEditor({cell}: IProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [editing, setEditing] = useState(false);
  const { updateCell } = useActions();


  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if(ref.current && e.target && !ref.current?.contains(e.target as Node)) setEditing(false);
    };
    document.addEventListener('click', listener, {capture: true});
    return () => removeEventListener('click', listener, {capture: true});
  }, [])

  const handleChange = (newValue: string | undefined) => {
    if(newValue) updateCell(cell.id, newValue);
  };

  if(editing) {
    return (
      <div ref={ref} style={{marginTop: '60px'}} className='text-editor card'>
        <div className='card'>
          <MDEditor value={cell.content} onChange={handleChange}/>
        </div>
      </div>
    );
  }

  return (
    <div style={{marginTop: '60px'}} onClick={() =>setEditing(true)} className='text-editor card'>
      <div className='card'>
        <MDEditor.Markdown source={cell.content ||  '# Header'}/>
      </div>
    </div>
  )
}

export default TextEditor;