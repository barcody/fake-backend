const express = require("express");
const router = express.Router();

// Controller
const controller_appraisal_modules = require("../controllers/controller_test");

router.post(
  "/testing",  controller_appraisal_modules.testAPI
);

module.exports = router;
