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
import { buscarTrabajadorPorId, guardarTrabajador } from "./ApiTrabajadores";
import Trabajador from "./Trabajador";

//Formulario
const FormularioTrabajadoress: React.FC = () => {
  //Trabajadores
  const [trabajador, setTrabajadores] = useState<Trabajador>({
    id: "",
    nombre: "",
    apellido_m: "",
    apellido_p: "",
    telefono: "",
    email: "",
    cargo: "",
    salario: 0,
  });

  //Historial
  const history = useHistory();

  //Obtener id por la ruta
  const routeMatch: any = useRouteMatch("/page/trabajadores/:id");
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
      const tr: Trabajador = {
        id: "",
        nombre: "",
        apellido_m: "",
        apellido_p: "",
        telefono: "",
        email: "",
        cargo: "",
        salario: 0,
      };
      //Ponemos un objeto vació
      setTrabajadores(tr);
      return;
    } /*Si no*/ else {
      //Buscamos el cliente
      setTrabajadores(await buscarTrabajadorPorId(id));
    }
  };

  //Guardar nuevo cliente
  const guardarC = async () => {
    //Guardamos
    await guardarTrabajador(trabajador);
    //Vamos a la tabla de clientes
    history.push("/page/trabajadores");
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
                onIonChange={(e) =>
                  (trabajador.nombre = String(e.detail.value))
                }
                value={id === "new" ? "" : trabajador.nombre}
              ></IonInput>
            </IonItem>
            {/*Apellido paterno*/}
            <IonItem>
              <IonLabel position="floating">Apellido paterno</IonLabel>
              <IonInput
                onIonChange={(e) =>
                  (trabajador.apellido_p = String(e.detail.value))
                }
                value={id === "new" ? "" : trabajador.apellido_p}
              ></IonInput>
            </IonItem>
            {/*Apellido materno*/}
            <IonItem>
              <IonLabel position="floating">Apellido paterno</IonLabel>
              <IonInput
                onIonChange={(e) =>
                  (trabajador.apellido_m = String(e.detail.value))
                }
                value={id === "new" ? "" : trabajador.apellido_m}
              ></IonInput>
            </IonItem>
            {/*Telefono*/}
            <IonItem>
              <IonLabel position="floating">Telefono</IonLabel>
              <IonInput
                onIonChange={(e) =>
                  (trabajador.telefono = String(e.detail.value))
                }
                value={id === "new" ? "" : trabajador.telefono}
              ></IonInput>
            </IonItem>
            {/*Sexo*/}
            <IonItem>
              <IonLabel position="floating">Sexo</IonLabel>
              <IonInput
                onIonChange={(e) => (trabajador.sexo = String(e.detail.value))}
                value={id === "new" ? "" : trabajador.sexo}
              ></IonInput>
            </IonItem>
            {/*Email*/}
            <IonItem>
              <IonLabel position="floating">Email</IonLabel>
              <IonInput
                onIonChange={(e) => (trabajador.email = String(e.detail.value))}
                value={id === "new" ? "" : trabajador.email}
              ></IonInput>
            </IonItem>
            {/*Direccion*/}
            <IonItem>
              <IonLabel position="floating">Direccion</IonLabel>
              <IonInput
                onIonChange={(e) =>
                  (trabajador.direccion = String(e.detail.value))
                }
                value={id === "new" ? "" : trabajador.direccion}
              ></IonInput>
            </IonItem>{" "}
            {/*Cargo*/}
            <IonItem>
              <IonLabel position="floating">Cargo</IonLabel>
              <IonInput
                onIonChange={(e) => (trabajador.cargo = String(e.detail.value))}
                value={id === "new" ? "" : trabajador.cargo}
              ></IonInput>
            </IonItem>{" "}
            {/*Salario*/}
            <IonItem>
              <IonLabel position="floating">Salario</IonLabel>
              <IonInput
                onIonChange={(e) =>
                  (trabajador.salario = Number(e.detail.value))
                }
                value={id === "new" ? "" : trabajador.salario}
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

export default FormularioTrabajadoress;
