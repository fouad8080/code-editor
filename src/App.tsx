import CodeShow from "./component/CodeShow"
import Floders from "./component/floders"
import Upbar from "./component/Upbar"
function App() {
 

  return (
    <div className="App">
      <Upbar />
      <div className="flex flex-row">
        <Floders />
        <CodeShow />
      </div>
      
    </div>
  )
}

export default App
