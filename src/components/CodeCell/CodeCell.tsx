import { useEffect, useState } from "react";
import bundle from "../../bundler";
import MonacoEditor from "./MonacoEditor";
import Preview from "./Preview/Preview";
import Resizable from "../Resizable";
import { Cell } from "../../state";
import { useActions } from '../../hooks/use-actions';


interface IProps {
  initializeCode: string;
  cell: Cell;
}

function CodeCell({initializeCode, cell}: IProps) {
  const [err, setErr] = useState('');
  const [code, setCode] = useState('');
  const { updateCell } = useActions();




  const handleClick = async () => {
    const output = await bundle(cell.content);
    setCode(output.code);
    setErr(output.err);
  }



  return (
    <div style={{display: 'flex', gap: '0 85px'}}>
        <Resizable>
          <MonacoEditor 
            initializeCode={cell.content || initializeCode}
            onChange={(value) => updateCell(cell.id, value)}
          />
          </Resizable>
            <button style={{position: 'absolute', top: '-37px', left: '837px'}} className='button is-primary is-small' onClick={handleClick}>Submit</button>
        <Preview code={code} err={err}/>
    </div>
  )
}

export default CodeCell