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
import { buscarProveedores, removerProveedor } from "./ApiProveedores";
import Proveedor from "./Proveedor";

const TablaDeProveedores: React.FC = () => {
  //valor por defecto arreglo vacío
  const [Proveedores, setProveedores] = useState<Proveedor[]>([]);

  //Localización
  const location = useLocation();
  const history = useHistory();

  //Actualizamos
  React.useEffect(() => {
    buscarLista();
  }, [location]);

  //buscar proveedores
  const buscarLista = async () => {
    //Buscamos
    const res = await buscarProveedores();

    //Comprobamos
    if (res === undefined || res === null) {
      alert("ERROR, Datos de clientes no encontrados");
      return;
    }

    //Agregamos
    setProveedores(res);
  };

  //Crear proveedor
  const crearProveedor = () => {
    //Nos dirigimos al formulario
    history.push("/page/proveedores/new");
  };

  //Editar proveedor
  const editarProveedor = (id: string) => {
    //Nos dirigimos al formulario
    history.push("/page/proveedores/" + id);
  };

  //Eliminar proveedor
  const eliminarProveedor = async (id: string) => {
    await removerProveedor(id);
    buscarLista();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{"Proveedores, En una base de datos"}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{""}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonCard class="ContClientes">
          {/*Contenedor para un item*/}
          <IonItem>
            {/*Boton*/}
            <IonButton
              onClick={crearProveedor}
              color={"primary"}
              fill="solid"
              slot="end"
              size="default"
            >
              <IonIcon icon={add} />
              Agregar trabajador
            </IonButton>
          </IonItem>
          <IonCard class="Tabla">
            {/*IonContent/Lista -> https://ionicframework.com/docs/api/grid */}
            <IonGrid>
              <IonRow>
                <IonCol>Nombre</IonCol>
                <IonCol>Apellidos</IonCol>
                <IonCol>Empresa</IonCol>
                <IonCol>Telefono</IonCol>
                <IonCol>Acción</IonCol>
              </IonRow>

              {/*Recorremos*/}
              {Proveedores.map((proveedor: Proveedor) => {
                return (
                  <IonRow>
                    <IonCol>{proveedor.nombre}</IonCol>
                    <IonCol>
                      {proveedor.apellido_p + " " + proveedor.apellido_m}
                    </IonCol>
                    <IonCol>{proveedor.empresa}</IonCol>
                    <IonCol>{proveedor.telefono}</IonCol>
                    <IonCol>{proveedor.email}</IonCol>
                    <IonCol>
                      {/*Editar*/}
                      <IonButton
                        onClick={() => {
                          editarProveedor(proveedor.id);
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
                          eliminarProveedor(proveedor.id);
                        }}
                      >
                        <IonIcon icon={close} slot="icon-only" />
                      </IonButton>
                    </IonCol>
                  </IonRow>
                );
              })}
            </IonGrid>
          </IonCard>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default TablaDeProveedores;
