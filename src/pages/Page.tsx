import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useParams } from "react-router";
import ExploreContainer from "../components/ExploreContainer";
import "./Page.css";

const Page: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  let n: string;

  //Comprobamos que dice
  switch (name) {
    case "customers":
      n = "Clientes";
      break;

    default:
      n = name;
      break;
  }

  return (
    <IonPage>
      {/*IonPage -> Pagina global -> https://ionicframework-com.translate.goog/docs/layout/structure?_x_tr_sl=en&_x_tr_tl=es&_x_tr_hl=es&_x_tr_pto=sc*/}
      <IonHeader>
        {/*IonHeader -> https://ionicframework-com.translate.goog/docs/v4/api/header?_x_tr_sl=en&_x_tr_tl=es&_x_tr_hl=es&_x_tr_pto=sc*/}
        <IonToolbar>
          {/*IonToolbar -> https://ionicframework-com.translate.goog/docs/api/toolbar?_x_tr_sl=en&_x_tr_tl=es&_x_tr_hl=es&_x_tr_pto=sc*/}
          <IonButtons slot="start">
            {/*IonButtons -> https://ionicframework-com.translate.goog/docs/api/buttons?_x_tr_sl=en&_x_tr_tl=es&_x_tr_hl=es&_x_tr_pto=sc*/}
            <IonMenuButton />
            {/*IonMenuButton -> https://ionicframework-com.translate.goog/docs/api/menu-button?_x_tr_sl=en&_x_tr_tl=es&_x_tr_hl=es&_x_tr_pto=sc*/}
          </IonButtons>
          <IonTitle>{n}</IonTitle>
          {/*IonTitle -> https://ionicframework-com.translate.goog/docs/api/title?_x_tr_sl=en&_x_tr_tl=es&_x_tr_hl=es&_x_tr_pto=sc*/}
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{name}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name={n} />
      </IonContent>
    </IonPage>
  );
};

export default Page;
