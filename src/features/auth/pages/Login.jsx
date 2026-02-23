import { useState } from "react";
import { login } from "./../services/factusAuth";

export default function Login() {
  
  // estado para guardar lo que escribe el usuario
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // funcion que se ejecuta al enviar el formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // evita recarga

    try {
      // Se llama al servicio de autenticacion
      await login({ username: email, password });
      alert("Login exitoso");
    } catch (error) {
      // error
      console.error(error);
      alert("Credenciales incorrectas");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="usuario"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Ingresar</button>
    </form>
  );
}