"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middleware_1 = require("./middleware");
const auth_router_1 = __importDefault(require("./auth-router"));
const user_router_1 = __importDefault(require("./user-router"));
const weather_router_1 = __importDefault(require("./weather-router"));
// Init
const apiRouter = (0, express_1.Router)();
// Add api routes
apiRouter.use('/auth', auth_router_1.default);
apiRouter.use('/users', middleware_1.adminMw, user_router_1.default);
apiRouter.use('/weather', weather_router_1.default);
// Export default
exports.default = apiRouter;
