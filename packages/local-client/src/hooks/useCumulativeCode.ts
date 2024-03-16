import { useTypedSelector } from "./useTypedSelector";

export const useCumulativeCode = (cellId: string) => {
  return useTypedSelector((state) => {
    const { data, order } = state.cells;
    const orderedCells = order.map((id) => data[id]);

    // Built-in display() function that lets you display objects, JSX elements,
    // variables etc in the Preview window
    const displayFunc = `
      const display = (value) => {
        const root = document.querySelector('#root');
  
        if (typeof value === 'object') {
          if (value.$$typeof && value.props) {
            const rootElement = ReactDOM.createRoot(root);
            rootElement.render(value);
          } else {
            root.innerHTML = JSON.stringify(value);
          }
        } else {
          root.innerHTML = value;
        }
      };
    `;

    // Intercept console.log calls and redirect them to the display function
    const consoleIntercept = `
      const originalLog = console.log;
      console.log = (...args) => {
        display("Oh... why do you use console.log when you can use display()?");
        originalLog.apply(console, args);
      };
    `;

    // This is a noop function that will be used for all cells before the current cell
    // So that code from previous cells doesn't end up in the current cell's preview display
    const displayFuncNoop = "const display = () => {}";
    const cumulativeCode = [];
    // cumulative code array holds all the code that is in the cells before the current cell
    for (let c of orderedCells) {
      if (c.type === "code") {
        if (c.id === cellId) {
          cumulativeCode.push(displayFunc);
          cumulativeCode.push(consoleIntercept); // Intercept console.log calls
        } else {
          cumulativeCode.push(displayFuncNoop);
        }
        cumulativeCode.push(c.content);
      }
      // current cell is the last cell in the cumulative code array
      if (c.id === cellId) {
        break;
      }
    }
    return cumulativeCode;
  }).join("\n");
};
