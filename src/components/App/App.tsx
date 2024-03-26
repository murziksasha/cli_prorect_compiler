
import * as esbuild from 'esbuild-wasm';
import { useEffect, useRef, useState } from "react"
import { unpkgPathPlugin } from '../../plugins/unpkg-path-plugin';
import { fetchPlugin } from '../../plugins/fetch-plugin';


function App() {
  const ref = useRef<any>();
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');
  const [headerInput, setHeaderInput] = useState('');


  const initializeEsbuild = async () => {
    try {
      ref.current = await esbuild.startService({
        worker: true,
        wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm'
      });
    } catch (error) {
      console.error('Error initializing esbuild service:', error);
    }
  };

  useEffect(() => {
    initializeEsbuild();
  }, [])


  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  }

  const handleClick = async () => {
    setCode('');    
    // setInput('');
    if(!ref.current) return;
    const result = await ref.current.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [
        unpkgPathPlugin(),
        fetchPlugin(input)
      ],
      define: {
        'process.end.NODE_ENV': '"production"',
        global: 'window'
      }
    });
    setCode(result.outputFiles[0].text);

    try {
      eval(result.outputFiles[0].text);
    } catch (error) {
      alert(error);
    }

    setHeaderInput(input);

  }

  
  const handleClickReset = () => {
    setCode('');
    setInput('');
    setHeaderInput('');
  }

  return (
    <div style={{margin: '20px 20px', position: 'relative', marginLeft: '50%'}}>
      <h3>Please enter any valid JavaScript/React code (includes all libraries)</h3>
      <textarea onChange={handleChange} value={input} placeholder='Enter your code or any name of library...' rows={15} cols={120}
      />
      <div>
        <button onClick={handleClick}>Submit</button>
        <button onClick={handleClickReset}>Reset</button>
      </div>
      {headerInput && <h2>{headerInput}</h2>}
      {code && <pre>{code}</pre>}
      <iframe src="./iframe.html"></iframe>
    </div>
  )
}

export default App
