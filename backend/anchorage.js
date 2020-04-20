const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AnchorageSchema = new Schema(
  {
    name: String,
    code: String,
    description: String,
    coordinates: [String]
  },
  { collection: 'Anchorages' }
);

module.exports = mongoose.model("Anchorage", AnchorageSchema);
