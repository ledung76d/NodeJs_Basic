import res from 'express/lib/response';
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

module.exports = {
    getHomepage,
    getDetailPage
}