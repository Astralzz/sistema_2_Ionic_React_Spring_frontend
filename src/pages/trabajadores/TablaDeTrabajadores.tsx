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
  IonVirtualScroll,
} from "@ionic/react";
import { add, bookmarkOutline, pencil, close } from "ionicons/icons";
import React from "react";
import { useEffect, useState } from "react";

import { useHistory, useLocation, useParams } from "react-router";
import ExploreContainer from "../../components/ExploreContainer";
import "../Page.css";
import { buscarTrabajadores, removerTrabajador } from "./ApiTrabajadores";
import Trabajador from "./Trabajador";

const TablaDeTrabajadores: React.FC = () => {
  //valor por defecto arreglo vacío
  const [Trabajadores, setTrabajadores] = useState<Trabajador[]>([]);

  //Localización
  const location = useLocation();
  const history = useHistory();

  //Actualizamos
  React.useEffect(() => {
    buscarLista();
  }, [location]);

  //Cargar lista de clientes
  const buscarLista = async () => {
    //Buscamos
    const res = await buscarTrabajadores();

    //Verificar
    if (res === undefined || res === null) {
      alert("ERROR, Datos de clientes no encontrados");
      return;
    }

    //Agregamos
    setTrabajadores(res);
  };

  //Crear trabajador
  const CrearTrabajador = () => {
    //Mos dirigimos a la pagina de edit
    history.push("/page/trabajadores/new");
  };

  //Editar trabajador
  const EditarTrabajador = (id: string) => {
    //Mos dirigimos a la pagina de edit
    history.push("/page/trabajadores/" + id);
  };

  //Eliminar trabajador
  const eliminarTrabajador = async (id: string) => {
    await removerTrabajador(id);
    buscarLista();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{"Trabajadores, En una base de datos"}</IonTitle>
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
              onClick={CrearTrabajador}
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
                <IonCol>Telefono</IonCol>
                <IonCol>Sexo</IonCol>
                <IonCol>Email</IonCol>
                <IonCol>Dirección</IonCol>
                <IonCol>cargo</IonCol>
                <IonCol>Salario</IonCol>
                <IonCol>Acción</IonCol>
              </IonRow>

              {/*Recorremos*/}
              {Trabajadores.map((trabajador: Trabajador) => {
                return (
                  <IonRow>
                    <IonCol>{trabajador.nombre}</IonCol>
                    <IonCol>
                      {trabajador.apellido_p + " " + trabajador.apellido_m}
                    </IonCol>
                    <IonCol>{trabajador.telefono}</IonCol>
                    <IonCol>{trabajador.sexo}</IonCol>
                    <IonCol>{trabajador.email}</IonCol>
                    <IonCol>{trabajador.direccion}</IonCol>
                    <IonCol>{trabajador.cargo}</IonCol>
                    <IonCol>{trabajador.salario}</IonCol>
                    <IonCol>
                      {/*Editar*/}
                      <IonButton
                        onClick={() => {
                          EditarTrabajador(trabajador.id);
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
                          eliminarTrabajador(trabajador.id);
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

export default TablaDeTrabajadores;
