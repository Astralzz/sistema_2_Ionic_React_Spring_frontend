import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonItem,
  IonButton,
  IonIcon,
} from "@ionic/react";
import { add, pencil, close } from "ionicons/icons";
import React from "react";
import { useState } from "react";

import { useHistory, useLocation } from "react-router";
import "../Page.css";
import { buscarClientes, removerCliente } from "./ApiClientes";
import Cliente from "./Cliente";

const TablaDeClientes: React.FC = (props: any) => {
  //valor por defecto arreglo vacío
  const [Clientes, setClientes] = useState<Cliente[]>([]);

  //Actualizar datos al cambiar la url

  //Localización
  const location = useLocation();
  const history = useHistory();

  //Actualizamos
  React.useEffect(() => {
    buscarLista();
  }, [location]);

  //Buscar clientes
  const buscarLista = async () => {
    //Buscamos
    const res = await buscarClientes();

    //Comprobamos
    if (res === undefined || res === null) {
      alert("ERROR, Datos de clientes no encontrados");
      return;
    }

    //Asignamos
    setClientes(res);
  };

  //Crear cliente
  const CrearCliente = () => {
    //Mos dirigimos a la pagina de edit
    history.push("/page/clientes/new");
  };

  //Editar cliente
  const EditarCliente = (id: string) => {
    //Mos dirigimos a la pagina de edit
    history.push("/page/clientes/" + id);
  };

  //Eliminar cliente
  const eliminarCliente = async (id: string) => {
    await removerCliente(id);
    buscarLista();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{"Clientes, En una base de datos"}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonCard class="ContClientes">
          <IonTitle>Tabla de clientes</IonTitle>
          {/*Contenedor para un item*/}
          <IonItem>
            {/*Boton*/}
            <IonButton
              onClick={CrearCliente}
              color={"primary"}
              fill="solid"
              slot="end"
              size="default"
            >
              <IonIcon icon={add} />
              Agregar Cliente
            </IonButton>
          </IonItem>

          <IonCard class="Tabla">
            {/*IonContent/Lista -> https://ionicframework.com/docs/api/grid */}
            <IonGrid>
              <IonRow>
                <IonCol>Nombre</IonCol>
                <IonCol>Apellidos</IonCol>
                <IonCol>Telefono</IonCol>
                <IonCol>Sexo</IonCol>
                <IonCol>Email</IonCol>
                <IonCol>Dirección</IonCol>
                <IonCol>Acción</IonCol>
              </IonRow>

              {/*Recorremos*/}
              {Clientes.map((cliente: Cliente) => (
                <IonRow>
                  <IonCol>{cliente.nombre}</IonCol>
                  <IonCol>
                    {cliente.apellido_p + " " + cliente.apellido_m}
                  </IonCol>
                  <IonCol>{cliente.telefono}</IonCol>
                  <IonCol>
                    {cliente.sexo === "" || null || undefined
                      ? "-"
                      : cliente.sexo}
                  </IonCol>
                  <IonCol>{cliente.email}</IonCol>
                  <IonCol>{cliente.direccion}</IonCol>
                  <IonCol>
                    {/*Editar*/}
                    <IonButton
                      onClick={() => {
                        EditarCliente(cliente.id);
                      }}
                      color="primary"
                      fill="clear"
                    >
                      <IonIcon icon={pencil} slot="icon-only" />
                    </IonButton>
                    {/*Eliminar*/}
                    <IonButton
                      color="danger"
                      fill="clear"
                      onClick={() => {
                        eliminarCliente(cliente.id);
                      }}
                    >
                      <IonIcon icon={close} slot="icon-only" />
                    </IonButton>
                  </IonCol>
                </IonRow>
              ))}
            </IonGrid>
          </IonCard>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default TablaDeClientes;
