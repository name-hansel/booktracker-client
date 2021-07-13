import React from "react";
import { Link } from "react-router-dom";
import debounce from "lodash.debounce";

import { DropDownBook } from "../interfaces";
import UserContext from "../context/user";
import DropdownItem from "./DropdownItem";
import axios from "../utils";

const Navbar = () => {
  const [term, setTerm] = React.useState("");
  const [items, setItems] = React.useState<DropDownBook[]>([]);
  const [hide, setHide] = React.useState(false);

  const { userState } = React.useContext(UserContext);

  const debounceSearch = React.useCallback(
    debounce(async (search) => {
      if (search !== "") {
        const { data } = await axios.get(
          `/book/search?term=${search}&number=5`
        );
        setItems(data.books);
      } else {
        setItems([]);
      }
    }, 250),
    []
  );

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHide(false);
    const search = e.target.value;
    setTerm(search);
    debounceSearch(search);
  };

  return (
    <nav>
      <h1>
        {userState.isAuthenticated ? (
          <Link to="/user/library">Booktracker</Link>
        ) : (
          <Link to="/">Booktracker</Link>
        )}
      </h1>
      <div>
        <form>
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search for a book or a profile..."
            value={term}
            onChange={(e) => onChange(e)}
            onFocus={(e) => onChange(e)}
          />
          <i className="fa fa-search" aria-hidden="true"></i>
        </form>
        {!hide && items.length > 0 && (
          <section className="dropdown-options">
            {items.length > 0
              ? items.map((book) => (
                  <DropdownItem
                    key={book.id}
                    book={book}
                    hide={{ hide, setHide }}
                  />
                ))
              : ""}
          </section>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
