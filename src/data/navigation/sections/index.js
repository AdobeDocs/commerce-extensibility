const appdev = require("./app-development");
const adminuisdk = require("./admin-ui-sdk");
const amazon = require("./amazon-sales-channel");

module.exports = [...appdev, ...adminuisdk, ...amazon];