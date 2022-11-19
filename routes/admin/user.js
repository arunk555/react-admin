const express = require('express');
const router = express.Router();
const { register } = require('../../controllers/admin/user');

router.get("/register", register);

router.post("/login", ()=>{

});

router.patch("/:id", ()=>{

});

router.delete("/:id", ()=>{

});

module.exports = router;


