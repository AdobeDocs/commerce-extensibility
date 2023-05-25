const adminuisdk = require("./admin-ui-sdk");
const amazon = require("./amazon-sales-channel");

module.exports = [...adminuisdk, ...amazon];