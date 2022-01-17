const express = require("express");
const vetControllers = require("../controllers/VetController");
const router = express.Router();

router.post("/register", vetControllers.register);

module.exports = router;
