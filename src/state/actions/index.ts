import { ActionType } from '../action-types';
import { CellTypes } from '../cell';

export type Direction = 'up' | 'down';

// Reordering the cells
export interface MoveCellAction {
  type: ActionType.MOVE_CELL;
  payload: {
    id: string;
    direction: Direction;
  };
}

// Deleting a cell
export interface DeleteCellAction {
  type: ActionType.DELETE_CELL;
  payload: string;
}

// Inserting a new cell
export interface InsertCellBeforeAction {
  type: ActionType.INSERT_CELL_BEFORE;
  payload: {
    // id of the cell before which the new cell will be inserted
    // if null, the new cell will be inserted at the end
    id: string | null;
    type: CellTypes;
  };
}

// Updating the content of a cell
export interface UpdateCellAction {
  type: ActionType.UPDATE_CELL;
  payload: {
    id: string;
    content: string;
  };
}

// Union of all the actions
export type Action =
  | MoveCellAction
  | DeleteCellAction
  | InsertCellBeforeAction
  | UpdateCellAction;
