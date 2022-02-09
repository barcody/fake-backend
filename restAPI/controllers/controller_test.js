const express = require("express");
const router = express.Router();
const logger = require("../../logger").logger;

/**
 * @async
 * @route   POST /api/testAPI
 * @returns {object} test API
 * @author  Hariharan
 * @access  private
 * @version 1.0
 */

exports.testAPI = async (req, res, next) => {
  res.send({
    error: false,
    data: "Test API Works",
  });
};
