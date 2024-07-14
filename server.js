const express = require("express");
const cors = require("cors");
const testRoute = require("./routes/testRoute")

require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


app.use('/api', testRoute);

app.listen(PORT, () => {
  console.log(`Listening at port: ${PORT}`);
});