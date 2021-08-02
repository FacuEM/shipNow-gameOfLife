export const arrayClone = (arr) => {
  return JSON.parse(JSON.stringify(arr));
};
export const generateEmptyGrid = (numRows, numCols) => {
  const rows = [];
  for (let i = 0; i < numRows; i++) {
    rows.push(Array.from(Array(numCols), () => 0));
  }

  return rows;
};

const operations = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0],
];

export const gameLogic = (numRows, numCols, grid) => {
  // Clon profundo del arreglo original para no mutar el estado original
  const gridCopy = arrayClone(grid);
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      let neighbors = 0;
      // Con el array operations me ahorro de los if por cada posibilidad
      operations.forEach(([x, y]) => {
        const newI = i + x;
        const newJ = j + y;
        // Condición para asegurar de que los indices no sobrepasen los limites de la grilla
        if (newI >= 0 && newI < numRows && newJ >= 0 && newJ < numCols) {
          neighbors += grid[newI][newJ];
        }
      });
      // Condición de soledad y sobrepoblación, la célula muere
      if (neighbors < 2 || neighbors > 3) {
        gridCopy[i][j] = 0;
        // Nace con 3 vecinos
      } else if (grid[i][j] === 0 && neighbors === 3) {
        gridCopy[i][j] = 1;
      }
    }
  }
  return gridCopy;
};
