interface Trabajador {
  id: string;
  nombre: string;
  apellido_m: string;
  apellido_p: string;
  telefono: string;
  sexo?: string;
  email: string;
  direccion?: string /*? -> Dato no obligatorio*/;
  cargo: string
  salario: number;
}

export default Trabajador;
