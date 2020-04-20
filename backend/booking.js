const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookingSchema = new Schema(
  {
    id: Number,
    price: Number,
    terminalName: String,
    craneNumber: String,
    lighterName: String,
    lighterId: String,
    lighterCompany: String,
    arrivedDate: String,
    arrivedTime: String,
    totalPallets: Number,
    loadTime: Number,
    completed: Boolean,
    completedTime: Number,
    destinations: [
      {
        stop: Number,
        anchorage: String,
        vessel: String,
        callSign: String,
        imoNumber: Number,
        flag: String,
        pallets: Number
      }
    ]
  },
  { collection: 'Bookings' }
);

module.exports = mongoose.model("Booking", BookingSchema);
