import { useTypedSelector } from "./use-typed-selector";

export const useCumulativeCode = (cellId: string) => {
  return useTypedSelector((state) => {
    const { data, order } = state.cells;
    const orderedCells = order.map((id) => data[id]);

    // Built in display() function that lets you display objects, JSX elements,
    // variables etc in the Preview window
    // importing ReactDOM from 'react-dom' is faster but throws a "Warning"
    // NOTE: No need to import React in code cell
    // show(<div><Component/><Component/></div>)
    const displayFunc = `
    import _React from 'react';
    import _ReactDOM from 'react-dom/client';
    var display = (value) => {
      const root = document.querySelector('#root');
  
      if (typeof value === 'object') {
        if (value.$$typeof && value.props) {
          const rootElement = _ReactDOM.createRoot(root);
          rootElement.render(value);
        } else {
          root.innerHTML = JSON.stringify(value);
        }
      } else {
        root.innerHTML = value;
      }
    };
  `;

    // This is a noop function that will be used for all cells before the current cell
    // So that code from previous cells doesn't end up in current cell's preview display
    const displayFuncNoop = "var display = () => {}";
    const cumulativeCode = [];
    // cumulative code array holds all the code that are in the cells before the current cell
    for (let c of orderedCells) {
      if (c.type === "code") {
        if (c.id === cellId) {
          cumulativeCode.push(displayFunc);
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
