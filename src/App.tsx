import {
  IonApp,
  IonRouterOutlet,
  IonSplitPane,
  setupIonicReact,
} from "@ionic/react";
import { IonReactHashRouter, IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";
import Menu from "./components/Menu";
import Page from "./pages/Page";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import CustomerList from "./pages/customer/CustomerList";
import CustomerEdit from "./pages/customer/CustomerEdit";
import TablaDeTrabajadores from "./pages/trabajadores/TablaDeTrabajadores";
import TablaDeClientes from "./pages/clientes/TablaDeClientes";
import TablaDeProveedores from "./pages/proveedores/TablaDeProveedores";
import FormularioClientes from "./pages/clientes/FormularioClientes";
import FormularioProveedoress from "./pages/proveedores/FormularioProveedores";
import FormularioTrabajadoress from "./pages/trabajadores/FormularioTrabajadores";

setupIonicReact();

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactHashRouter>
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main">
            <Route path="/" exact={true}>
              <Redirect to="/page/customers" />
            </Route>

            {/*Pagina por defecto*/}
            <Route path="/page/:name" exact={true}>
              <Page />
            </Route>

            {/* ------- CUSTOMERS ------- */}

            {/*Pagina de customers */}
            <Route path={"/page/customers"} exact={true}>
              <CustomerList />
            </Route>

            {/*Pagina de formulario (customers) por id */}
            <Route path={"/page/customers/:id"} exact={true}>
              <CustomerEdit />
            </Route>

            {/* ------- TRABAJADORES ------- */}

            {/*Pagina de trabajadores */}
            <Route path={"/page/trabajadores"} exact={true}>
              <TablaDeTrabajadores />
            </Route>

            {/*Pagina de formulario (trabajadores) por id */}
            <Route path={"/page/trabajadores/:id"} exact={true}>
              <FormularioTrabajadoress />
            </Route>

            {/* ------- CLIENTES ------- */}

            {/*Pagina de clientes */}
            <Route path={"/page/clientes"} exact={true}>
              <TablaDeClientes />
            </Route>

            {/*Pagina de formulario (clientes) por id */}
            <Route path={"/page/clientes/:id"} exact={true}>
              <FormularioClientes />
            </Route>

            {/* ------- PROVEEDORES ------- */}

            {/*Pagina de proveedores */}
            <Route path={"/page/proveedores"} exact={true}>
              <TablaDeProveedores />
            </Route>

            {/*Pagina de formulario (proveedores) por id */}
            <Route path={"/page/proveedores/:id"} exact={true}>
              <FormularioProveedoress />
            </Route>
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactHashRouter>
    </IonApp>
  );
};

export default App;
