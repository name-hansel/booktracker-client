import React from "react";
import { useSelector } from "react-redux";
import { Link, RouteComponentProps } from "react-router-dom";
import axios from "../utils";
import DOMPurify from "dompurify";

import Spinner from "../components/Spinner";
import AlertContext from "../context/alert";
import { setAlert } from "../actions/alert";
import UserContext from "../context/user";
import { useDispatch } from "react-redux";
import {
  addBookToLibrary,
  getLibraryData,
  deleteBookFromLibrary
} from "../redux/Library/library.actions";
import { State } from "../interfaces";

interface RouterProps {
  bookId: string;
}

const BookPage: React.FC<RouteComponentProps<RouterProps>> = ({
  match,
  history,
}) => {
  const { alertDispatch } = React.useContext(AlertContext);
  const { userState } = React.useContext(UserContext);
  const { library, loading } = useSelector((state: State) => state.library);

  const dispatch = useDispatch();

  const [bookData, setBookData] = React.useState({
    loading: true,
    title: "",
    subtitle: "",
    authors: [],
    publisher: "",
    publishedDate: "",
    description: "",
    pageCount: "",
    categories: [],
    averageRating: "",
    ratingsCount: "",
    imageURL: "",
  });

  const getBookData = React.useCallback(
    async (bookId: string) => {
      try {
        const { data } = await axios.get(`/book/search/${bookId}`);
        setBookData({
          loading: false,
          ...data,
        });
      } catch (err) {
        setAlert(alertDispatch, {
          text: err.response.data.error,
          type: "danger",
        });
      }
    },
    [alertDispatch]
  );

  const addBook = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    dispatch(
      addBookToLibrary({
        googleBooksId: match.params.bookId,
        title: bookData.title,
        authors: bookData.authors,
        imageURL: bookData.imageURL,
      })
    );
  };

  React.useEffect(() => {
    const bookId = match.params.bookId;
    setBookData({
      ...bookData,
      loading: true,
    });
    getBookData(bookId);
  }, [match.params.bookId]);

  // If library is not loaded, load it
  React.useEffect(() => {
    if (!userState.loading && library.length === 0 && loading)
      dispatch(getLibraryData(userState.user._id));
  });

  return bookData.loading || loading ? (
    <Spinner />
  ) : (
    <>
      <button className="go-back" onClick={(e) => history.goBack()}>
        &lt;&lt; Back
      </button>
      <main className="page-main">
        <section className="left">
          <img
            src={bookData.imageURL ? bookData.imageURL : "/placeholder.jpg"}
            alt={bookData.title}
          />
          {bookData.averageRating ? (
            <div className="stars">
              <i className="fas fa-star fill"></i>
              <i className="fas fa-star fill"></i>
              <i className="fas fa-star fill"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <span className="rating-count">({bookData.ratingsCount})</span>
            </div>
          ) : (
            ""
          )}
          {userState.isAuthenticated ? (
            <div className="button-div">
              {library
                .map((book) => book.googleBooksId)
                .indexOf(match.params.bookId) === -1 ? (
                <button onClick={(e) => addBook(e)}>Add to library</button>
              ) : (
                <>
                  <button>Add to list</button>
                  <button
                    onClick={(e) =>
                      dispatch(deleteBookFromLibrary(match.params.bookId))
                    }
                  >
                    Remove from library
                  </button>
                </>
              )}
              <button>Review Book</button>
            </div>
          ) : (
            <div className="button-text button-div">
              <Link to="/login">
                <button>Login</button>
              </Link>
              <p>Login to review or add this book to your library!</p>
            </div>
          )}
        </section>
        <section className="right">
          <div className="main-details">
            <h1 className="title">{bookData.title}</h1>
            <h2 className="authors">
              {bookData.authors && bookData.authors.join(",")}
            </h2>
          </div>
          <div className="more-details">
            <div className="options">
              <button className="option active">
                <Link to={`/book/:bookId/about`}>About</Link>
              </button>
              <button className="option">
                <Link to={`/book/:bookId/reviews`}>Reviews</Link>
              </button>
            </div>
            <h5 className="subtitle">
              {bookData.subtitle ? bookData.subtitle : ""}
            </h5>
            <p
              className="description"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(bookData.description),
              }}
            ></p>
            <div className="more-more-details">
              <h5>
                <span>Published date: </span>
                {bookData.publishedDate}
              </h5>
              <h5>
                <span>Publisher: </span>
                {bookData.publisher}
              </h5>
              <h5>
                <span>Categories:</span>
                {bookData.categories ? bookData.categories.join(", ") : "-"}
              </h5>
              <h5>
                <span>Page count:</span>
                {bookData.pageCount}
              </h5>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default BookPage;
