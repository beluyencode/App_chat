const express = require('express');
const router =express.Router();
const userController = require('../controllers/userController');
const verify = require('../middleware/verify')

router.get('/',verify ,userController.getUser);
router.post('/', userController.signIn);
router.post('/SignUp', userController.SignUp);
router.post('/changeInfoUser',verify, userController.changeInfoUser);
router.get("/check",userController.check)



module.exports = router;
