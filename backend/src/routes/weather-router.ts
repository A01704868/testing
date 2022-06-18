import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';

import WeatherService from '@services/weather-service';
//import { ParamMissingError } from '@shared/errors';



// Constants
const router = Router();
const { CREATED, OK, BAD_REQUEST, NOT_FOUND } = StatusCodes;

// Paths
export const p = {
    get: '/all',
    add: '/add',
    update: '/update',
    delete: '/delete/:id',
} as const;


/**
 * Get weather forecasts.
 */
router.get(p.get, async (req: Request, res: Response) => {
    const { city, state, country } = req.body;
    const forecast = await WeatherService.getWeatherByCity(city, state, country);

    return res.status(OK).json({forecast});
});

router.post("/coordinates", async (req: Request, res: Response) => {
    const { latitude, longitude } = req.body;

    if (!latitude || !longitude) {
        return res.status(BAD_REQUEST).json({
            error: "Missing coordinates",
            debug: { latitude, longitude }
        });
    }

    try {
        const weatherForecast = await WeatherService.getWeatherByCoordinates(latitude, longitude);
        if (!weatherForecast) {
            return res.status(NOT_FOUND).json({
                error: "Couldn't retrieve weather data",
                debug: { latitude, longitude }
            });
        }

        res.status(OK).json(weatherForecast);
        
    } catch (error) {
        res.status(NOT_FOUND).json({
            error: "Couldn't retrieve weather data",
            debug: error
        });
    }
});

// Export default
export default router;
