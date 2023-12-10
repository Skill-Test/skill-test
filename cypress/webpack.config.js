// cypress/weboack.config.js
const path = require('path');

module.exports = (on, config) => {
  config.resolve.alias = {
    '@': path.resolve(__dirname, '../src'), // Adjust the path as needed
  };

  // Other configurations...

  return config;
};