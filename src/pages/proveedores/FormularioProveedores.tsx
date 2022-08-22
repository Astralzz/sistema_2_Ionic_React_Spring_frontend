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
import { buscarProveedorPorId, guardarProveedor } from "./ApiProveedores";
import Proveedor from "./Proveedor";

//Formulario
const FormularioProveedoress: React.FC = () => {
  //Proveedores
  const [proveedor, setProveedores] = useState<Proveedor>({
    id: "",
    nombre: "",
    apellido_m: "",
    apellido_p: "",
    telefono: "",
  });

  //Historial
  const history = useHistory();

  //Obtener id por la ruta
  const routeMatch: any = useRouteMatch("/page/proveedores/:id");
  const id: string = routeMatch?.params?.id;

  //función al cargar la pagina
  useEffect(() => {
    //Buscamos el cliente por el id
    buscarProveedor();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history.location.pathname]);

  //Buscar el proveedor
  const buscarProveedor = async () => {
    //Si es uno nuevo
    if (id === "new") {
      //Proveedor por defecto
      const pr: Proveedor = {
        id: "",
        apellido_m: "",
        apellido_p: "",
        nombre: "",
        telefono: "",
      };
      //Ponemos un objeto vació
      setProveedores(pr);
      return;
    } /*Si no*/ else {
      //Buscamos el cliente
      setProveedores(await buscarProveedorPorId(id));
    }
  };

  //Guardar nuevo cliente
  const guardarC = async () => {
    //Guardamos
    await guardarProveedor(proveedor);
    //Vamos a la tabla de clientes
    history.push("/page/proveedores");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{id === "new" ? "Agregar" : "Editar"} proveedor</IonTitle>
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
                onIonChange={(e) => (proveedor.nombre = String(e.detail.value))}
                value={id === "new" ? "" : proveedor.nombre}
              ></IonInput>
            </IonItem>
            {/*Apellido paterno*/}
            <IonItem>
              <IonLabel position="floating">Apellido paterno</IonLabel>
              <IonInput
                onIonChange={(e) =>
                  (proveedor.apellido_p = String(e.detail.value))
                }
                value={id === "new" ? "" : proveedor.apellido_p}
              ></IonInput>
            </IonItem>
            {/*Apellido materno*/}
            <IonItem>
              <IonLabel position="floating">Apellido paterno</IonLabel>
              <IonInput
                onIonChange={(e) =>
                  (proveedor.apellido_m = String(e.detail.value))
                }
                value={id === "new" ? "" : proveedor.apellido_m}
              ></IonInput>
            </IonItem>
            {/*Empresa*/}
            <IonItem>
              <IonLabel position="floating">Empresa</IonLabel>
              <IonInput
                onIonChange={(e) =>
                  (proveedor.empresa = String(e.detail.value))
                }
                value={id === "new" ? "" : proveedor.empresa}
              ></IonInput>
            </IonItem>
            {/*Telefono*/}
            <IonItem>
              <IonLabel position="floating">Telefono</IonLabel>
              <IonInput
                onIonChange={(e) =>
                  (proveedor.telefono = String(e.detail.value))
                }
                value={id === "new" ? "" : proveedor.telefono}
              ></IonInput>
            </IonItem>
            {/*Email*/}
            <IonItem>
              <IonLabel position="floating">Email</IonLabel>
              <IonInput
                onIonChange={(e) => (proveedor.email = String(e.detail.value))}
                value={id === "new" ? "" : proveedor.email}
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

export default FormularioProveedoress;
