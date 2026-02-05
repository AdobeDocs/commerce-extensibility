const appmgmt = require("./app-management");
const integrationsk = require("./integration-starter-kit");
const checkoutsk = require("./checkout-starter-kit");
const eventing = require("./events");
const wh = require("./webhooks");
const adminuisdk = require("./admin-ui-sdk");
const observe = require("./observability");
const start = require("./get-started");
const planning = require("./plan")
const reviews = require("./review");

module.exports = [...appmgmt, ...integrationsk, ...checkoutsk, ...eventing, ...wh, ...observe, ...adminuisdk, ...start, ...planning, ...reviews];

/*  const appdev = require("./app-development");
...appdev,  */