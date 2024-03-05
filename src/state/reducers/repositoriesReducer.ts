import { ActionType } from "../action-types";
import { Action } from "../actions";

// Type of data that we will be working with: https://registry.npmjs.com/-/v1/search?text=react

/**
 * Represents the state of repositories.
 * @property loading - Indicates if we are currently fetching data from the API.
 * @property error - A string that will contain an error message if we fail to fetch the data.
 * @property data - List of repositories we will be getting from the API.
 */
interface RepositoriesState {
  loading: boolean;
  error: string | null;
  data: string[];
}

/** Reducer function that will be used to update the state of repositories, heavily used in Redux
 * @returns {RepositoriesState} - The updated state of repositories based on the action.
 */
const reducer = (
  state: RepositoriesState,
  action: Action
): RepositoriesState => {
  switch (action.type) {
    case ActionType.SEARCH_REPOSITORIES:
      return { loading: true, error: null, data: [] };
    case ActionType.SEARCH_REPOSITORIES_SUCCESS:
      return { loading: false, error: null, data: action.payload };
    case ActionType.SEARCH_REPOSITORIES_ERROR:
      return { loading: false, error: action.payload, data: [] };
    default:
      return state;
  }
};

export default reducer;
