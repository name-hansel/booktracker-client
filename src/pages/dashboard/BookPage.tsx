import React from "react";
import { Link } from "react-router-dom";

const BookPage = () => {
  return (
    <>
      <button className="go-back">
        {/* TODO change to previous path */}
        <Link to="/user">&lt;&lt; Back</Link>
      </button>
      <main className="page-main">
        <section className="left">
          <img src="./content.jpg" alt="" />
          <div className="stars">
            <i className="fas fa-star fill"></i>
            <i className="fas fa-star fill"></i>
            <i className="fas fa-star fill"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <span className="rating-count">(32)</span>
          </div>
          <div className="button-div">
            {/* Change according to logged in status */}
            <button>Add to library</button>
            <button>Review Book</button>
          </div>
        </section>
        <section className="right">
          <div className="main-details">
            <h1 className="title">The Hunger Games</h1>
            <h2 className="authors">Suzanne Collins</h2>
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
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Libero,
              dolore.
            </h5>
            <p className="description">
              First in the ground-breaking HUNGER GAMES trilogy. Set in a dark
              vision of the near future, a terrifying reality TV show is taking
              place. Twelve boys and twelve girls are forced to appear in a live
              event called The Hunger Games. There is only one rule: kill or be
              killed. When sixteen-year-old Katniss Everdeen steps forward to
              take her younger sister's place in the games, she sees it as a
              death sentence. But Katniss has been close to death before. For
              her, survival is second nature.
            </p>
            <div className="more-more-details">
              <h5>
                <span>Published date: </span>2014-10-01
              </h5>
              <h5>
                <span>Publisher:</span> Scholastic Inc.
              </h5>
              <h5>
                <span>Categories:</span> Juvenile Fiction, Young Adult Fiction
              </h5>
              <h5>
                <span>Page count:</span> 528
              </h5>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default BookPage;
