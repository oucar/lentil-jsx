import { ActionType } from "../action-types";
import { Action } from "../actions";
import { Cell } from "../cell";
import produce from "immer";

interface CellsState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell;
  };
  firstTimeLoading:boolean;
}

const initialState: CellsState = {
  loading: false,
  error: null,
  order: [],
  data: {},
  firstTimeLoading:true,
};

const reducer = produce((state: CellsState = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.FETCH_CELLS:
      // just in case we have an error from a previous fetch
      state.error = null;
      state.loading = true;
      return state;

    case ActionType.FETCH_CELLS_COMPLETE:
      // action payload is Cell[] - for each cell in the array return their ids
      state.order = action.payload.map((cell) => cell.id);
      // iterate over every element and add in new data
      state.data = action.payload.reduce((acc, cell) => {
        // adiing a KVP to the acc object
        acc[cell.id] = cell;
        return acc;
      }, {} as CellsState["data"]);
      return state;

    case ActionType.FETCH_CELLS_ERROR:
      state.loading = false;
      state.error = action.payload;
      return state;

    case ActionType.UPDATE_CELL:
      const { id, content } = action.payload;
      state.data[id].content = content;
      return state;

    case ActionType.DELETE_CELL:
      delete state.data[action.payload];
      // creating a brand new array of order without the deleted cell
      state.order = state.order.filter((id) => id !== action.payload);
      return state;

    case ActionType.MOVE_CELL:
      const { direction } = action.payload;
      const index = state.order.findIndex((id) => id === action.payload.id);
      const targetIndex = direction === "up" ? index - 1 : index + 1;

      // if the targetIndex is out of bounds, return the state as is
      if (targetIndex < 0 || targetIndex > state.order.length - 1) {
        return state;
      }

      // regular swap
      state.order[index] = state.order[targetIndex];
      state.order[targetIndex] = action.payload.id;

      return state;

    case ActionType.INSERT_CELL_AFTER:
      const cell: Cell = {
        content: "",
        type: action.payload.type,
        id: randomId(),
      };

      state.data[cell.id] = cell;

      const foundIndex = state.order.findIndex(
        (id) => id === action.payload.id
      );

      // no cell with the id found
      if (foundIndex < 0) {
        // add one to the head of the order array
        state.order.unshift(cell.id);
      } else {
        state.order.splice(foundIndex + 1, 0, cell.id);
      }

      return state;

    default:
      return state;
  }
}, initialState);

const randomId = () => {
  return Math.random().toString(36).substring(1, 10);
};

export default reducer;
