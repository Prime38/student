var express = require('express');
var router = express.Router();
let userController = require('../controllers/userController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('account', { title: 'Express' });
});

/* POST Route show the login page*/
router.post('/login', userController.processLoginPage);

/* POST  register page */
router.post('/register', userController.processRegisterPage);
router.get('/logout',userController.performLogout)

module.exports = router;