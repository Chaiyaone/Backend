const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors");


const equipmentRoutes = require("./routes/equipmentRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const issueRoutes = require("./routes/issueRoutes");
const generalRoutes = require("./routes/generalRoutes");
const app = express();
app.use(cors());
app.set("views", path.join(__dirname, "/public/views"));
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/",(req,res) => {
  res.render("index")
})
app.get("/index",(req,res) => {
  res.render("index")
})
app.get("/main", (req, res) => {
  try {
    res.render("main")
  } catch (error) {
    res.status(500).send("เกิดข้อผิดพลาดในการดึงข้อมูล");
  }
});

app.use("/equipments", equipmentRoutes);
app.use("/users",userRoutes)
app.use("/auth",authRoutes)
app.use("/issue",issueRoutes)
app.use("/general",generalRoutes)

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Frontend server is running on http://localhost:${port}`);
});
