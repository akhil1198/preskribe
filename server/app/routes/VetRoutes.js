const express = require("express");
const vetControllers = require("../controllers/VetController");
const router = express.Router();

router.post("/register", vetControllers.register);
router.post("/login", vetControllers.loginVet);
router.get("/getAll", vetControllers.getAll);

module.exports = router;
