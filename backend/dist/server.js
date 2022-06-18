"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const helmet_1 = __importDefault(require("helmet"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const api_1 = __importDefault(require("./routes/api"));
const jet_logger_1 = __importDefault(require("jet-logger"));
const auth_router_1 = require("@routes/auth-router");
const errors_1 = require("@shared/errors");
const app = (0, express_1.default)();
/************************************************************************************
 *                              Set basic express settings
 ***********************************************************************************/
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)(auth_router_1.cookieProps.secret));
// Show routes called in console during development
if (process.env.NODE_ENV === 'development') {
    app.use((0, morgan_1.default)('dev'));
}
// Security
if (process.env.NODE_ENV === 'production') {
    app.use((0, helmet_1.default)());
}
// Add APIs
app.use('/api', api_1.default);
// Error handling
app.use((err, _, res, __) => {
    jet_logger_1.default.err(err, true);
    const status = (err instanceof errors_1.CustomError ? err.HttpStatus : http_status_codes_1.default.BAD_REQUEST);
    return res.status(status).json({
        error: err.message,
    });
});
/************************************************************************************
 *                              Serve front-end content
 ***********************************************************************************/
// Set views directory (html)
const viewsDir = path_1.default.join(__dirname, 'views');
app.set('views', viewsDir);
// Set static directory (js and css).
const staticDir = path_1.default.join(__dirname, 'public');
app.use(express_1.default.static(staticDir));
// Nav to login pg by default
app.get('/', (_, res) => {
    res.sendFile('login.html', { root: viewsDir });
});
// Redirect to login if not logged in.
app.get('/users', (req, res) => {
    const jwt = req.signedCookies[auth_router_1.cookieProps.key];
    if (!jwt) {
        res.redirect('/');
    }
    else {
        res.sendFile('users.html', { root: viewsDir });
    }
});
/************************************************************************************
 *                              Export Server
 ***********************************************************************************/
exports.default = app;
