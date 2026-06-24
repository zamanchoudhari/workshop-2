const express = require("express");
const router = express.Router();

const roleController = require("../controllers/role");

router.post(
    "/create",
    roleController.createRole
);

router.get(
    "/all",
    roleController.getRoles
);

module.exports = router;