const {Router} = require ("express")
const router = Router();
const userCtrl = require("../controller/user.controler");

router.post("/postuser", userCtrl.registerUser);
router.post("/loginuser", userCtrl.login);

router.get("/start", userCtrl.getStart);
router.get("/books/:id", userCtrl.getBook);
router.get("/books", userCtrl.getAllBooks);
router.post("/books", userCtrl.postBook);
router.put("/books", userCtrl.putBook);
router.delete("/books/:id", userCtrl.deleteBook);


module.exports = router;