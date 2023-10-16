const { pool } = require('../database');

const registerUser = async (req, res) =>
{
    try 
    {
        console.log(req.body);
        let sql = "INSERT INTO user (name , last_name , email, photo, password)"+
                                        "VALUES (?,?,?,?,?)";
        let params = [req.body.name, req.body.last_name, req.body.email, req.body.photo, req.body.password]
        console.log(sql, params);
        let [result] = await pool.query(sql, params)
        console.log(result);

        if(result.insertId)
            res.send(String(result.insertId))
        else
            res.send("-1")
    }
    catch (error)
    {
        console.log(error);
    }
}

function login(req, res){
    const {email, password} = req.body;
    const sql = `SELECT * FROM user WHERE email =? AND password = ?`;
    const params = [email, password];
    
    connection.query(sql, params, function (err, result) {
      if (err) {
        console.log(err);
        res.status(500).send("Login incorrecto");
      } else {
        console.log(result);
        if (result.length>0) {
          console.log(result);
          res.status(200).json(result);
        } else {
          res.status(401).send("Login incorrecto");
        }
      }
    });
}

function getStart(req, res) {
    let respuesta = {error: true, codigo: 200, mensaje: 'Beginning point'};
    response.send(respuesta);
}

function getBook(req, res) {
  let id = req.params.id;
  let sql = "SELECT * from book WHERE Id_book"
  const params = [id];
  let respuesta;

  connection.query(sql, params, function (err, result) {
    if (err) {
      console.log(err);
      response.status(500).send("No se ha podido obtener el libro");
    } else {
      console.log(result);
      if (result.length>0) {
        res.status(200).json(result);
      } else {
        res.status(404).send("Libro no encontrado");
      }
    }
  });
}


function getAllBooks(req, res) {
    let respuesta;
    let id = req.query.id_user;
    const params = [id];
    let sql = "SELECT * from book WHERE id_user = ?"

    connection.query(sql, params, function (err, result) {
      if (err) {
        console.log(err);
        res.status(500).send("Error al obtener todos los libros");
      } else {
        console.log(result);
        res.status(200).json(result);

      }
    });
}


function postBook(req, res) {
    let respuesta;
    let sql = "INSERT into book (id_user, title, type, author, price, photo) VALUES (?, ?, ?, ?, ?, ?)";
    const {id_user, title, type, author, price, photo} = req.body;
    const params = [id_user, title, type, author, price, photo];
    connection.query(sql, params, function (err, result) {
      if (err) {
        console.log(err);
        res.status(500).send("Error al agregar libro");
      } else {
        console.log(result);
        if (result.insertId) {
          res.status(201).json({ message: "Libro agregado", id: result.insertId });
        } else {
          res.status(500).send("Error al agregar libro");
        }
      }
    });
}


function putBook(req, res) {
  let sql = "UPDATE book SET id_user=?, title=?, type=?, author=?, price=?, photo=? WHERE id_book =?";
  const {id_user, title, type, author, price, photo, id_book} = req.body;
  const params = [ id_user, title, type, author, price, photo, id_book];
  connection.query(sql, params, function (err, result) {
      if (err) {
        console.log(err);
        res.status(500).send("Error al modificar libro");
      } else {
        console.log(result);
        if (result.affectedRows==1) {
          res.status(200).json({ message: "Libro modificado"});
        } else {
          res.status(500).send("Error al modificar libro");
        }
      }
    });
}


function deleteBook(req, res) {
    let id = req.params.id;
    let sql = "DELETE FROM Book WHERE Id_book=?";
    const params = [id];
    connection.query(sql, params, function (err, result) {
      if (err) {
        console.log(err);
        res.status(500).send("Error al eliminar libro");
      } else {
        console.log(result);
        if (result.affectedRows==1) {
          res.status(200).json({ message: "Libro borrado"});
        } else {
          res.status(500).send("Error al eliminar libro");
        }
      }
    });
};

module.exports = {registerUser, login, getStart, getBook, getAllBooks, postBook, putBook, deleteBook };