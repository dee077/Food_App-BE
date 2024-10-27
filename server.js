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

const cors = require('cors');

app.use(
  cors({
    origin: ["https://www.hireanything.com", "https://hireanything.com"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

// Handle preflight requests
app.options('*', cors());


async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("MongoDB Connection failed", error);
    process.exit(1); // Exit the application if the connection fails
  }
}

connectDB();


app.get('/', (req, res) => {
  res.send('Hello Food App Backend');
});

app.use(express.json());

app.use('/api/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api', testRoute, restaurantRoute, updateRoute, menuRoute);
app.use('/api/images', imageRoute);
app.use('/api/auth', authRoutes);


app.listen(PORT, () => {
  console.log(`Listening at port: ${PORT}`);
});

module.exports = app