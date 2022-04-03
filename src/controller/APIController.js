import pool from '../configs/connectDB';

let getAllUsers = async (req, res) => {

    const [rows, fields] = await pool.execute('SELECT * FROM `users`');

    return res.status(200).json({
        message: 'ok',
        data: rows,
    })
}

let createNewUser = async (req, res) => {
    let { firstName, lastName, email, address } = req.body;

    if (!firstName || !lastName || !email || !address) {

        return res.status(200).json({
            message: 'missing required params'
        })
    }

    await pool.execute(`INSERT into users(firstName, lastName, email, address) values (?,?,?,?) `, [firstName, lastName, email, address])

    return res.status(200).json({
        message: 'hello'
    })
}

let updateUser = async (req, res) => {
    let { firstName, lastName, email, address, id } = req.body;
    if (!firstName || !lastName || !email || !address || !id) {

        return res.status(200).json({
            message: 'missing required params'
        })
    }

    await pool.execute(`UPDATE users set firstName = ?, lastName = ?, email = ?, address = ? where id = ?`, [firstName, lastName, email, address, id])

    return res.status(200).json({
        message: 'hello'
    })
}
let deleteUser = async (req, res) => {

    let userId = req.params.id;
    await pool.execute(`DELETE FROM users WHERE id = ?`, [userId])
    if (!userId) {

        return res.status(200).json({
            message: 'missing required params'
        })
    }
    return res.status(200).json({
        message: 'hello'
    })
}
module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser,
}