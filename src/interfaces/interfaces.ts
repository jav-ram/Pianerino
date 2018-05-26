export interface Usuario {
 apellido: string;
 contraseña: string;
 correo: string;
 nombre: string;
 puntos: number;
 tipoUsuario: number;
}

export interface Leccion {
  color: string;
  descripcion: string;
  dificultad: number;
  imagen: string;
  leccion: any;
  nombre: string;
}

export interface tipoUsuario {
  tipo: string;
}
