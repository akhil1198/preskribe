const express = require("express");
const petControllers = require("../controllers/PetController");
const router = express.Router();

router.post("/register", petControllers.register);

module.exports = router;
