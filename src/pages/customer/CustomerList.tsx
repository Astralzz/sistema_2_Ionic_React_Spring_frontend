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
import { add, bookmarkOutline, pencil, close } from "ionicons/icons";
import { useEffect, useState } from "react";

import { useHistory, useParams } from "react-router";
import ExploreContainer from "../../components/ExploreContainer";
import "../Page.css";
import {
  addCustomer,
  removeCustomer,
  searchCustomers,
} from "./CustomerApiLocal";

const CustomerList: React.FC = () => {
  //Cliente
  // useState<any>([]); => Accepta cualquier valor
  const [clientes, setClientes] = useState<any>([]);

  //Historial
  const history = useHistory();

  //función al cargar la pagina
  useEffect(() => {
    search();
  }, [history.location.pathname]); //Dentro de [] puede ir un objeto, Variable etc y esta función se ejecutara cuando este objeto cambie

  //Cargar lista de clientes
  const search = async () => {
    //Buscamos
    const res = await searchCustomers();
    //Agregamos
    setClientes(res);
  };

  //Eliminar cliente
  const remove = async (id: string) => {
    //Eliminamos
    await removeCustomer(id);

    //Volvemos a buscar
    search();
  };

  //Agregar cliente
  const addCust = () => {
    //Mos dirigimos a la pagina de edit
    history.push("/page/customers/new");
  };

  //Editar cliente
  const editCustomer = (id: string) => {
    //Mos dirigimos a la pagina de edit
    history.push("/page/customers/" + id);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{"Clientes, En el almacenamiento local"}</IonTitle>
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
              onClick={addCust}
              color={"primary"}
              fill="solid"
              slot="end"
              size="default"
            >
              <IonIcon icon={add} />
              Agregar cliente
            </IonButton>

            {/*Boton*/}
            <IonButton
              onClick={() => {
                addCustomer();
                search();
              }}
              color={"primary"}
              fill="solid"
              slot="end"
              size="default"
            >
              <IonIcon icon={add} />
              Agregar Almacenamiento local
            </IonButton>
          </IonItem>
          <IonCard class="Tabla">
            {/*IonContent/Lista -> https://ionicframework.com/docs/api/grid */}
            <IonGrid>
              <IonRow>
                <IonCol>Nombre</IonCol>
                <IonCol>Telefono</IonCol>
                <IonCol>Email</IonCol>
                <IonCol>Dirección</IonCol>
                <IonCol>Acciones</IonCol>
              </IonRow>

              {/*Recorremos*/}
              {clientes.map((cliente: any) => {
                return (
                  <IonRow>
                    <IonCol>{cliente.nombre}</IonCol>
                    <IonCol>{cliente.telefono}</IonCol>
                    <IonCol>{cliente.email}</IonCol>
                    <IonCol>{cliente.direccion}</IonCol>
                    <IonCol>
                      {/*Editar*/}
                      <IonButton
                        onClick={() => {
                          editCustomer(cliente.id);
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
                        onClick={() => remove(cliente.id)}
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

export default CustomerList;
