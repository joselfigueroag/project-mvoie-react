import React from "react";

import axios from "axios";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useNavigate, Navigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const swAlert = withReactContent(Swal)

  const handleSubmit = (e) => {
    e.preventDefault();
    const regexEmail =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!email || !password) {
      swAlert.fire({
        title: <p>Debe ingresar ambos campos</p>,
      })
      return;
    }

    if (email && !regexEmail.test(email)) {
      swAlert.fire({
        title: <p>Debes escribir una direccion de correo valida</p>,
      })
      return;
    }

    if (email !== "challenge@alkemy.org" || password !== "react") {
      swAlert.fire({
        title: <p>Credenciales invalidas</p>,
      })
      return;
    }

    axios
      .post("http://challenge-react.alkemy.org/", { email, password })
      .then((res) => {
        swAlert.fire({
          title: <p>Ingresaste correctamente</p>,
        })
        const token = res.data.token;
        sessionStorage.setItem("token", token);
        navigate("/listado");
      })
      .catch((error) => console.log(error));
  };

  let token = sessionStorage.getItem("token");

  return (
    <>
      {token && <Navigate to="/listado" />}
      <h2>Formulario de login</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Correo Electronico</label>
        <br />
        <input type="text" name="email" />
        <br />
        <label htmlFor="passwor">Contraseña</label>
        <br />
        <input type="password" name="password" />
        <br />
        <button type="submit">Ingresar</button>
      </form>
    </>
  );
}

export default Login;
