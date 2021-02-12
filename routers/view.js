let express=require('express');
let router=express.Router();
let viewController=require("../controllers/view.js");
let authController=require("../controllers/auth.js");

router.use(authController.checkLogin);
router.use(authController.checkAuth);

//Sign-up
router.route("/signup").get(viewController.getSignUpPage)

router.route("/login").get(viewController.getLoginPage)

router.route("/profile").get(viewController.getProfilePage)

router.route("/notfound").get(viewController.getPageNotFound)

router.route("/cheerMeUp").get(viewController.getEmotionalWall)

router.route("/addPost").get(authController.checkLogin,viewController.addPost)
router.route("/review").get(authController.checkLogin,viewController.getReviewPage)

router.route("/").get(viewController.getHomePage)



module.exports=router