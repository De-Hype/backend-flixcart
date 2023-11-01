const { Register, Login, LogOut, VerifyCookie, fetchUsers } = require("../controllers/auth");
const authLimiter = require("../middleware/authLimiter");
const router = require("express").Router();



router.post("/register", authLimiter, Register);
router.post("/login", authLimiter, Login);
router.post('/verify-cookie', VerifyCookie)
router.get("/logout", LogOut);
router.get("/all-users", fetchUsers);

module.exports = router 
