import ChildCom from "./components/ChildCom"
function App() {
  return (
   <div>
      <ChildCom name="xiejie-stu" age={18} score={[98, 97, 100]}>
        <div>hello</div>
      </ChildCom>

      <ChildCom age={18} score={[98, 97, 100]}>
        <div>world</div>
      </ChildCom>
        
   </div>
  );
}

export default App;
