import { createContext } from "react";

/* Tree의 최상위 App에서 Tree의 최하위 component들에게 props를 전달하기 위해서는   */
/* 중간단계 Tree에도 props를 항상 추가해 주어야 하는 문제점을 해결하는 Context 설명 */

/* 상태가 변경되는 VALUE를 전달할 경우에 사용 */
export const TodoStateContext = createContext();

/* 상태가 변경되지 않는 VALUE를 전달할 경우에 사용 */
export const TodoDispatchContext = createContext();


