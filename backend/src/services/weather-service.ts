import { NotImplementedError } from "@shared/errors";
import { IWeatherError, IWeatherSummary, IWeatherForecast  } from "@models/weather-model";
import axios from "axios";

// Retrieve the Api Key from OS env
const apiKey = process.env.OPEN_WEATHER_KEY ?? "100b0c6b01aa6013056da0f7e9ca023c"


export default class WeatherService {

    private static readonly BASE_URL = "http://api.openweathermap.org/data/2.5/";
    private static readonly GEOCODING_URL = "http://api.openweathermap.org/geo/1.0/direct?q={city},{state},{country}";
    private static readonly WEATHER_ENDPOINT = "weather";

    private static readonly WEATHER_UNITS = "metric";
    private static readonly WEATHER_LANG = "es";

    public static async getWeatherByCoordinates(latitude: number, longitude: number) {
        if (!latitude || !longitude) {
            return <IWeatherError> {
                debug: { latitude, longitude },
                error: "Unable to retrieve forecast, missing parameters"
            };
        }

        try {
            const response = await axios.request({
                baseURL: this.BASE_URL,
                url: this.WEATHER_ENDPOINT,
                method: 'get',
                params: {
                    lang: this.WEATHER_LANG,
                    units: this.WEATHER_UNITS,
                    appid: apiKey,
                    lat: latitude,
                    lon: longitude
                }
            })

            const summary: IWeatherSummary = await response.data;
            return <IWeatherForecast> {
                temp: summary.main.temp,
                description: summary.weather[0].description,
                humidity: summary.main.humidity,
                pressure: summary.main.pressure,
                name: summary.name,
                wind: summary.wind
            };

        } catch (error) {
            return <IWeatherError>{
                debug: error.message,
                error: `Unable to retrieve forecast for coordinates: lat: ${latitude} - lon: ${longitude}`
            }
        }
    }

    /**
     * Returns the weather summary of a given city after doing an initial coordinate lookup
     * @return {@type IWeatherSummary | IWeatherError} Returns a summary of the weather for the requested location or an error with debug info
     */
    public static async getWeatherByCity(city: string, state: string = "", country: string = "MX") {
        if (!city) {
            return <IWeatherError>{
                debug: { city, state, country },
                error: "Unable to retrieve forecast, missing city"
            }
        }

        try {
            const geoCodingUrl = this.GEOCODING_URL
                .replace("{city}", city)
                .replace("{state}", state)
                .replace("{country}", country);

            const locations = await axios.get(geoCodingUrl, {
                params: {
                    limit: 10,
                    appid: apiKey
                }
            })

            const cityGeoLocation = locations.data?.filter(location => location.country === country);
            const { lat, lon } = cityGeoLocation[0] || {};

            if (!lat || !lon) {
                return <IWeatherError>{
                    debug: { lat, lon, city, state, country },
                    error: `Unable to retrieve forecast for city: ${city}, missing either ${lat} or ${lon}`
                }
            }

            const forecast = await axios.request({
                baseURL: this.BASE_URL,
                url: this.WEATHER_ENDPOINT,
                method: 'get',
                params: {
                    lang: this.WEATHER_LANG,
                    units: this.WEATHER_UNITS,
                    appid: apiKey,
                    lat: lat,
                    lon: lon
                }
            })
            
            return forecast.data as IWeatherSummary;

        } catch (error) {
            return <IWeatherError>{
                debug: error,
                error: `Unable to retrieve forecast for city: ${city}`
            }
        }
    }
}