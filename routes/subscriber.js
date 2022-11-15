const express = require('express');
const router = express.Router();
const { subscribers, addsubscriber, subscriberById, subscriberOne, updatesubscriber, deletesubscriber } = require('../controllers/subscribers');

router.get("/", subscribers);
router.get("/:id", subscriberById, subscriberOne);
router.post("/", addsubscriber);
router.patch("/:id", subscriberById, updatesubscriber);
router.delete("/:id", subscriberById, deletesubscriber);

module.exports = router;