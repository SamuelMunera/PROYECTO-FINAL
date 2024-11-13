import { ExpressValidator } from "express-validator";

function tokenValidation (err, req, res, next) {
    if (err.name === "UnauthorizedError") {
      res.status(401).json("Para realizar esta acción debes estar registrado en el sistema");
    } else {
      next(err);
    }
};

export default tokenValidation;