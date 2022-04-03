import res, { json } from 'express/lib/response';
import pool from '../configs/connectDB';
import multer from 'multer';
//import path from 'path';

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
    //console.log("check:", req.body);
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
    //console.log("check request: ", req.body)
    let { firstName, lastName, email, address, id } = req.body;
    await pool.execute(`UPDATE users set firstName = ?, lastName = ?, email = ?, address = ? where id = ?`, [firstName, lastName, email, address, id])
    return res.redirect('/');
}
let getUploadFilePage = async (req, res) => {

    return res.render('uploadFile.ejs')
}




let handleUploadFile = async (req, res, err) => {
    // req.file contains information of uploaded file
    // req.body contains information of text fields, if there were any
    if (req.fileValidationError) {
        return res.send(req.fileValidationError);
    }
    else if (!req.file) {
        return res.send('Please select an image to upload ');
    }


    // Display uploaded image for user validation
    res.send(`You have uploaded this image: <hr/><img src="/image/${req.file.filename}" width="500"><hr /><a href="/upload">Upload another image</a>`);


}


let handleUploadMultipleFile = async (req, res) => {

    //console.log("check multiple", req.files)
    if (req.fileValidationError) {
        return res.send(req.fileValidationError);
    }
    else if (!req.files) {
        return res.send('Please select an image to upload');
    }

    let result = "You have uploaded these images: <hr />";
    const files = req.files;
    let index, len;

    // Loop through all the uploaded images and display them on frontend
    for (index = 0, len = files.length; index < len; ++index) {
        result += `<img src="/image/${req.files[index].filename}" width="300" style="margin-right: 20px;">`;
    }
    result += '<hr/><a href="/upload">Upload more images</a>';
    res.send(result);
}


module.exports = {
    getHomepage,
    getDetailPage,
    createNewUser,
    deleteUser,
    getEditPage,
    postUpdateUser,
    getUploadFilePage,
    handleUploadFile,
    handleUploadMultipleFile,

}