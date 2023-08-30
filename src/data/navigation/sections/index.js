const appdev = require("./app-development");
const eventing = require("./events");
const adminuisdk = require("./admin-ui-sdk");
const amazon = require("./amazon-sales-channel");

module.exports = [...appdev, ...eventing, ...adminuisdk, ...amazon];