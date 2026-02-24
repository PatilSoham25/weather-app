const express = require("express");
const protect = require("../middleware/authMiddleware");
const {
  addCity,
  getCities,
  deleteCity,
  toggleFavorite,
} = require("../controllers/cityController");

const router = express.Router();

router.route("/")
  .post(protect, addCity)
  .get(protect, getCities);

router.route("/:id")
  .delete(protect, deleteCity);

router.route("/:id/favorite")
  .patch(protect, toggleFavorite);

module.exports = router;