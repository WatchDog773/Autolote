const express = require("express");
// Import the Router function
const routes = express.Router();
// Llamar al modelo
const carmodel = require("../../models/Car")();

routes.get('/all', (req, res) => {
    carmodel.getAll((err, rslts) => {
        if (err) {
            console.log(err);
            return res.status(503).json({ "error": "Algo salio mal." });
        }
        return res.status(200).json(rslts);
    });
});

routes.post('/new', (req, res) => {
    const { name, brand, year, price, stock } = req.body;
    carmodel.addOne(name, brand, year, price, stock, (err, inserted) => {
        if (err) {
            console.log(err);
            return res.status(503).json({ "error": "Algo salio mal." });
        }
        return res.status(200).json({ inserted });
    });
});

routes.put('/upd/:id', (req, res) => {
    //do something here
    let { id } = req.params;
    id = Number(id);
    let { name, brand, price, stock } = req.body;
    carmodel.updateOne(id, name, brand, price, stock, (err, updated) => {
        if (err) {
            console.log(err);
            return res.status(503).json({ "error": "Algo salio mal." });
        }
        return res.status(200).json({ updated });
    });
});

routes.delete("/del/:id", (req, res, next) => {
    let { id } = req.params;
    id = Number(id);
    carmodel.deleteOne(id, (err, rslt) => {
        if (err) {
            console.log(err);
            return res.status(503).json({ "error": "algo salio mal, revisa la consola" });
        }
        return res.status(200).json({ rslt });
    });
});

routes.get("/getOne/:id", (req, res, next) => {
    let { id } = req.params;
    id = Number(id);
    carmodel.getOne(id, (err, rslt) => {
        if (err) {
            console.log(err);
            return res.status(503).json({ "error": "ese compa ya es muerto, nomas no le han avisado" });
        }
        else {
            return res.status(200).json({ rslt });
        }
    });
});

module.exports = routes;