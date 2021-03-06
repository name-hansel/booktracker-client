import React from "react";
import { Link } from "react-router-dom";

import { DropDownBook } from "../interfaces";

const DropdownItem = ({
  book,
  hide: { setHide },
}: {
  book: DropDownBook;
  hide: {
    hide: boolean;
    setHide: React.Dispatch<React.SetStateAction<boolean>>;
  };
}) => {
  return (
    <Link
      to={`/book/${book.id}`}
      className="option"
      onClick={(e) => setHide(true)}
    >
      <img
        src={book.imageURL ? book.imageURL : "/placeholder.jpg"}
        alt={book.title}
      />
      <div className="dropdown-details">
        <h1>{book.title}</h1>
        <h3>{book.authors && book.authors.join(", ")}</h3>
        <p>{book.date}</p>
      </div>
    </Link>
  );
};

export default DropdownItem;
