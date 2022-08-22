import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonItem,
  IonButton,
  IonIcon,
  IonInput,
  IonLabel,
} from "@ionic/react";
import { pencil, checkmark } from "ionicons/icons";
import { useEffect, useState } from "react";

import { useHistory, useRouteMatch } from "react-router";
import "../Page.css";
import { buscarClientePorId, guardarCliente } from "./ApiClientes";
import Cliente from "./Cliente";

//Formulario
const FormularioClientes: React.FC = () => {
  //Cliente
  const [cliente, setCliente] = useState<Cliente>({
    id: "",
    nombre: "",
    apellido_m: "",
    apellido_p: "",
    telefono: "",
  });

  //Historial
  const history = useHistory();

  //Obtener id por la ruta
  const routeMatch: any = useRouteMatch("/page/clientes/:id");
  const id: string = routeMatch?.params?.id;

  //función al cargar la pagina
  useEffect(() => {
    //Buscamos el cliente por el id
    buscarCliente();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history.location.pathname]);

  //Buscar el cliente
  const buscarCliente = async () => {
    //Si es uno nuevo
    if (id === "new") {
      //Cliente por defecto
      const cl: Cliente = {
        id: "",
        apellido_m: "",
        apellido_p: "",
        nombre: "",
        telefono: "",
      };
      //Ponemos un objeto vació
      setCliente(cl);
      return;
    } /*Si no*/ else {
      //Buscamos el cliente
      setCliente(await buscarClientePorId(id));
    }
  };

  //Guardar nuevo cliente
  const guardarC = async () => {
    //Guardamos
    await guardarCliente(cliente);
    //Vamos a la tabla de clientes
    history.push("/page/clientes");
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
        <IonCard class="ContEdit">
          {/*Formulario*/}
          <IonCard class="Formulario">
            {/*Nombre*/}
            <IonItem>
              <IonLabel position="floating">Nombre</IonLabel>
              <IonInput
                onIonChange={(e) => (cliente.nombre = String(e.detail.value))}
                value={id === "new" ? "" : cliente.nombre}
              ></IonInput>
            </IonItem>
            {/*Apellido paterno*/}
            <IonItem>
              <IonLabel position="floating">Apellido paterno</IonLabel>
              <IonInput
                onIonChange={(e) =>
                  (cliente.apellido_p = String(e.detail.value))
                }
                value={id === "new" ? "" : cliente.apellido_p}
              ></IonInput>
            </IonItem>
            {/*Apellido materno*/}
            <IonItem>
              <IonLabel position="floating">Apellido paterno</IonLabel>
              <IonInput
                onIonChange={(e) =>
                  (cliente.apellido_m = String(e.detail.value))
                }
                value={id === "new" ? "" : cliente.apellido_m}
              ></IonInput>
            </IonItem>
            {/*Sexo*/}
            <IonItem>
              <IonLabel position="floating">Sexo</IonLabel>
              <IonInput
                onIonChange={(e) => (cliente.sexo = String(e.detail.value))}
                value={id === "new" ? "" : cliente.sexo}
              ></IonInput>
            </IonItem>
            {/*Telefono*/}
            <IonItem>
              <IonLabel position="floating">Telefono</IonLabel>
              <IonInput
                onIonChange={(e) => (cliente.telefono = String(e.detail.value))}
                value={id === "new" ? "" : cliente.telefono}
              ></IonInput>
            </IonItem>
            {/*Email*/}
            <IonItem>
              <IonLabel position="floating">Email</IonLabel>
              <IonInput
                onIonChange={(e) => (cliente.email = String(e.detail.value))}
                value={id === "new" ? "" : cliente.email}
              ></IonInput>
            </IonItem>
            {/*Dirección*/}
            <IonItem>
              <IonLabel position="floating">Dirección</IonLabel>
              <IonInput
                onIonChange={(e) =>
                  (cliente.direccion = String(e.detail.value))
                }
                value={id === "new" ? "" : cliente.direccion}
              ></IonInput>
            </IonItem>
          </IonCard>

          {/*Contenedor para un item*/}
          <IonItem>
            {/*Boton*/}
            <IonButton
              onClick={guardarC}
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

export default FormularioClientes;
