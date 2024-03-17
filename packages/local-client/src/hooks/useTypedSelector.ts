import { useSelector, TypedUseSelectorHook } from "react-redux";
import { RootState } from "../state";

// selectors are used to get the state from the redux store
// they shouldn't have async code inside them
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
