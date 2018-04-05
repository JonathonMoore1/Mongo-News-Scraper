// vvv View routes go here vvv
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => res.render("home"));

// export default router;

module.exports = router;