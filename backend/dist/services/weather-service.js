"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const openweather_apis_1 = __importDefault(require("@cicciosgamino/openweather-apis"));
// Retrieve the Api Key from OS env
const apiKey = (_a = process.env.OPEN_WEATHER_KEY) !== null && _a !== void 0 ? _a : "";
// request the main weather data in JSON format
// weather.getSmartJSON()
//   .then(result => console.log(result))
//   .catch(err => console.log(err))
// {
//  temp: 23.45,
//  humidity: 51,
//  pressure: 1023,
//  description: 'cielo sereno',
//  weathercode: 800,
//  rain: undefined
// }
class WeatherService {
    constructor() {
        new openweather_apis_1.default(weather => {
            this.weatherAPI = weather;
            this.weatherAPI.setApiKey(apiKey);
            this.weatherAPI.setUnits("metric");
        });
    }
    getWeatherByCity(city, state, country) {
        return __awaiter(this, void 0, void 0, function* () {
            this.weatherAPI.setCity(city);
            try {
                const forecast = yield this.weatherAPI.getSmartJson();
                return forecast;
            }
            catch (error) {
                return {
                    error: `Failed to fetch weather forecast for ${city}`,
                    debug: error
                };
            }
        });
    }
}
exports.default = WeatherService;
