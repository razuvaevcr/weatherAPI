import { useHttp } from "../hooks/http.hook";

const WeatherService = () => {
    const { request } = useHttp();

    const _apiBasePlace = 'http://api.openweathermap.org/geo/1.0/direct?';
    const _apiBaseWeather = 'https://api.openweathermap.org/data/2.5/weather?';
    const _apiKey = 'f13a71220df98fb141b9f82700e7cbac';
    const _lang = 'ru';
    const limit = 10;
    

    const getPlaces = async (place) => {
        const data = await request(`${_apiBasePlace}q=${place}&limit=${limit}&appid=${_apiKey}`);
        return data.map(item => transformPlaces(item));
    }

    const getPlace = async (place = 'Moscow') => {
        const data = await request(`${_apiBasePlace}q=${place}&limit=1&appid=${_apiKey}`);
        return data.map(item => transformPlaces(item));
    }

    const getWeather = async (lat, lon) => {
        const weather = await request(`${_apiBaseWeather}lat=${lat}&lon=${lon}&appid=${_apiKey}&lang=${_lang}&units=metric`);
        // console.log(transformWeather(weather))
        return transformWeather(weather);
    }

    const transformPlaces = (item) => {
        return {
            lat: item.lat.toFixed(2),
            lon: item.lon.toFixed(2),
            city: item.name,
            state: item.state,
        }
    }

    const transformWeather = (data) => {
        const {name, main, sys, wind, weather, timezone} = data;

        return {
            city_name: name,
            cur_temp: main.temp.toFixed(),
            feels_like: main.feels_like.toFixed(),
            min_temp: main.temp_min.toFixed(),
            max_temp: main.temp_max.toFixed(),
            pressure: (main.pressure / 1.333223).toFixed(),
            humidity: main.humidity,
            sunrise: transformTime(sys.sunrise, timezone),
            sunset: transformTime(sys.sunset, timezone),
            main_descr: weather[0].main,
            description: weather[0].description,
            wind_speed: wind.speed.toFixed(),

        }
    }

    const transformTime = (time, timezone) => {
        const date = new Date(time * 1000 - timezone);
        return `${date.getHours()}:${date.getMinutes()}`;
    }

    return {getWeather, getPlaces, getPlace}

}

export default WeatherService;