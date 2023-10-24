const {Router} = require ("express")
const router = Router();
const userCtrl = require("../controller/user.controler");

router.post("/user", userCtrl.registerUser);
router.post("/userid", userCtrl.login);

router.get("/booksid", userCtrl.getBook);
router.get("/books", userCtrl.getAllBooks);
router.post("/books", userCtrl.postBook);
router.put("/books", userCtrl.putBook);
router.delete("/books", userCtrl.deleteBook);


module.exports = router;