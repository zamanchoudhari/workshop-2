const express = require("express");
const dotenv = require("dotenv");

dotenv.config();
console.log("JWT_SECRET =", process.env.JWT_SECRET);

require("./config/db");

const app = express();

const userRoutes = require("./routes/user");
const roleRoutes = require("./routes/role");

app.use(express.json());

app.use("/user", userRoutes);
app.use("/role", roleRoutes);

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});