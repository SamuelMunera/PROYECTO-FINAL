
import mongoose from "mongoose";

const typeUserSchema = mongoose.Schema({
  type: {
    type: String,
    required: [true, "El nombre del tipo de usuario es requerido"],
  },
  deletedAt: {
    type: Date,
    default: null,
  }
}, {
  timestamps: true,
});

const TypeUser = mongoose.model("TypeUser", typeUserSchema);
export default TypeUser;