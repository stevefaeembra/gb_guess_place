import "./App.css";
import Canvas from "./Canvas";

function App() {
  return (
    <div className="container  grid grid-rows-6">
      <p className="row mx-auto text-xl">UK Place Finding Game</p>
      <Canvas className="row mx-auto grid-row-span-5" width="992" height="1842" />
    </div>
  );
}

export default App;
