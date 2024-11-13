import mongoose from "mongoose";

const reservationSchema = mongoose.Schema({
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User"
    },
    dateReservation: {
    type: Date,
    required: true,
  },
  timeReservation: {
    type: String,
    default: null,
  },
  status: {
    type: String,
    default: null,
  },
  priceTotal: {
    type: Number,
    default: null,
  },
  deletedAt: {
    type: Date,
    default: null
  },
  business: {
    type: mongoose.Types.ObjectId,
    ref: "business"
  },
  service: {
    type: mongoose.Types.ObjectId,
    ref: "Service"
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User"
  },
}, {
  timestamps: true,
});

const Reservation = mongoose.model("Reservation", reservationSchema);
export default Reservation;
