import { LibraryBook, LibraryAction } from "../../interfaces";

const initialState: LibraryBook[] = [];

const reducer = (state = initialState, action: LibraryAction) => {
  switch (action.type) {
    case "GET_LIBRARY":
      return action.payload;
    default:
      return state;
  }
};

export default reducer;
