

import 'bulmaswatch/superhero/bulmaswatch.min.css';
import { Provider } from 'react-redux';
import { store } from '../../state';
import CellList from '../CellList/CellList';



function App() {

  return (
    <Provider store={store}>
      <CellList />
    </Provider>
  )
}


export default App
