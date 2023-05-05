// react
import React, { useEffect, useState } from "react";

// third party modules
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";
import { Navigate } from "react-router-dom";

// components
import Cards from "./common_components/Cards";

function Listado({ addOrRemoveFav }) {
  const swAlert = withReactContent(Swal);
  const [moviesList, setMoviesList] = useState([]);

  useEffect(() => {
    const endPoint = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACt_APP_API_KEY_THEMOVIEDB}&language=en-US&page=1`;
    axios
      .get(endPoint)
      .then((res) => {
        const data = res.data;
        setMoviesList(data.results);
      })
      .catch(() => {
        return swAlert.fire({
          title: <p>Hubo errores, intenta mas tarde</p>,
        });
      });
  }, [setMoviesList]);

  const token = sessionStorage.getItem("token");

  return (
    <>
      {!token && <Navigate to="/" />}
      <Cards elements={moviesList} addOrRemoveFav={addOrRemoveFav} />
    </>
  );
}

export default Listado;
