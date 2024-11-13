import User from "../models/User.js";

import jwt from "jsonwebtoken";
import bycrypt from "bcryptjs";

async function token(req, res) {
    
    try {

        const user = await User.findOne({ email: req.body.email });

        if (user) {
            
            const match = await bycrypt.compare(req.body.password, user.password);

            if (match) {
                const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);
                return res.json({ token: token, name: user.name });
            };

        };

        return res.status(401).json({
            message: "Error, las credenciales son invalidas"
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Ups, ocurrio un error al validar las credenciales"
        });
    };

};

export default { token };