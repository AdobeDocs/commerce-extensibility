const appmgmt = require("./app-management");
const eventing = require("./events");
const wh = require("./webhooks");
const adminuisdk = require("./admin-ui-sdk");
const observe = require("./observability");
const start = require("./get-started");
const planning = require("./plan")
const reviews = require("./review");
const kits = require("./starter-kits");


module.exports = [...appmgmt, ...eventing, ...wh, ...observe, ...adminuisdk, ...start, ...planning, ...reviews, ...kits];

/*  const appdev = require("./app-development");
...appdev,  */