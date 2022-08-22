import Cliente from "./Cliente";

//Buscar clientes
async function buscarClientePorId(id: string) {
  // url (http://localhost:8080/api/cliente/{id})
  const url = process.env.REACT_APP_BASE_URL + "cliente/" + id;

  //Respueta
  const cliente = await fetch(url, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  });

  //Devolvemos un json
  return await cliente.json();
}

//Buscar clientes (Función asincrónica)
async function buscarClientes() {
  // url (http://localhost:8080/api/clientes)
  const url = process.env.REACT_APP_BASE_URL + "clientes";

  //Respueta
  const lista = await fetch(url, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  });

  //Devolvemos un json
  return await lista.json();
}

//Eliminar clientes
async function removerCliente(id: string) {
  // url (http://localhost:8080/api/cliente/eliminar/{id})
  const url = process.env.REACT_APP_BASE_URL + "cliente/eliminar/" + id;

  //Enviar
  await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
    },
  });
}

//Guardar cliente
async function guardarCliente(newCliente: Cliente) {
  // url (http://localhost:8080/api/cliente/guardar)
  const url = process.env.REACT_APP_BASE_URL + "cliente/guardar";

  //Enviar
  await fetch(url, {
    method: "POST",
    body: JSON.stringify(newCliente),
    headers: {
      "Content-type": "application/json",
    },
  });
}

//Exportaciones
export { buscarClientes, buscarClientePorId, removerCliente, guardarCliente };
