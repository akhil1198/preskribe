const express = require('express')
const chatController = require('../controllers/ChatControllers')
const router = express.Router()

//testing sessions
router.get("/getsessions", chatController.getReq);
router.get("/setsessions", chatController.setReq);
router.post("/login", chatController.loginChat);

module.exports = router;
