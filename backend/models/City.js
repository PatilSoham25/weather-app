const mongoose = require("mongoose");

const citySchema = mongoose.Schema(
  {
    cityName: {
      type: String,
      required: true,
    },
    temperature: Number,
    humidity: Number,
    weather: String,
    isFavorite: {
      type: Boolean,
      default: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("City", citySchema);