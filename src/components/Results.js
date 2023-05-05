import React, { useEffect, useState } from "react";

import { Navigate } from "react-router-dom";
import axios from "axios";

import Cards from "./common_components/Cards";

function Results({ addOrRemoveFav }) {
  let token = sessionStorage.getItem("token");

  const [results, setResults] = useState([]);
  let currentPath = new URLSearchParams(window.location.search);
  let keyword = currentPath.get("keyword");

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACt_APP_API_KEY_THEMOVIEDB}&language=en-US&page=1&query=${keyword}`
      )
      .then((res) => {
        const data = res.data.results;
        setResults(data);
      })
      .catch((error) => console.log(error));
  }, [results, keyword]);

  return (
    <>
      {!token && <Navigate to="/" />}
      <h2>Buscaste: {keyword}</h2>
      {results.length === 0 && <h2>No hubo resultados</h2>}
      <Cards elements={results} addOrRemoveFav={addOrRemoveFav} />
    </>
  );
}

export default Results;
