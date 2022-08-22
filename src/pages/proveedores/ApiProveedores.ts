import Proveedor from "./Proveedor";

//Buscar Proveedores
async function buscarProveedorPorId(id: string) {
  // url (http://localhost:8080/api/cliente/{id})
  const url = process.env.REACT_APP_BASE_URL + "proveedor/" + id;

  //Respueta
  const proveedor = await fetch(url, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  });

  //Devolvemos un json
  return await proveedor.json();
}

//Buscar Proveedores
async function buscarProveedores() {
  // url (http://localhost:8080/api/Proveedores)
  const url = process.env.REACT_APP_BASE_URL + "proveedores";

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

//Eliminar Proveedores
async function removerProveedor(id: string) {
  // url (http://localhost:8080/api/proveedor/eliminar/{id})
  const url = process.env.REACT_APP_BASE_URL + "proveedor/eliminar/" + id;

  //Enviar
  await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
    },
  });
}

//Guardar cliente
async function guardarProveedor(newProveedor: Proveedor) {
  // url (http://localhost:8080/api/proveedor/guardar)
  const url = process.env.REACT_APP_BASE_URL + "proveedor/guardar";

  //Enviar
  await fetch(url, {
    method: "POST",
    body: JSON.stringify(newProveedor),
    headers: {
      "Content-type": "application/json",
    },
  });
}

//Exportaciones
export {
  buscarProveedores,
  buscarProveedorPorId,
  removerProveedor,
  guardarProveedor,
};
