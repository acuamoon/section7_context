import { useState, useMemo } from "react";
import TodoItem from "./TodoItem";
import "./TodoList.css";
import { TodoStateContext } from "../TodoContext";
import { useContext } from "react";

export default function TodoList() {
  const todos  = useContext(TodoStateContext); 

  const [search, setSearch] = useState("");

  const onChangeSearch = (e) => {
    return setSearch(e.target.value);
  }

  const filterTodos = () => {
    if(search === "") {
      /* 검색값을 입력하지 않았으면 기존값을 그대로 보여줌 */
      return todos;
    }
    /* 검색값으로 Filter를 걸어서 해당 값만 Return */
    /* 소문자로 전환하여 검색                     */
    return todos.filter((todo) => 
      todo.content
      .toLowerCase()
      .includes(search.toLowerCase()));
  };

  const getAnalyzedTodoData = () => {
    console.log("Todo 분석 화면 호출")
    const totalCount = todos.length;
    const doneCount = todos.filter((todo) =>todo.isDone).length;
    const notDoneCount = totalCount - doneCount;
    return {
      totalCount,
      doneCount,
      notDoneCount,
    };
  }

  
  /* 구조분할 할당 방식으로 값을 받아옴*/
  /* useMemo 1번째 Parma은 다시 수행시키고 싶지 않은 연산. 2번째 Param은 다시 수행시킬 변수를 정의*/
  const {totalCount, doneCount, notDoneCount} = useMemo(() => {
    const totalCount = todos.length;
    const doneCount = todos.filter((todo) =>todo.isDone).length;
    const notDoneCount = totalCount - doneCount;
    return {
      totalCount,
      doneCount,
      notDoneCount,
    };
  }, [todos])

  return (
    <div className="TodoList">
      <h4>Todos</h4>
      <div>
        <div>전체 Todo : {totalCount}</div>
        <div>완료 Todo : {doneCount}</div>
        <div>미완 Todo : {notDoneCount}</div>
      </div>
      <input value={search} onChange={onChangeSearch}   placeholder="검색어를 입력하세요" />
      <div className="todos_wrapper">
          {
             /* key field는 언제나 Unique해야 함 (필수) */
             /* 필터가 걸린 배열에 있는 값을 Return     */
             filterTodos().map((todo)=>
             <TodoItem key={todo.id} {...todo} />)
          }
      </div>
    </div>
  );
}