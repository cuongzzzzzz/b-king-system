const express = require("express");

const router = express.Router();

router.use("/", require("./access"));
router.use("/momo", require("./momo"));
router.use("/stripe", require("./stripe"));
router.use("/stations", require("./stations"));
router.use("/booking", require("./booking"));
router.use("/route", require("./route"));
router.use("/trip", require("./trip"));
router.use("/user", require("./user"));
router.use("/carrier", require("./carrier"));
router.use("/vehicle", require("./vehicle"));
router.use("/province", require("./province"));

module.exports = router;
