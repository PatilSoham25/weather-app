const axios = require("axios");
const City = require("../models/City");

// Add city
exports.addCity = async (req, res) => {
  const { cityName } = req.body;

  try {
    // 🌤️ Fetch weather from OpenWeather
    const weatherRes = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${process.env.WEATHER_API_KEY}&units=metric`
    );

    const weatherData = weatherRes.data;

    // 🔎 Check if city already exists for this user
    const existingCity = await City.findOne({
      cityName,
      user: req.user._id,
    });

    if (existingCity) {
      // 🔄 Update weather instead of creating duplicate
      existingCity.temperature = weatherData.main.temp;
      existingCity.humidity = weatherData.main.humidity;
      existingCity.weather = weatherData.weather[0].description;

      await existingCity.save();

      return res.json(existingCity);
    }

    const city = await City.create({
      cityName,
      user: req.user._id,
      temperature: weatherData.main.temp,
      humidity: weatherData.main.humidity,
      weather: weatherData.weather[0].description,
    });

    res.status(201).json(city);

  } catch (error) {
    res.status(400).json({ message: "City not found or API error" });
  }
};

// Get user cities
exports.getCities = async (req, res) => {
  const cities = await City.find({ user: req.user._id });
  res.json(cities);
};

// Delete city
exports.deleteCity = async (req, res) => {
  const city = await City.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!city) {
    return res.status(404).json({ message: "City not found" });
  }

  await city.deleteOne();

  res.json({ message: "City removed" });
};

// Toggle favorite
exports.toggleFavorite = async (req, res) => {
  const city = await City.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!city) {
    return res.status(404).json({ message: "City not found" });
  }

  city.isFavorite = !city.isFavorite;
  await city.save();

  res.json(city);
};