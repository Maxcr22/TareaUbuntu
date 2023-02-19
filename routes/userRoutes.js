const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController')

const {body} = require('express-validator')




router.route("/").get(usersController.getAllUsers);

router.route("/").post(body('email').isEmail(),usersController.createNewUser);

router.delete("/:id", usersController.deleteUser);

router.put("/:id", usersController.updateUser);

module.exports = router;
