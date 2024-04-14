import { useMemo } from 'react';
import { useTypedSelector } from '../../hooks/use-typed-selector';
import { Cell } from '../../state';
import './CellList.css';
import CellListItem from './CellListItem';



function CellList() {
  //@ts-ignore
  const cells: Cell[] = useTypedSelector(({cells: {order, data}}) => order.map((id) => data[id]));

  // Memoize the renderedCells array
  const renderedCells = useMemo(() => (
    cells.map((cell: Cell) => <CellListItem key={cell.id} cell={cell}/>)
  ), [cells]);

  return (
    <div className='cell-list'>
      {renderedCells}
    </div>
  )
}

export default CellList