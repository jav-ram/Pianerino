/*
*  TIPO DE USUARIOS
*/

INSERT INTO TipoUsuario (tipoId, tipo)
VALUES (0, 'Usuario');

INSERT INTO TipoUsuario (tipoId, tipo)
VALUES (1, 'Profesor');

INSERT INTO TipoUsuario (tipoId, tipo)
VALUES (2, 'Administrador');

/*
*  USUARIOS
*/
INSERT INTO Usuario
VALUES ('Javoz', 0, 'Javier', 'Ramos', 'javier@lamera.com', '123abc', 0);

INSERT INTO Usuario
VALUES ('Juana', 0, 'Juana', 'Gonzales', 'juanaGonz@lamera.com', '123abc', 150);

/*
*  Lecciones
*/
