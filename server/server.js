// Set up
let express  = require('express');
let app      = express();                               // create our app w/ express
let morgan = require('morgan');             // log requests to the console (express4)
let bodyParser = require('body-parser');    // pull information from HTML POST (express4)
let methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
let cors = require('cors');
let pg = require('pg');


//              "postgres://YourUserName:YourPassword@localhost:5432/YourDatabase";
let conString = "postgres://postgres:j66352769@localhost:5432/piano";

client = new pg.Client(conString);
client.connect();

app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());
app.use(cors());

app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});

/*
**AQUI VA TODA LA LOGICA DE LA API
*/

//crear usuario
app.post('/usuario', function(req, res, next){
  let respuesta = {};
  let input = req.body;
  let keys = Object.keys(input);
  let query = "INSERT INTO usuario VALUES( ";
  for (let i = 0; i < keys.length; i++){
    query += "'" + input[keys[i]] + "', ";
  }
  //quitar la ultima coma
  query = query.slice(0, -1);
  query = query.slice(0, -1);
  query += ");"
  console.log(query);

  client.query(query, (err, resp) =>{
    if (err){
      console.log(err);
      respuesta.error = err;
      res.json(respuesta);
    } else {
      //get el usuario que creamos
      let query = "SELECT * FROM usuario WHERE usuario = '" + input[keys[0]] +"';"
      client.query(query, (err, resp) =>{
        if (err){
          console.log(err);
        } else {
          respuesta = resp.rows[0];
          res.json(respuesta);
        }
      });
    }
  });

});

//get usuario
app.get('/usuario', function(req, res, next){
  let respuesta = {};
  let usuario = req.body.usuario;
  let query = "SELECT * FROM usuario"

  //Si no hay usuario en el request regresa todos
  if (usuario != undefined){
    query += " WHERE usuario = '" + usuario + "';"
  } else {
    query += ";"
  }
  client.query(query, (err, resp) => {
    if (err){
      console.log(err);
      respuesta.error = err;
      res.json(respuesta);
    } else {
      if (usuario != undefined){
        respuesta = resp.rows[0];
      } else {
        respuesta = resp.rows;
      }
      res.json(respuesta);
    }
  });
});

//borrar usuario
app.delete('/usuario', function(req, res, next){
  let respuesta = {};
  let usuario = req.body.usuario;
  if (usuario == undefined){
    respuesta.error = "usuario undefined";
    res.json(respuesta);
  }
  let query = "DELETE FROM usuario WHERE usuario = '" + usuario + "';";
  client.query(query, (err, resp) => {
    if (err){
      console.log(err);
      respuesta.error = err;
      res.json(respuesta);
    } else {
      respuesta.operacion = "usuario: " + usuario + " eliminado";
      respuesta.status = resp;
      res.json(respuesta);
    }
  });
});

//editar usuario
app.post('/usuario/update', function(req, res, next){
  let respuesta = {};
  let input = req.body;
  let usuario = input.usuario;
  let query = "UPDATE usuario SET ";
  let keys = Object.keys(input);

  if (usuario == undefined){
    respuesta.error = "identificador del usuario que se desea hacer update es undefined"
    res.json(respuesta);
  }

  for (let i = 0; i < keys.length; i++){
    query += keys[i] + " = '" + input[keys[i]] + "', ";
  }
  //quitar la ultima coma
  query = query.slice(0, -1);
  query = query.slice(0, -1);
  query += " WHERE usuario = '" + usuario + "';"

  client.query(query, (err, resp) => {
    if (err){
      console.log(err);
      respuesta.error = err;
      res.json(respuesta);
    } else {
      let query = "SELECT * FROM usuario WHERE usuario = '" + usuario + "';";
      client.query(query, (err, resp) => {
        if (err){
          console.log(err);
          respuesta.error = err;
          res.json(respuesta);
        } else {
          res.json(resp.rows[0]);
        }
      });

    }
  });

});

app.post('/usuario/verificar', function (req, res, next){
  let respuesta = {};
  let usuario = req.body.usuario;
  let psw = req.body.contrasena;
  console.log(req);
  if (usuario == undefined || psw == undefined){
    respuesta.error = "Contraseña o usuario estan undefined"
    res.json(respuesta);
    return;
  }

  let query = "SELECT contraseña FROM usuario WHERE usuario = '" + usuario + "';"
  client.query(query, (err, resp) => {
    if (err){
      console.log(err);
      respuesta.error = err;
      res.json(respuesta);
    } else {
      if(resp.rows[0] != undefined){
        if (resp.rows[0].contraseña == undefined){
          respuesta.error = "usuario o contraseña incorrecta";
          res.json(respuesta);
        }
        if (psw == resp.rows[0].contraseña){
          respuesta.verificado = true;
          res.json(respuesta);
        } else {
          respuesta.verificado = false;
          res.json(respuesta);
        }
      }else {
        respuesta.error = "Algo salio mal"
        res.json(respuesta);
      }
    }
  });

});

/*
** TIPO DE USUARIO
*/

//añadir un tipo de usuario
app.post('/administrador/tipoUsuario', function(req, res, next){
  let respuesta = {};
  let administrador = req.body.administrador;
  if (administrador == undefined){
    respuesta.error = "El administrador esta undefined";
    res.json(respuesta);
  }
  let query = "SELECT t.tipo FROM usuario as u, tipousuario as t WHERE t.tipoid = u.tipoUsuario AND u.usuario = '" + administrador + "';";
  console.log(query);
  client.query(query, (err, resp) => {
    if (err){
      console.log(err);
      respuesta.error = err;
      res.json(respuesta);
    } else {
      if (resp.rows[0] == undefined){
        respuesta.error = "usuario no existe";
        res.json(respuesta);
      } else {
        let tipo = resp.rows[0].tipo;
        console.log(tipo);
        if (tipo != "Administrador"){
          respuesta.error = "Usuario no es administrador";
          res.json(respuesta);
        } else {
          let tipo = req.body.tipo;
          if (tipo == undefined){
            respuesta.error = "tipo del nuevo usuario es undefined";
            res.json(respuesta);
          } else {
            let query = "INSERT INTO tipousuario (tipo) VALUES ('"+ tipo +"');"
            client.query(query, (err, respu) => {
              if (err){
                console.log(err);
                respuesta.error = err;
                res.json(respuesta);
              } else {
                respuesta.error = false;
                console.log(resp.rows);
                res.json(respuesta);
              }
            });
          }



        }
      }
    }
  });
});


//eliminar tipo de usuario
app.delete('/administrador/tipoUsuario', function(req, res, next){
  let respuesta = {};
  let tipo = req.body.tipo;
  if (tipo == undefined){
    respuesta.error = "tipo de usuario ingresado como undefined"
    res.json(respuesta);
  }
  let query = "DELETE FROM tipousuario WHERE tipo = '" + tipo + "';";

  client.query(query, (err, resp) => {
    if (err){
      console.log(err);
      respuesta.error = err;
      res.json(respuesta);
    } else {
      respuesta.error = false;
      res.json(respuesta);
    }
  });
});




// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");
