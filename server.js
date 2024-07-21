const express = require("express");
const cors = require("cors");
const testRoute = require("./routes/testRoute")
const restaurantRoute = require("./routes/restaurantRoute")
const mongoose = require("mongoose");
const updateRoute = require("./routes/updateRoute")
const menuRoute = require("./routes/menuRoute")
const imageRoute = require("./routes/imageRoute")
const path = require('path')
const authRoutes = require("./routes/authRoutes");

require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

try {
  mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB");
} catch (error) {
  console.log("MongoDB Connection failed")
}

app.use('/api/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api', testRoute, restaurantRoute, updateRoute, menuRoute);
app.use('/api/images', imageRoute);
app.use('/api/auth', authRoutes);


app.listen(PORT, () => {
  console.log(`Listening at port: ${PORT}`);
});