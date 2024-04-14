import { Cell } from "../../state"
import CodeCell from "../CodeCell/CodeCell";
import TextEditor from "../TextEditor/TextEditor";
import ActionBar from "../ActionBar/ActionBar";

const initializeCode = `
import React from 'react'; 
import ReactDOM from 'react-dom'; 
const App = () => <h1>Hi there!</h1>; 
ReactDOM.createRoot(document.getElementById('root')).render( <App /> )
`;

interface IProps {
  cell: Cell;
}

function CellListItem({cell}: IProps) {

  let child: JSX.Element;
  cell.type === 'code' ? child = <CodeCell initializeCode={initializeCode} cell={cell}/> : child = <TextEditor cell={cell}/>


  return (
    <div style={{margin: '80px 80px', position: 'relative'}}>
      <ActionBar id={cell.id}/>
      {child}
    </div>
  )
}

export default CellListItem