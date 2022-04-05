const mysql = require('mysql')
const uuid = require('uuid')
const db = require('../db')
const bcrypt = require('bcrypt')

class UserController {
    login(req,res)
    {
        const inputedUser = req.body
        db.query('SELECT * FROM users WHERE username = ?',[inputedUser.username], async (err, rows) => {
            if (!err) {
                const user = rows[0]
                
                if(user){
                    const validatePassword = (await bcrypt.compare(inputedUser.password,user.password))
                    if(user && validatePassword){
                        res.json(user)
                    } else {
                        res.status(400).json('Password tidak cocok')
                    }
                } else {
                    res.status(400).json('User tidak ditemukan')
                }
            } else {
                res.json(err)
            }
            console.log('The data from user table:\n', rows);
        })
    }

    async signin(req,res)
    {
        const user = {
            id:uuid.v4(),
            username: req.body.username,
            password: await bcrypt.hash(req.body.password,10)
        }
        console.log(user)
        db.query('INSERT INTO users SET id = ?, username = ?, password = ?',[user.id, user.username, user.password], (err, rows) => {

            if(!err){
                res.json({user})
            } else {
                res.json(err)
            }
            console.log('The data from user table:\n', rows);
        })
    }
}

module.exports = UserController