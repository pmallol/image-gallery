// next.config.js
require("dotenv").config();

module.exports = {
  env: {
    AE_API_KEY: process.env.AE_API_KEY,
    UNSPLASH_ACCESS_KEY: process.env.UNSPLASH_ACCESS_KEY,
  }
}
