const { Router } = require('express');
const authController = require('../controllers/auth.controllers');

const router = Router();

router.post('/signup',authController.signup_post);
router.post('/login',authController.login_post);
router.get('/logout',authController.logout_get);
router.get('/',authController.checkUser);

module.exports = router;