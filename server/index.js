const express = require("express");
const bodyParser = require("body-parser");
const db = require("./models");

const app = express();

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
const authRoutes = require('./routes/authRoutes');
const messageRoutes = require('./routes/messageRoutes');

// Use routes
router.use('/auth', authRoutes);
router.use("/users", userRoutes);
router.use("/clubs", clubRoutes);
router.use("/coaches", coachRoutes);
router.use("/comments", commentRoutes);
router.use("/events", eventRoutes);
router.use("/players", playerRoutes);
router.use("/player-recruiters", playerRecruiterRoutes);
router.use("/posts", postRoutes);
router.use("/scouts", scoutRoutes);
router.use("/tournaments", tournamentRoutes);
router.use('/messages', messageRoutes);


const PORT = process.env.PORT || 3001;

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

module.exports = app;
