import React from "react";

const Navbar = () => {
  return (
    <nav>
      <h1>Booktracker</h1>
      <div>
        <form>
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search for a book or a profile..."
          />
          <i className="fa fa-search" aria-hidden="true"></i>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
