let express=require('express');
let router=express.Router();
let authController=require("../controllers/auth.js");

router.use(authController.checkLogin);

//Sign-up
router.route("/signup").post(authController.signup);

//Login
router.route("/login").post(authController.login);
router.route("/logout").get(authController.logout);

module.exports=router