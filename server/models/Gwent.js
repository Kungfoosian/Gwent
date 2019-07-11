const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gwentSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  faction: {
    type: String,
    required: true
  },
  unit: {
    type: String,
    required: true
  },
  range: {
    type: String,
    required: true
  },
  strength: {
    type: String,
    required: true
  },
  special: {
    type: String,
    default: "n/a"
  }
});

module.exports = Gwent = mongoose.model("Gwent", gwentSchema);
