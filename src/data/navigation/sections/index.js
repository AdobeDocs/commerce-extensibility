const appdev = require("./app-development");
const eventing = require("./events");
const wh = require("./webhooks");
const adminuisdk = require("./admin-ui-sdk");

module.exports = [...appdev, ...eventing, ...wh, ...adminuisdk];