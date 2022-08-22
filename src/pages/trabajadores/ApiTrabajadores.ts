import Trabajador from "./Trabajador";

//Buscar trabajadores
async function buscarTrabajadorPorId(id: string) {
  // url (http://localhost:8080/api/trabajador/{id})
  const url = process.env.REACT_APP_BASE_URL + "trabajador/" + id;

  //Respueta
  const trabajador = await fetch(url, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  });

  //Devolvemos un json
  return await trabajador.json();
}

//Buscar trabajadores
async function buscarTrabajadores() {
  // url (http://localhost:8080/api/trabajadores)
  const url = process.env.REACT_APP_BASE_URL + "trabajadores";

  //Respueta
  const respuesta = await fetch(url, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  });

  //Devolvemos un json
  return await respuesta.json();
}

//Eliminar trabajadores
async function removerTrabajador(id: string) {
  // url (http://localhost:8080/api/cliente/eliminar/{id})
  const url = process.env.REACT_APP_BASE_URL + "trabajador/eliminar/" + id;

  //Enviar
  await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
    },
  });
}

//Guardar trabajador
async function guardarTrabajador(newTrabajador: Trabajador) {
  // url (http://localhost:8080/api/cliente/guardar)
  const url = process.env.REACT_APP_BASE_URL + "trabajador/guardar";

  //Enviar
  await fetch(url, {
    method: "POST",
    body: JSON.stringify(newTrabajador),
    headers: {
      "Content-type": "application/json",
    },
  });
}

//Exportaciones
export {
  buscarTrabajadores,
  buscarTrabajadorPorId,
  removerTrabajador,
  guardarTrabajador,
};
