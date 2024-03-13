import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../state/";
import { useMemo } from "react";

console.log("Action Creators:", actionCreators);

export const useActions = () => {
  const dispatch = useDispatch();

  // useMemo is a hook that will only re-run the function if the dependencies change
  // otherwise we would be re-rendering the Preview component every time the CodeCell 
  // component re-renders
  // whenever dispatch changes - we will re-run the function and re-bind the action creators
  // @@TODO: It only flickers when we initially load the app and possibly when it is re-rendered
  // So might be a good cover to add a loading spinner or a transition effect.
  return useMemo(() => {
    return bindActionCreators(actionCreators, dispatch);
  }, [dispatch]);
};
