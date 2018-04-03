"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const db_1 = require("./db");
const app_1 = require("./app");
const port = process.env.PORT || 4000;
db_1.default()
    .then(_ => app_1.app.listen(4000, () => console.log(`Listening on port ${port}`)))
    .catch(err => console.error(err));
//# sourceMappingURL=index.js.map