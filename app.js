const express = require("express");

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