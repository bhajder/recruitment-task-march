interface LoadingState {
  [key: string]: boolean;
}

interface StartLoadingAction {
  type: "START_LOADING";
  key: string;
}

interface StopLoadingAction {
  type: "STOP_LOADING";
  key: string;
}

type LoadingAction = StartLoadingAction | StopLoadingAction;

const loadingReducer = (state: LoadingState, action: LoadingAction) => {
  switch (action.type) {
    case "START_LOADING":
      return {
        ...state,
        [action.key]: true,
      };
    case "STOP_LOADING":
      return {
        ...state,
        [action.key]: false,
      };
    default:
      return state;
  }
};

export default loadingReducer;
