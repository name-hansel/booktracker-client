import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { getLibraryData } from "../../redux/Library/library.actions";
import UserContext from "../../context/user";
import { State } from "../../interfaces";
import Spinner from "../../components/Spinner";
import BookItem from "../../components/BookItem";

const Library: React.FC = () => {
  const dispatch = useDispatch();
  const { library, loading } = useSelector((state: State) => state.library);
  const { userState } = React.useContext(UserContext);

  React.useEffect(() => {
    if (!userState.loading) dispatch(getLibraryData(userState.user._id));
  }, []);

  return (
    <>
      <div className="library-books">
        {!loading ? (
          library.length === 0 ? (
            <h1 className="indicator-text">No books</h1>
          ) : (
            <>
              {library.map((book) => (
                <BookItem book={book} key={book.googleBooksId} />
              ))}
            </>
          )
        ) : (
          <Spinner />
        )}
      </div>
    </>
  );
};

export default Library;
