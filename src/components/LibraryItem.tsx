import React from "react";
import { LibraryBook } from "../interfaces";

const LibraryItem = ({ book }: { book: LibraryBook }) => {
  return (
    <div>
      <img src={book.imageURL} alt={book.title} />
      <h1>{book.title}</h1>
      <h2>{book.authors}</h2>
    </div>
  );
};

export default LibraryItem;
