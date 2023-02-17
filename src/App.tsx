import "./App.css";
import Canvas from "./Canvas";

function App() {
  return (
    <div className="container w-3/4 mx-auto grid grid-cols-2">
      <h1 className="row">UK Place Finding Game</h1>
      <Canvas className="row" width="992" height="1842" />
    </div>
  );
}

export default App;
