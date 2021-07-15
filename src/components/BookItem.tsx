import React from "react";

import { LibraryBook } from "../interfaces";

const BookItem = ({ book }: { book: LibraryBook }) => {
  return (
    <div className="book-item">
      <img src={book.imageURL} alt={book.title} />
      <div className="book-details">
        <div className="book-text">
          <h1>{book.title}</h1>
          <h2>{book.authors}</h2>
          {/* Replace */}
          <h3>Added 1 hour ago</h3>
        </div>
        <div className="book-options">
          <button>Add to list</button>
          <button className="delete-btn">
            <i className="fas fa-trash"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookItem;
