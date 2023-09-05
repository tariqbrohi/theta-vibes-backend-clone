const app = require("express")();
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
// const routes = require("./routes/index");
const routes = require("./routes");

const db = require("./models");
const cors = require("cors");

// bcrypt.hash("321Developer", 10, function (err, hash) {
//   console.log(hash);
// });

// app.use("/api/webhook", webhookRoutes);

dotenv.config();
app.use(bodyParser.json());
// Enable CORS for multiple origins
app.use(
  cors({
    origin: [
      // "http://127.0.0.1:5173",
      // "http://192.81.209.102",
      "http://localhost:3000",
      // "http://standoutspecialties.com/",
      // "https://standoutspecialties.netlify.app/",
    ],
  })
);

db.sequelize.sync({ force: false });

app.listen(process.env.PORT, () => {
  console.log(`App's running on port: ${process.env.PORT}`);
});
