export interface IWeatherError {
    error: string
    debug: any
}

/**
 * Interface to describe the weather response from OpenWeatherMap's API
 */
export interface IWeatherSummary {
    coord: { lon: number, lat: number },
    weather: [
      { id: number, main: string, description: string, icon: string }
    ],
    base: number,
    main: {
      temp: number,
      feels_like: number,
      temp_min: number,
      temp_max: number,
      pressure: number,
      humidity: number,
      sea_level: number,
      grnd_level: number
    },
    visibility: number,
    wind: { speed: number, deg: number, gust: number },
    clouds: { all: number },
    dt: number,
    sys: { country: string, sunrise: number, sunset: number },
    timezone: number,
    id: number,
    name: string,
    cod: number
}

export interface IWeatherForecast {
    temp: number
    humidity: number
    pressure: number
    description: string
    name: string
    wind: { speed: number, deg: number, gust: number }
}