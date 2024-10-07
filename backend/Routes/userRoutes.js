const express = require('express');
const { model } = require('mongoose');
const {register,authUser} = require('../controllers/userController');

const router = express.Router();
// logic calling 
router.route('/').post(register)
router.route('/login').post(authUser)

module.exports= router;