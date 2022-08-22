import "./ExploreContainer.css";

interface ContainerProps {
  name: string;
}

//Contenedor por defecto
const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {
  return (
    <div className="container">
      <strong>{name}</strong>
      <p>
        Explorar
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://ionicframework.com/docs/components"
        >
          Componentes
        </a>
      </p>
    </div>
  );
};

export default ExploreContainer;
