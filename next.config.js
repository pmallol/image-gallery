// next.config.js
require("dotenv").config();

const withSass = require('@zeit/next-sass')
module.exports = withSass({
  env: {
    AE_API_KEY: process.env.AE_API_KEY,
  }
})