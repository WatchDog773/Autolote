var db = require("../config/db")();
var model = null;
initModel = () => {
    db.run("CREATE TABLE IF NOT EXISTS car(id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(30), brand VARCHAR(30), year INTEGER, price NUMERIC, stock INTEGER, sales INTEGER )");
    model = {};

    model.getAll = (handler) => {
        db.all("SELECT * FROM car;",
            (err, rows) => {
                if (err) {
                    return handler(err, null);
                } else {
                    return handler(null, rows);
                }
            }
        )
    };

    model.addOne = (name, brand, year, price, stock, handler) => {
        db.run(
            "INSERT INTO car (name, brand, year, price, stock, sales) VALUES (?, ?, ?, ?, ?,0);",
            [name, brand, year, price, stock],
            (err, rslt) => {
                console.log(rslt);
                if (err) {
                    return handler(err, null);
                } else {
                    return handler(null, true);
                }
            }
        );
    };

    model.updateOne = (id, name, brand, price, stock, handler) => {
        db.run(
            "UPDATE car set name = ?, brand = ?, price = ?, stock = ?  where id = ?;",
            [name, brand, price, stock, id],
            (err, rslt) => {
                console.log(rslt);
                if (err) {
                    return handler(err, null);
                } else {
                    return handler(null, true);
                }
            }
        );
    }

    model.deleteOne = (id, handler) => {
        db.run("DELETE from car where id = ?;", [id], (err, rslt) => {
            console.log(rslt);
            if (err) {
                return handler(err, null);
            }
            else {
                return handler(null, true);
            }
        });
    };

    model.getOne = (id, handler) => {
        db.all("SELECT * FROM car WHERE id = ?;", [id], (err, rslt) => {
            console.log(rslt);
            if (err) {
                return handler(err, null);
            }
            else {
                return handler(null, rslt);
            }
        });
    };

    return model;
};


module.exports = () => {
    if (!model) {
        return initModel();
    } else {
        return model;
    }
}