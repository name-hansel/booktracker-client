import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { getLibraryData } from "../../redux/Library/library.actions";
import UserContext from "../../context/user";
import { State } from "../../interfaces";
import Spinner from "../../components/Spinner";
import LibraryItem from "../../components/LibraryItem";

const Library: React.FC = () => {
  const dispatch = useDispatch();
  const { library, loading } = useSelector((state: State) => state.library);
  const { userState } = React.useContext(UserContext);

  React.useEffect(() => {
    if (!userState.loading) dispatch(getLibraryData(userState.user._id));
  }, []);

  return !loading ? (
    library.length === 0 ? (
      <h1>No books</h1>
    ) : (
      <>
        {library.map((book) => (
          <LibraryItem book={book} key={book.googleBooksId} />
        ))}
      </>
    )
  ) : (
    <Spinner />
  );
};

export default Library;
