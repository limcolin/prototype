const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DeliverySchema = new Schema(
  {
    id: Number,
    lighterName: String,
    lighterId: String,
    terminalName: String,
    terminalLat: Number,
    terminalLng: Number,
    berth: Number,
    mothership: String,
    anchorage: Number,
    timeslot: Number,
    pallets: Number
  },
  { collection: 'Deliveries' }
);

module.exports = mongoose.model("Delivery", DeliverySchema);
