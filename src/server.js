import express from 'express';
import configViewEngine from './configs/viewEngine';
import initWebRoute from './route/web';
import connection from './configs/connectDB';
import initAPIRoute from './route/api';
import { send } from 'express/lib/response';


require('dotenv').config();
var morgan = require('morgan');


const app = express();
const port = process.env.PORT || 8080;

app.use(morgan('combined'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use((req, res, next) => {
    next();
})

// setup view engine
configViewEngine(app);

//init web route
initWebRoute(app);

//init api route
initAPIRoute(app);

//handle 404 not found
app.use((req, res, next) => {
    return res.render('404.ejs');
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

