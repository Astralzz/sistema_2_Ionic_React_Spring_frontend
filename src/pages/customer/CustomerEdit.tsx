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
  IonInput,
  IonLabel,
} from "@ionic/react";
import {
  add,
  bookmarkOutline,
  pencil,
  close,
  text,
  checkmark,
} from "ionicons/icons";
import { useEffect, useState } from "react";

import { useHistory, useParams, useRouteMatch } from "react-router";
import "../Page.css";
import { saveCustomer, searchCustomersById } from "./CustomerApiLocal";

//Formulario de edición
const CustomerEdit: React.FC = () => {
  const { name } = useParams<{ name: string }>();

  //Historial
  const history = useHistory();

  //Obtener id
  const routeMatch: any = useRouteMatch("/page/customers/:id");
  const id = routeMatch?.params?.id;

  //Cliente
  // useState<any>([]); => Accepta cualquier valor
  const [customer, setCustomer] = useState<any>({});

  //función al cargar la pagina
  useEffect(() => {
    search();
    //console.log(customer);
  }, [history.location.pathname]); //Dentro de [] puede ir un objeto, Variable etc y esta función se ejecutara cuando este objeto cambie

  //Cargar lista de clientes
  const search = async () => {
    //Si no es un nuevo cliente
    if (id === "new") {
      setCustomer({});
    } else {
      //Asignamos el cliente
      const c = await searchCustomersById(id);
      // console.log(c);
      setCustomer(c);
    }
  };

  //Guardar cliente
  const save = async () => {
    //Guardamos
    await saveCustomer(customer);
    //Vamos a la tabla
    history.push("/page/customers");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{id === "new" ? "Agregar" : "Editar"} cliente</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{name}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonCard class="ContEdit">
          {/*Formulario*/}
          <IonCard class="Formulario">
            {/*Nombre*/}
            <IonItem>
              <IonLabel position="floating">Nombre</IonLabel>
              <IonInput
                onIonChange={(e) => (customer.nombre = e.detail.value)}
                value={id === "new" ? "N" : customer.nombre}
              ></IonInput>
            </IonItem>
            {/*Apellidos*/}
            <IonItem>
              <IonLabel position="floating">Apellidos</IonLabel>
              <IonInput
                onIonChange={(e) => (customer.apellidos = e.detail.value)}
                value={id === "new" ? "" : customer.apellidos}
              ></IonInput>
            </IonItem>
            {/*Telefono*/}
            <IonItem>
              <IonLabel position="floating">Telefono</IonLabel>
              <IonInput
                onIonChange={(e) => (customer.telefono = e.detail.value)}
                value={id === "new" ? "" : customer.telefono}
              ></IonInput>
            </IonItem>
            {/*Email*/}
            <IonItem>
              <IonLabel position="floating">Email</IonLabel>
              <IonInput
                onIonChange={(e) => (customer.email = e.detail.value)}
                value={id === "new" ? "" : customer.email}
              ></IonInput>
            </IonItem>
            {/*Dirección*/}
            <IonItem>
              <IonLabel position="floating">Dirección</IonLabel>
              <IonInput
                onIonChange={(e) => (customer.direccion = e.detail.value)}
                value={id === "new" ? "" : customer.direccion}
              ></IonInput>
            </IonItem>
          </IonCard>

          {/*Contenedor para un item*/}
          <IonItem>
            {/*Boton*/}
            <IonButton
              onClick={save}
              color={"success"}
              fill="solid"
              slot="end"
              size="default"
            >
              <IonIcon icon={id === "new" ? checkmark : pencil} />
              {id === "new" ? "Agregar" : "Editar"}
            </IonButton>
          </IonItem>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default CustomerEdit;
