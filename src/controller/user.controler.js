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

function login(request, response){
    const {email, password} = request.body;
    const sql = `SELECT * FROM user WHERE email =? AND password = ?`;
    const params = [email, password];
    
    connection.query(sql, params, function (err, result) {
      if (err) {
        console.log(err);
        response.status(500).send("Login incorrecto");
      } else {
        console.log(result);
        if (result.length>0) {
          console.log(result);
          response.status(200).json(result);
        } else {
          response.status(401).send("Login incorrecto");
        }
      }
    });
}

module.exports = {registerUser, login};