import React, { useState, useEffect } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Footer from "./components/Footer";
import Header from "./components/Header";
import Listado from "./components/Listado";
import Login from "./components/Login";
import MovieDetail from "./components/MovieDetail";
import Results from "./components/Results";
import Favorites from "./components/Favorites";

import "./css/app.css";
import "./css/bootstrap.min.css";

function App() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const favsInLocal = localStorage.getItem("favs");

    if (favsInLocal) {
      const favs = JSON.parse(favsInLocal);
      setFavorites(favs);
    }
  }, []);

  const addOrRemoveFav = (e) => {
    const favsInLocalStorage = localStorage.getItem("favs");

    let temFavs;
    if (favsInLocalStorage === null) {
      temFavs = [];
    } else {
      temFavs = JSON.parse(favsInLocalStorage);
    }

    const btn = e.target;
    const parent = btn.parentNode;
    const imgURL = parent.querySelector("img").getAttribute("src");
    const title = parent.querySelector("h5").innerText;
    const overview = parent.querySelector("p").innerText;

    const movieData = { imgURL, title, overview, id: btn.dataset["movieId"] };

    let movieInLocalStorage = temFavs.find((e) => e.id === movieData.id);

    if (!movieInLocalStorage) {
      temFavs.push(movieData);
      localStorage.setItem("favs", JSON.stringify(temFavs));
      setFavorites(temFavs);
      console.log("Agregada");
    }
    if (movieInLocalStorage) {
      const moviesLeft = temFavs.filter((e) => {
        return e.id !== movieData.id;
      });
      localStorage.setItem("favs", JSON.stringify(moviesLeft));
      setFavorites(moviesLeft);
      console.log("Removida");
    }
  };

  return (
    <div className="container mt-3">
      <BrowserRouter>
        <Header favorites={favorites} />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/listado"
            element={<Listado addOrRemoveFav={addOrRemoveFav} />}
          />
          <Route path="/detalle" element={<MovieDetail />} />
          <Route
            path="/resultados"
            element={<Results addOrRemoveFav={addOrRemoveFav} />}
          />
          <Route
            path="/favoritos"
            element={
              <Favorites
                addOrRemoveFav={addOrRemoveFav}
                favorites={favorites}
              />
            }
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
