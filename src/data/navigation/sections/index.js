const appdev = require("./app-development");
const starter = require("./starter-kit");
const eventing = require("./events");
const wh = require("./webhooks");
const adminuisdk = require("./admin-ui-sdk");

module.exports = [...appdev, ...starter, ...eventing, ...wh, ...adminuisdk];