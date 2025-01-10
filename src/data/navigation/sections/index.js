const appdev = require("./app-development");
const integrationsk = require("./integration-starter-kit");
const checkoutsk = require("./checkout-starter-kit");
const eventing = require("./events");
const wh = require("./webhooks");
const adminuisdk = require("./admin-ui-sdk");

module.exports = [...appdev, ...integrationsk, ...checkoutsk, ...eventing, ...wh, ...adminuisdk];