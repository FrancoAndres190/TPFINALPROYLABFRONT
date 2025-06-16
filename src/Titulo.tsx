function Titulo() {
  const nombre = "Franco";

  if (nombre) {
    return <p>Hola {nombre}</p>;
  }

  return <p>Hola invitado</p>;
}
export default Titulo;
