import React, { useEffect, useState } from "react";

import { Navigate } from "react-router-dom";
import axios from "axios";

function MovieDetail() {
  let token = sessionStorage.getItem("token");

  const [detail, setDetail] = useState(null);

  useEffect(() => {
    let currentPath = new URLSearchParams(window.location.search);
    let movieID = currentPath.get("movieID");

    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieID}?api_key=${process.env.REACt_APP_API_KEY_THEMOVIEDB}&language=en-US`
      )
      .then((res) => {
        const data = res.data;
        setDetail(data);
      })
      .catch((error) => console.log(error));
  }, [setDetail]);
  //   console.log(detail.genres);

  return (
    <>
      {!token && <Navigate to="/" />}
      {!detail && <p>Cargando...</p>}
      {detail && (
        <>
          <h2>
            <b>Titulo:</b> {detail.title}
          </h2>
          <div className="row">
            <div className="col-7">
              <img
                className="img-fluid"
                src={`https://image.tmdb.org/t/p/w500${detail.poster_path}`}
                alt=""
              />
            </div>
            <div className="col-5">
              <h5>
                <b>Reseña:</b> {detail.overview}
              </h5>
              <h5>
                <b>Fecha de estreno:</b> {detail.release_date}
              </h5>
              <h5>
                <b>Generos:</b>
                <ul>
                  {detail.genres.map((genre) => (
                    <li key={genre.id}>{genre.name}</li>
                  ))}
                </ul>
              </h5>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default MovieDetail;
