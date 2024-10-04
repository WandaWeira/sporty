const express = require("express");
const bodyParser = require("body-parser");
const db = require("./models");
const cors = require("cors");

// app.use(cors({
//   origin: 'http://localhost:3000', // Replace with your frontend URL
//   credentials: true,
// }));

const app = express();

app.use(cors());
require("dotenv").config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Import routes
const userRoutes = require("./routes/userRoutes");
const clubRoutes = require("./routes/clubRoutes");
const coachRoutes = require("./routes/coachRoutes");
const commentRoutes = require("./routes/commentRoutes");
const eventRoutes = require("./routes/eventRoutes");
const playerRoutes = require("./routes/playerRoutes");
const playerRecruiterRoutes = require("./routes/playerRecruiterRoutes");
const postRoutes = require("./routes/postRoutes");
const scoutRoutes = require("./routes/scoutRoutes");
const tournamentRoutes = require("./routes/tournamentRoutes");
const authRoutes = require("./routes/authRoutes");
const messageRoutes = require("./routes/messageRoutes");

// Use routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/clubs", clubRoutes);
app.use("/coaches", coachRoutes);
app.use("/comments", commentRoutes);
app.use("/events", eventRoutes);
app.use("/players", playerRoutes);
app.use("/player-recruiters", playerRecruiterRoutes);
app.use("/posts", postRoutes);
app.use("/scouts", scoutRoutes);
app.use("/tournaments", tournamentRoutes);
app.use("/messages", messageRoutes);

const PORT = process.env.PORT || 3001;

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

module.exports = app;
