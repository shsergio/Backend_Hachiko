const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const figlet = require('figlet');
const asciify = require('asciify-image');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '10mb' }));

const credentials = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'samus'
};

// Crear una única conexión global a la base de datos
const connection = mysql.createConnection(credentials);

app.get('/', (req, res) => {
  res.send('Hola Samus, soy el servidor!');
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const values = [username, password];
  connection.query('SELECT * FROM login WHERE username = ? AND password = ?', values, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      if (result.length > 0) {
        res.status(200).send({
          "id": result[0].id,
          "user": result[0].user,
          "username": result[0].username,
          "picture": result[0].picture,
          "isAuth": true
        });
      } else {
        res.status(400).send('Usuario no existe');
      }
    }
  });
});

app.get('/api/usuarios', (req, res) => {
  connection.query('SELECT * FROM usuarios', (err, rows) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(rows);
    }
  });
});

app.post('/api/eliminar-usuario', (req, res) => {
  const { id } = req.body;
  connection.query('DELETE FROM usuarios WHERE id = ?', id, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send({ "status": "success", "message": "Usuario Eliminado" });
    }
  });
});

app.post('/api/guardar-usuario', (req, res) => {
  const { avatar, nombre, planeta } = req.body;
  const params = [[avatar, nombre, planeta]];
  connection.query('INSERT INTO usuarios (avatar, nombre, password) VALUES ?', [params], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send({ "status": "success", "message": "Usuario creado" });
    }
  });
});

app.post('/api/editar-usuario', (req, res) => {
  const { id, avatar, nombre, planeta } = req.body;
  const params = [avatar, nombre, planeta, id];
  connection.query('UPDATE usuarios SET avatar = ?, nombre = ?, password = ? WHERE id = ?', params, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send({ "status": "success", "message": "Usuario editado" });
    }
  });
});

app.get('/api/productos', (req, res) => {
  connection.query('SELECT * FROM productos', (err, rows) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(rows);
    }
  });
});

app.post('/api/eliminar-producto', (req, res) => {
  const { id } = req.body;
  connection.query('DELETE FROM productos WHERE id = ?', id, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send({ "status": "success", "message": "Producto Eliminado" });
    }
  });
});

app.post('/api/guardar-producto', (req, res) => {
  const {avatar, nombre, planeta } = req.body;
  const params = [[avatar, nombre, planeta]];
  connection.query('INSERT INTO productos (avatar, nombre, tipo) VALUES ?', [params], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send({ "status": "success", "message": "Producto creado" });
    }
  });
});

app.post('/api/editar-producto', (req, res) => {
  const { id, avatar, nombre, planeta } = req.body;
  const params = [avatar, nombre, planeta, id];
  connection.query('UPDATE productos SET avatar = ?, nombre = ?, tipo = ? WHERE id = ?', params, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send({ "status": "success", "message": "Producto editado" });
    }
  });
});
app.get('/api/categorias', (req, res) => {
  connection.query('SELECT * FROM categorias', (err, rows) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(rows);
    }
  });
});

app.post('/api/eliminar-categorias', (req, res) => {
  const { id } = req.body;
  connection.query('DELETE FROM categorias WHERE id = ?', id, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send({ "status": "success", "message": "categorias Eliminado" });
    }
  });
});
app.post('/api/guardar-categoria', (req, res) => {
  const { avatar, nombre, planeta } = req.body;
  const params = [[avatar, nombre, planeta]];
  connection.query('INSERT INTO categorias (avatar, nombre, clase) VALUES ?', [params], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send({ "status": "success", "message": "categorias creado" });
    }
  });
});

app.post('/api/editar-categorias', (req, res) => {
  const { id, avatar, nombre, planeta } = req.body;
  const params = [avatar, nombre, planeta, id];
  connection.query('UPDATE categorias SET avatar = ?, nombre = ?, clase = ? WHERE id = ?', params, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send({ "status": "success", "message": "Producto editado" });
    }
  });
});


app.listen(4000, async () => {
  const ascified = await asciify('helmet.png', { fit: 'box', width: 10, height: 10 });
  console.log(ascified);
  console.log(figlet.textSync('Samus Server v. 1.0.0'));
});
