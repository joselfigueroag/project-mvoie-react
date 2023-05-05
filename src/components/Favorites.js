import React from "react";

import { Navigate } from "react-router-dom";

import Cards from "./common_components/Cards";

function Favorites({ addOrRemoveFav, favorites }) {
  const token = sessionStorage.getItem("token");
  return (
    <>
      {!token && <Navigate to="/" />}
      {favorites.length === 0 && <h2>No tienes favoritos</h2>}
      <Cards elements={favorites} addOrRemoveFav={addOrRemoveFav} />
    </>
  );
}

export default Favorites;
