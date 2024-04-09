

import 'bulmaswatch/superhero/bulmaswatch.min.css';
import CodeCell from '../CodeCell/CodeCell';
import TextEditor from '../TextEditor/TextEditor';
import { Provider } from 'react-redux';
import { store } from '../../state';



const initializeCode = `
  import React from 'react'; 
  import ReactDOM from 'react-dom'; 
  const App = () => <h1>Hi there!</h1>; 
  ReactDOM.createRoot(document.getElementById('root')).render( <App /> )
`;


function App() {

  return (
    <Provider store={store}>
      <div style={{margin: '80px 80px', position: 'relative'}}>
        <CodeCell initializeCode={initializeCode}/>
        <TextEditor />
      </div>
    </Provider>
  )
}


export default App
