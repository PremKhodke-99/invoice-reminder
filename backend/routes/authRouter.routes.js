const { googleLogin } = require("../controller/authController");

const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("hi");
});

router.get("/google", googleLogin);
module.exports = router;