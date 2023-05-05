import React from "react";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";

function Search() {
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const swAlert = withReactContent(Swal);
    const keyword = e.target.keyword.value.trim();

    if (keyword.length === 0) {
      swAlert.fire({
        title: <p>Debes escribir alguna palabra clave</p>,
      });
    } else if (keyword.length < 4) {
      swAlert.fire({
        title: <p>Debes escribir mas de 4 caracteres</p>,
      });
    } else {
      e.target.keyword.value = "";
      navigate(`/resultados?keyword=${keyword}`);
    }
  };

  return (
    <form className="d-flex align-items-center" onSubmit={handleSearch}>
      <label htmlFor="email" className="form-label mb-0 mx-2">
        <input
          className="form-control"
          type="text"
          name="keyword"
          placeholder="Buscar..."
        />
      </label>
      <button className="btn btn-success ml-2" type="submit">
        Buscar
      </button>
    </form>
  );
}

export default Search;
