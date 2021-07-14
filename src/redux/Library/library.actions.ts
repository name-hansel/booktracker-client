import axios from "../../utils";
import { Dispatch } from "redux";

import { LibraryBook } from "../../interfaces";
import { setNewAccessToken } from "../../utils";

export const getLibraryData =
  (userId: string) => async (dispatch: Dispatch) => {
    try {
      const { data } = await axios.get(`/library`);
      dispatch({
        type: "GET_LIBRARY",
        payload: data,
      });
    } catch (err) {
      console.error(err.message);
    }
  };

export const addBookToLibrary =
  (book: LibraryBook) => async (dispatch: Dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify(book);
      // Returns msg
      const { data } = await axios.post(
        `/library/${book.googleBooksId}`,
        body,
        config
      );
      if (data.accessToken) {
        setNewAccessToken(data.accessToken);
      }
      dispatch({
        type: "ADD_BOOK_TO_LIBRARY",
        payload: {
          book,
        },
      });
    } catch (err) {
      console.error(err.message);
    }
  };
