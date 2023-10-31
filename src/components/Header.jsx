import "./Header.css";
import { memo } from "react";

function Header() {
  var options = { year: "numeric", month: "long", day: "numeric", weekday: "long" };
  return (
    <div className="Header">
      <h1>{new Date().toLocaleDateString("ko-KR", options)}</h1>
    </div>
  );
}

/* memo는 처음을 빼고 ReRendering을 하지 않도록 하는 기능을 가짐       */
/* memo는 param으로 component를 입력 받아서 최적화된 component를 생성 */
/* export default를 memo component 앞에 붙여 준다                   */
export default memo(Header);

