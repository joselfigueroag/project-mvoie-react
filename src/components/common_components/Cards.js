import React from "react";

import { Link } from "react-router-dom";

function Cards({ elements, addOrRemoveFav }) {
  const urlBaseImage = "https://image.tmdb.org/t/p/w500";
  return (
    <div className="row">
      {elements.map((element) => (
        <div key={element.id} className="col-3">
          <div className="card my-4">
            <img
              src={`${urlBaseImage}${element.poster_path || element.imgURL}`}
              className="card-img-top"
              alt="..."
            />
            <button
              className="fav-button"
              onClick={addOrRemoveFav}
              data-movie-id={element.id}
            >
              🖤
            </button>
            <div className="card-body">
              <h5 className="card-title mh-25">{element.title}</h5>
              <p className="card-text">
                {element.overview.substring(0, 100)}...
              </p>
              <Link
                to={`/detalle?movieID=${element.id}`}
                className="btn btn-primary"
              >
                View Detail
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Cards;
