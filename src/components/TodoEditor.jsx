import "./TodoEditor.css";
import { useState, useRef, useContext } from "react";
import { TodoDispatchContext } from "../TodoContext";

export default function TodoEditor() {

  /* useContext를 사용해서 props 없이 전달하기  */
  const { onCreate } = useContext(TodoDispatchContext);

  const [content, setContent] = useState('');
  /* 입력값이 빈칸인 경우는 Focus를 특정 위치에 있도록 처리   */
  /* 예시에서는 input 항목에 정의를 ref로 해당 inputRef 정의 */ 
  const inputRef = useRef();

  /* input 항목에 입력을 할 경우 발생하는 event에 content를 value에 설정하는 처리 */
  const onChangeContent = (e) => {
    setContent(e.target.value);
  };

  const onClick = () => {
    /* 입력한 값이 없는 경우는 return 처리  */
    if(content === '') {
      inputRef.current.focus();
      return;
    }
    /* Todo List에 Add 처리 */
    onCreate(content);
    /* 버튼을 Click한 경우는 입력한 값을 지워주는 처리 */
    setContent('');
  };

  const onKeyDown= (e) => {
    /* Enter Key를 누른 경우는 Click한 경우와 같게 처리  */
    if (e.keyCode === 13) {
      onClick();
    }
  }

  return (
    <div className="TodoEditor">
      <input 
         ref={inputRef} 
         value={content}
         onChange={onChangeContent}
         onKeyDown={onKeyDown}
         placeholder="새로운 TODO..." />
      <button onClick={onClick}>추가</button>
    </div>
  );
}