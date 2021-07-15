import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { LibraryBook } from "../interfaces";
import { deleteBookFromLibrary } from "../redux/Library/library.actions";

const BookItem = ({ book }: { book: LibraryBook }) => {
  const dispatch = useDispatch();

  return (
    <div className="book-item">
      <img src={book.imageURL} alt={book.title} />
      <div className="book-details">
        <div className="book-text">
          <Link to={`/book/${book.googleBooksId}`}>
            <h1>{book.title}</h1>
          </Link>
          <h2>{book.authors}</h2>
          {/* Replace */}
          <h3>Added 1 hour ago</h3>
        </div>
        <div className="book-options">
          <button>Add to list</button>
          <button
            className="delete-btn"
            onClick={(e) => dispatch(deleteBookFromLibrary(book.googleBooksId))}
          >
            <i className="fas fa-trash"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookItem;
