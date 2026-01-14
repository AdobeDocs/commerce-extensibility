const appdev = require("./app-development");
const appmgmt = require("./app-management");
const integrationsk = require("./integration-starter-kit");
const checkoutsk = require("./checkout-starter-kit");
const eventing = require("./events");
const wh = require("./webhooks");
const adminuisdk = require("./admin-ui-sdk");
const observe = require("./observability");

module.exports = [...appdev, ...appmgmt, ...integrationsk, ...checkoutsk, ...eventing, ...wh, ...observe, ...adminuisdk];