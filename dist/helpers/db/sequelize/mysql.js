"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const global_config_1 = require("@/helpers/infra/global-config");
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize(global_config_1.config.db.database, global_config_1.config.db.user, global_config_1.config.db.password, {
    host: global_config_1.config.db.host,
    port: global_config_1.config.db.port,
    dialect: global_config_1.config.db.dialect,
    logging: true,
});
exports.default = sequelize;
