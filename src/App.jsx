import { useState, useRef, useReducer, useCallback, useMemo } from "react";
import "./App.css";
import Header from "./components/Header";
import TodoEditor from "./components/TodoEditor";
import TodoList from "./components/TodoList";
import { TodoStateContext, TodoDispatchContext } from "./TodoContext";

const mockData = [
  {
    id: 0,
    isDone: true,
    content: "React 공부하기",
    createdDate: new Date().getTime(),
  },
  {
    id: 1,
    isDone: false,
    content: "빨래 널기",
    createdDate: new Date().getTime(),
  },
  {
    id: 2,
    isDone: true,
    content: "음악 연습하기",
    createdDate: new Date().getTime(),
  },
];

/* 1번째 Param 현재상태, 2번째 Param은 action 객체 */
function reducer(state, action) {
  switch(action.type) {
    case "CREATE": { 
      return [...state, action.data]; 
    }
    case "UPDATE": { 
      return state.map((it) => 
        it.id === action.data 
          ? { ...it, isDone: !it.isDone }
          : it );
    }
    case "DELETE": {
      return state.filter((it) => it.id !== action.data);
    }
  }
}


function App() {
    /* 1번째 Param은 Value, 2번째 Param은 상태변화를 촉발시키는 트리거 역할의 함수 (발생만 시킴)  */
    /* useReducer : 1번째 Param은 상태변화가 발생하였는데 실행되는 함수, 2번째 Param은 초기값    */
  const [todos, dispatch] = useReducer(reducer, mockData);
  const idRef = useRef(3);

  const onCreate = (content) => {
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current++,
        isDone: false,
        content,
        createdDate: new Date().getTime(),
      },
    });
  }

  /* useCallback 함수의 1번째 Param은 2번째 Param에 설정한 값이 변경되는 시점에 */
  /* 1번째 Param에 정의한 함수가 작동                                         */
  const onUpdate = useCallback((targetId) => {
    dispatch({
      type: "UPDATE",
      data: targetId,
    });
  }, [])

  const onDelete = useCallback((targetId) => {
    dispatch({
      type: "DELETE",
      data: targetId,
    });
  }, [])  

  /* useMemo 1번째 Parma은 다시 수행시키고 싶지 않은 연산. 2번째 Param은 다시 수행시킬 변수를 정의*/
  const memorizedDispatchs = useMemo(()=>{
    return {
      onCreate, onDelete, onUpdate
    }
  },[])


  return (
    <div className="App">
      <Header />
      <TodoStateContext.Provider value={todos}>
        <TodoDispatchContext.Provider value={memorizedDispatchs}>
          <TodoEditor />
          <TodoList />
        </TodoDispatchContext.Provider>
      </TodoStateContext.Provider>
    </div>
  );
}

export default App;