
import { useActions } from "../../hooks/use-actions";


interface IProps {
  id: string;
}


function ActionBar({id}: IProps) {
  const { moveCell, deleteCell } = useActions();

  return (
    <div>
      <button className="button is-primary is-small" onClick={() => moveCell(id, 'up')}>
        <span className="icon"><i className="fas fa-arrow-up"/></span>
      </button>
      <button className="button is-secondary is-small" onClick={() => moveCell(id, 'down')}>
      <span className="icon"><i className="fas fa-arrow-down"/></span>
      </button>
      <button className="button is-danger is-small" onClick={() => deleteCell(id)}>
      <span className="icon"><i className="fas fa-trash"/></span>
      </button>
    </div>
  )
}

export default ActionBar