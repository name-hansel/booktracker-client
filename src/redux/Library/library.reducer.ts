import { LibraryAction, LibraryState } from "../../interfaces";

const initialState: LibraryState = {
  library: [],
  loading: true,
};

const reducer = (state = initialState, action: LibraryAction): LibraryState => {
  switch (action.type) {
    case "GET_LIBRARY":
      return {
        ...state,
        library: action.payload.library,
        loading: false,
      };
    default:
      return state;
  }
};

export default reducer;
