//@ts-ignore
import * as esbuild from 'esbuild-wasm';
import { useEffect, useState } from "react"


function App() {
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');


  const initializeEsbuild = async () => {
    try {
      const service = await esbuild.startService({
        worker: true,
        wasmURL: '/esbuild.wasm'
      });
      console.log(service);
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

  const handleClick = () => {
    setCode(input);
    setInput('');
  }

  return (
    <div>
      <textarea onChange={handleChange} value={input}/>
      <div>
        <button onClick={handleClick}>Submit</button>
      </div>
      <pre>{code}</pre>
    </div>
  )
}

export default App
