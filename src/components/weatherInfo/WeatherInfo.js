import { useState, useEffect } from "react";

import WeatherService from "../../services/WeatherService";

import './weatherInfo.scss'

const WeatherInfo = ({place}) => {
    const [weather, setWeather] = useState({});

    const {getWeather} = WeatherService();

    useEffect(() => {
        updateCity()
    }, [place])

    const updateCity = () => {
        if (!place) {
            return;
        }

        getWeather(place[0].lat, place[0].lon)
            .then(onCityLoaded)
    }

    const onCityLoaded = (data) => {
        console.log(data)
        setWeather(data)
    }
    


    return (
        <div className="weather_wrapper">
            <div className="weather_main">
                <span className="weather_main-deg">{weather.cur_temp}</span>
                <div className="weather_main-condition">
                    <div className="weather_main_condition-img">Соднышко</div>
                    <span className="weather_main_condition-max">{weather.max_temp}</span>
                    <span className="weather_main_condition-min">{weather.min_temp}</span>
                </div>
            </div>
            <div className="weather_title">
                <h1 className="weather_title-city">{weather.city_name}</h1>
                <h2 className="weather_title-time">Сейчас 16:40, Вторник</h2>
            </div>
            <div className="weather_descr">
                <span className="weather_descr-wind-speed">{weather.wind_speed} м/с</span>
                <span className="weather_descr-humidity">{weather.humidity}%</span>
                <span className="weather_descr-pressure">{weather.pressure} мм.рт.ст.</span>
            </div>
        </div>
    )
}

export default WeatherInfo;