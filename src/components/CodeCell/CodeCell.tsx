import { useState } from "react";
import bundle from "../../bundler";
import MonacoEditor from "./MonacoEditor";
import Preview from "./Preview/Preview";
import Resizable from "../Resizable";


interface IProps {
  initializeCode: string;
}

function CodeCell({initializeCode}: IProps) {
  const [input, setInput] = useState('');
  const [err, setErr] = useState('');
  const [code, setCode] = useState('');


  const handleClick = async () => {
    const output = await bundle(input);
    setCode(output.code);
    setErr(output.err);
  }



  return (
    <div style={{display: 'flex', gap: '0 85px'}}>
        <Resizable>
          <MonacoEditor 
            initializeCode={initializeCode}
            onChange={(value) => setInput(value)}
          />
          </Resizable>
            <button style={{position: 'absolute', top: '-37px', left: '837px'}} className='button is-primary is-small' onClick={handleClick}>Submit</button>
        <Preview code={code} err={err}/>
    </div>
  )
}

export default CodeCell