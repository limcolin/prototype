const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RequestSchema = new Schema(
  {
    id: Number,
    mothership: String,
    callSign: String,
    imoNumber: Number,
    anchorage: String,
    lat: Number,
    lng: Number,
    pellets: Number,
    time: Number,
    completed: Boolean,
    completedTime: Number
  },
  { collection: 'Requests' }
);

// TODO: autoIndex, ensureIndexes, getIndexes etc. best practice for production

module.exports = mongoose.model("Request", RequestSchema);
