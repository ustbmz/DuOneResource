import Input from "./components/Input";
import List from "./components/List";

import "./css/App.css"

function App(props) {

  return (
    // 最外层容器
    <div className="container">
      <h1 className="lead" style={{
        marginBottom : "30px"
      }}>待办事项</h1>
      <Input store={props.store}/>
      <List store={props.store}/>
    </div>
  )

}

export default App;