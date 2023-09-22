import ChildCom1 from "./components/ChildCom1"
import ChildCom2 from "./components/ChildCom2"
import withLog from "./HOC/withLog";
import withTimer from "./HOC/withTimer";
import { useState } from "react";

const NewChildCom1 = withTimer(withLog(ChildCom1));
const NewChildCom2 = withTimer(withLog(ChildCom2));

function App() {

  const [toggle, setToggle] = useState(true);

  return (
   <div>
      <button onClick={()=>setToggle(!toggle)}>切换</button>
      {toggle ? <NewChildCom1 name="谢杰"/> : <NewChildCom2 age={18}/>}
   </div>
  );
}

export default App;
