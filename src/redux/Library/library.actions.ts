import axios from "../../utils";
import { Dispatch } from "redux";

export const getLibraryData =
  (userId: string) => async (dispatch: Dispatch) => {
    try {
      const { data } = await axios.get(`/library/${userId}`);
      dispatch({
        type: "GET_LIBRARY",
        payload: data,
      });
    } catch (err) {
      console.error(err.message);
    }
  };
