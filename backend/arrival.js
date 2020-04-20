const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArrivalSchema = new Schema(
  {
    terminalName: String,
    lighterName: String,
    lighterCompany: String,
    craneNumber: String,
    arrivedTime: String,
    id: String
  },
  { collection: 'Arrivals' }
);

module.exports = mongoose.model("Arrival", ArrivalSchema);
