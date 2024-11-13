import mongoose from "mongoose";

const businessSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "El nombre del Negocio es requerido"],
    },
    slogan: {
      type: String,
      required:[true, "El Slogan del Negocio es requerido"]
    },
    address: {
      type: String,
      required: [true, "La dirección del Negocio es requerido"],
    },
    category: {
      type: String,
      required: [true, "La categoria del Negocio es requerida"],
    },
    phone: {
      type: String,
      required: [true, "El Telefono del Negocio es requerido"],
    },
    email: {
      type: String,
      required: [true, "El email del Negocio es requerido"],
    },
    businessLogo: {
      type: String,
      required: [true, "El logo del Negocio es requerido"],
    },
    deletedAt: {
      type: Date,
      default: null,
    },
    userBusiness: {
      type: mongoose.Types.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: true,
  }
);

// Dato que existe en tiempo de ejecución pero no en la base de datos
businessSchema.virtual("services", {
  ref: "Service",
  // Declaramos la propiedad que mantiene único al modelo
  localField: "_id",
  // Campo en servicio que esta haciendo relacion en el modelo business
  foreignField: "businessService"
});

businessSchema.set("toJSON", { virtuals: true });

businessSchema.set("toObject", { virtuals: true });

const business = mongoose.model("business", businessSchema);
export default business;
