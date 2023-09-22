import ChildCom from "./components/ChildCom";
import { useRef } from "react";
function App() {

  const comRef = useRef();

  function clickHandle(){
    comRef.current.click();
    comRef.current.testHandle();
  }


  return (
    <>
      <ChildCom ref={comRef} />
      <button onClick={clickHandle}>click</button>
    </>)
}

export default App;