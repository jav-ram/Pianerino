DROP TABLE IF EXISTS Lecciones;
DROP TABLE IF EXISTS Usuario;
DROP TABLE IF EXISTS TipoUsuario;

CREATE TABLE TipoUsuario(
  tipoId        SERIAL,
  tipo          varchar(15),
  PRIMARY KEY (tipoId)
);

CREATE TABLE Usuario (
  usuario       varchar(25),
  tipoUsuario   int,
  nombre        varchar(20),
  apellido      varchar(20),
  correo        varchar(30),
  contraseña    varchar(15),
  puntos        int,
  PRIMARY KEY (usuario),
  FOREIGN KEY (tipoUsuario) REFERENCES TipoUsuario(tipoId)
);

CREATE TABLE Lecciones(
  leccion_id    int,
  nombre        varchar(50),
  dificultad    int,
  descripcion   varchar(150),
  usuario       varchar(25),
  PRIMARY KEY (leccion_id),
  FOREIGN KEY (usuario) REFERENCES Usuario(usuario)
);
