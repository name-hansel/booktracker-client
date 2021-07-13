import { combineReducers } from "redux";

import libraryReducer from "./Library/library.reducer";

const rootReducer = combineReducers({
  library: libraryReducer,
});

export default rootReducer;
