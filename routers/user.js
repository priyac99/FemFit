let express=require('express');
let router=express.Router();
let authController=require("../controllers/auth.js");
let bmiController=require("../controllers/bmi.js");

router.use(authController.checkLogin);

//Sign-up
router.route("/signup").post(authController.signup);

//Login
router.route("/login").post(authController.login);
router.route("/logout").get(authController.logout);

router.route("/bmi").post(bmiController.saveBmi)

module.exports=router