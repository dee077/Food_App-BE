const express = require("express");
const cors = require("cors");
const testRoute = require("./routes/testRoute")
const restaurantRoute = require("./routes/restaurantRoute")
const updateRoute = require("./routes/updateRoute")
const menuRoute = require("./routes/menuRoute")
const imageRoute = require("./routes/imageRoute")
const path = require('path')

require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api', testRoute, restaurantRoute, updateRoute, menuRoute);
app.use('/api/images', imageRoute);

app.listen(PORT, () => {
  console.log(`Listening at port: ${PORT}`);
});