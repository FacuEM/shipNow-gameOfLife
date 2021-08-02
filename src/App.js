import { useState, useRef } from "react";
import { generateEmptyGrid, arrayClone, gameLogic } from "./helpers";
import "./index.css";

let numRows = 30;
let numCols = 50;
let speed = 300;

const App = () => {
  const [grid, setGrid] = useState(() => {
    return generateEmptyGrid(numRows, numCols);
  });

  const [running, setRunning] = useState(false);
  const [gen, setGen] = useState(0);

  const runningRef = useRef(running);
  runningRef.current = running;

  const runSimulation = () => {
    if (!runningRef.current) {
      return;
    }
    setGrid((curr) => {
      return gameLogic(numRows, numCols, curr);
    });
    setGen((g) => g + 1);
    setTimeout(runSimulation, speed);
  };

  const clearBtn = () => {
    setGrid(generateEmptyGrid(numRows, numCols));
    setGen(0);
    speed = 300;
    if (runningRef.current) {
      setRunning(!running);
    }
  };

  const stepBtn = () => {
    setGen((g) => g + 1);
    setGrid((curr) => {
      return gameLogic(numRows, numCols, curr);
    });
  };

  const size = (size) => {
    switch (size.target.value) {
      case "s":
        numCols = 20;
        numRows = 10;
        break;
      case "l":
        numCols = 70;
        numRows = 50;
        break;

      default:
        numCols = 50;
        numRows = 30;
    }
    clearBtn();
  };

  return (
    <div className="container">
      <div className="btns">
        <button
          onClick={() => {
            setRunning(!running);
            if (!running) {
              runningRef.current = true;
              runSimulation();
            }
          }}
        >
          {running ? "Stop" : "Start"}
        </button>
        <button onClick={clearBtn}>Clear</button>
        <button onClick={stepBtn}>Step</button>
        <button onClick={() => (speed = 100)}>Fast</button>
        <button onClick={() => (speed = 1000)}>Slow</button>
        <select onChange={size}>
          <option value="" selected disabled hidden>
            Size
          </option>
          <option value="s">20x10</option>
          <option value="m">50x30</option>
          <option value="l">70x50</option>
        </select>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${numCols}, 20px)`,
        }}
      >
        {grid.map((rows, i) =>
          rows.map((col, j) => (
            <div
              key={`${i}-${j}`}
              onClick={() => {
                const gridCopy = arrayClone(grid);
                gridCopy[i][j] = grid[i][j] ? 0 : 1;
                setGrid(gridCopy);
              }}
              style={{
                width: 20,
                height: 20,
                backgroundColor: grid[i][j] ? "red" : undefined,
                border: ".5px solid gray",
              }}
            />
          ))
        )}
      </div>
      <div className="gen">
        <h4>Generation: {gen}</h4>
      </div>
    </div>
  );
};

export default App;
