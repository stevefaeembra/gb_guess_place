import "./App.css";
import Canvas from "./Canvas";

function App() {
  return (
    <>
      <h1>UK Place Finding Game</h1>
      <div style={{ display: "none" }}>
        <img id="source" src="uk.png" />
      </div>
      <Canvas width="992" height="1842" />
    </>
  );
}

export default App;
