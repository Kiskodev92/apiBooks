const {Router} = require ("express")
const router = Router();
const userCtrl = require("../controller/user.controler");

router.get("/user", userCtrl.registerUser);


module.exports = router;