//FUNCIONES PARA EL ALMACENAMIENTO LOCAL
//USANDO JS Y TS con Any

//localStorage => Almacenamiento Local

//Agregar clientes de prueba al almacenamiento local
function addCustomer() {
  //Cliente de prueba
  let customer = [
    {
      nombre: "Edain Jesus",
      apellidos: "Cortez Ceron",
      telefono: "7471572512",
      email: "daiinxd13@gmail.com",
      direccion: "Av Principal, No 23, Col. Omiltemi",
    },
    {
      nombre: "Karla Paola",
      apellidos: "Lopez Cruz",
      telefono: "7485697842",
      email: "kamyPa874@gmail.com",
      direccion: "Av Chica, No 1, Col. Amate",
    },
    {
      nombre: "Pedro Manuel",
      apellidos: "Lopez Cuevas",
      telefono: "7471542526",
      email: "Pedri8743@outlook.com",
      direccion: "Av Siempre viva, No 741, Col. Colores",
    },
  ];

  //Agregamos
  customer.forEach((element) => {
    saveCustomer(element);
  });
}

//Buscar clientes
async function searchCustomersById(id: string) {
  //obtenemos la lista de clientes
  const cus = await searchCustomers();
  //retornamos el cliente con esa id
  let ax = cus.find((c: any) => c.id === id);
  return ax;
}

//Buscar clientes
async function searchCustomers() {
  //Si el almacenamiento local esta vació
  if (!localStorage["customers"]) {
    //Guardamos un arreglo vació (Solo acepta strings)
    localStorage["customers"] = "[]";
  }

  //localStorage => https://ed.team/blog/que-es-y-como-utilizar-localstorage-y-sessionstorage
  let Customers = localStorage["customers"];

  //Convertimos a json
  Customers = JSON.parse(Customers);

  return Customers;
}

//Eliminar clientes
async function removeCustomer(id: string) {
  //obtenemos un arreglo con los clientes
  let Customers = await searchCustomers();

  //Buscamos el indice por el id
  let i = Customers.findIndex((customers: any) => customers.id === id);

  //Eliminamos por el indice
  Customers.splice(i, 1);

  //Guardamos los datos en el almacenamiento local de clientes
  //y lo convertimos a string
  localStorage["customers"] = JSON.stringify(Customers);
}

//Guardar cliente
async function saveCustomer(newCustomer: any) {
  //obtenemos un arreglo con los clientes
  let ListaCustomers = await searchCustomers();

  //Si ya existe ese id (Editar)
  if (newCustomer.id) {
    //Buscamos el indice
    let i = ListaCustomers.findIndex((c: any) => c.id === newCustomer.id);
    ListaCustomers[i] = newCustomer;
  } /*Si no (Crear) */ else {
    //Creamos una id
    newCustomer.id = String(Math.round(Math.random() * 1000000));
    //Guardamos el cliente que llego
    ListaCustomers.push(newCustomer);
  }

  //Guardamos los datos en el almacenamiento local de clientes
  //y lo convertimos a string
  localStorage["customers"] = JSON.stringify(ListaCustomers);
}

//Exportaciones
export {
  searchCustomers,
  searchCustomersById,
  removeCustomer,
  saveCustomer,
  addCustomer,
};
