const express = require("express");
const bodyParser = require("body-parser");
const db = require("./models");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();

app.use(cors());
require("dotenv").config();

app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

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

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Use multer middleware for the /posts route
app.use(
  "/posts",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ])
);

const PORT = process.env.PORT || 3001;

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

module.exports = app;
