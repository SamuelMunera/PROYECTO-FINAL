import mongoose from "mongoose";

async function connectDB() {
    try {
        const connection = await mongoose.connect(
            "mongodb://localhost:27017/DatabasePlataformReservations"
        );
        console.log("Se ha establecido conexión con la Base de Datos");
    } catch (err) {
        console.log(`Ups!, ha ocurrido un error -> ${err}`);
        process.exit(1);
    }
};

export default connectDB;