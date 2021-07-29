var express = require('express');
var router = express.Router();
let userController = require('../controllers/userController');
let accountController=require('../controllers/accountController')
var cookieOptions = {
  signed: true,
  maxAge: 3000000
};
/* GET home page. */
router.get('/', function(req, res, next) {
  let cookies = req.signedCookies.cookies;
  if(cookies.user!=null){
    res.render("account", { cookies: cookies });
    console.log("cookies "+cookies.user.username);
  }else{
    res.render('account', { cookies: cookies });
  }
});

/* POST Route show the login page*/
router.post('/login', userController.processLoginPage);

/* POST  register page */
router.post('/register', userController.processRegisterPage);
router.get('/logout',userController.performLogout)

module.exports = router;