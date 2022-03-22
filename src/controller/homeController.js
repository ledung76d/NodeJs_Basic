import res, { json } from 'express/lib/response';
import pool from '../configs/connectDB'

let getHomepage = async (req, res) => {
    //logic
    let data = [];

    const [rows, fields] = await pool.execute('SELECT * FROM `users`');
    return res.render('index.ejs', { dataUser: rows, test: 'hello' })
}
let getDetailPage = async (req, res) => {
    let userId = req.params.id;
    /* const [rows, fields] = await pool.execute('SELECT * FROM `users` WHERE id = ?', [userId]);

    console.log("check rows", rows)
    return res.send(JSON.stringify(rows)) */

    let user = await pool.execute('SELECT * FROM `users` WHERE id = ?', [userId]);
    console.log("check rows", user[0])
    return res.send(JSON.stringify(user[0]))
}
let createNewUser = async (req, res) => {
    console.log("check:", req.body);
    let { firstName, lastName, email, address } = req.body;
    await pool.execute(`INSERT into users(firstName, lastName, email, address) values (?,?,?,?) `, [firstName, lastName, email, address])
    return res.redirect('/')
}
let deleteUser = async (req, res) => {
    let userId = req.body.userId;
    await pool.execute(`DELETE FROM users WHERE id = ?`, [userId])
    return res.redirect('/');
}
let getEditPage = async (req, res) => {
    let id = req.params.id;
    let [user] = await pool.execute('Select * from users where id =?', [id])
    return res.render('update.ejs', { dataUser: user[0] })
}
let postUpdateUser = async (req, res) => {
    console.log("check request: ", req.body)
    let { firstName, lastName, email, address, id } = req.body;
    await pool.execute(`UPDATE users set firstName = ?, lastName = ?, email = ?, address = ? where id = ?`, [firstName, lastName, email, address, id])
    return res.redirect('/');
}

module.exports = {
    getHomepage,
    getDetailPage,
    createNewUser,
    deleteUser,
    getEditPage,
    postUpdateUser,
}