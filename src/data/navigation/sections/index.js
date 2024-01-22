const appdev = require("./app-development");
const eventing = require("./events");
const wh = require("./webhooks");
const adminuisdk = require("./admin-ui-sdk");
const starter = require("./starter-kit");
const amazon = require("./amazon-sales-channel");

module.exports = [...appdev, ...eventing, ...wh, ...adminuisdk, ...starter, ...amazon];