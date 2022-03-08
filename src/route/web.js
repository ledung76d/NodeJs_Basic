import express from "express";
import { init } from "express/lib/application";
import homeController from '../controller/homeController'
let router = express.Router();

const initWebRoute = (app) => {
    router.get('/', homeController.getHomepage)
    router.get('/about', (req, res) => {
        res.send(`I'm Eric!??`)
    })

    return app.use('/', router)
}

module.exports = initWebRoute;
//export default initWebRoute;