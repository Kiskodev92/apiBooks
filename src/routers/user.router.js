const {Router} = require ("express")
const router = Router();
const userCtrl = require("../controller/user.controler");

router.post("/postuser", userCtrl.registerUser);


module.exports = router;