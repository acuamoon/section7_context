import "./TodoItem.css";
import { memo, useContext } from 'react';
import { TodoDispatchContext } from "../TodoContext";

function TodoItem({ id, isDone, createdDate, content }) {
  
  /* useContext를 사용해서 props 없이 전달하기  */
    const { onUpdate, onDelete } = useContext(TodoDispatchContext);

    const onChangeCheckBox = () => {
      onUpdate(id);
    }
  
    const onClickDeleteButton = () => {
      onDelete(id);
    }

    return (
      <div className="TodoItem">
        <input type="checkbox" checked={isDone} onChange={onChangeCheckBox}/>
        <div className="content">{content}</div>
        <div className="date">{new Date(createdDate).toLocaleDateString()}</div>
        <button onClick={onClickDeleteButton}>삭제</button>
      </div>
    );
}

/* memo : Props가 변경되지 않으면 컴포넌트를 리렌더링 하지 않도록 하는 기능 */
export default memo(TodoItem);