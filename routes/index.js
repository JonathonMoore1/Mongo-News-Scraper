// import {router as api} from "./api/api_routes";
// import {router as view} from "./view/view_routes";
const api = require("./api/api_routes");
const view = require("./view/view_routes");

module.exports = {
  api: api,
  view: view
}

// export default {api, view};