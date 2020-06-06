// next.config.js
require("dotenv").config();

module.exports = {
  env: {
    AE_API_KEY: process.env.AE_API_KEY,
  }
}