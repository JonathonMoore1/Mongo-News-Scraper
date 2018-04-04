const express = require("express");
const router = express.Router();

router.get("/api/", (req, res) => res.send("api routes connected!"));

// export default router;

module.exports = router;