import React from "react";

import { Book } from "../interfaces";

const DropdownItem = ({
  book,
  isAuthenticated,
}: {
  book: Book;
  isAuthenticated: boolean | null;
}) => {
  return (
    <div className="option">
      <img src={book.imageURL} alt={book.title} />
      <div className="book-details">
        <h1>{book.title}</h1>
        <h3>{book.authors && book.authors.join(", ")}</h3>
        <p>{book.date}</p>
      </div>
      {isAuthenticated && <button>+</button>}
    </div>
  );
};

export default DropdownItem;
