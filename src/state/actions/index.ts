import { ActionType } from "../action-types";

export type Action =
  | SearchRepositoriesAction
  | SearchRepositoriesSuccessAction
  | SearchRepositoriesErrorAction;

/**
 * @property type - The type of action that will be used to search for repositories.
 */
interface SearchRepositoriesAction {
  type: ActionType.SEARCH_REPOSITORIES;
}

/**
 * @property type - The type of action that will be used to search for repositories.
 * @property payload - The list of repositories that will be used to update the state.
 */
interface SearchRepositoriesSuccessAction {
  type: ActionType.SEARCH_REPOSITORIES_SUCCESS;
  payload: string[];
}

/**
 * @property type - The type of action that will be used to search for repositories.
 * @property payload - The error message that will be used to update the state.
 */
interface SearchRepositoriesErrorAction {
  type: ActionType.SEARCH_REPOSITORIES_ERROR;
  payload: string;
}
