import ChildCom1 from "./components/ChildCom1";
import { MyContext1, MyContext2 } from "./context";


function App() {
  // 这是我在根组件维护的状态数据
  // const [counter, setCounter] = useState(1);

  return (
    // 这里的 value 相当于是将后面的数据放入到上下文环境中
    <MyContext1.Provider value={{ a: 1, b: 2, c: 3 }}>
      <MyContext2.Provider value={{ a: 100, b: 200, c: 300 }}>
        <div style={{
          border: '1px solid',
          width: "250px",
        }}>
          <ChildCom1 />
        </div>
      </MyContext2.Provider>
    </MyContext1.Provider>
  )
}

export default App;