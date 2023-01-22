import { useState, useCallback } from 'react';

import SearchForm from '../searchForm/SearchForm';
import WeatherInfo from '../weatherInfo/WeatherInfo';

import './App.scss';

function App() {

  const [place, setCity] = useState(null) //{lat: 55.75, lon: 37.62}

  const onCitySearched = useCallback((place) => {
    setCity(place)
  }, []);

  return (
    <div className="App">
      <SearchForm onCitySearched={onCitySearched}/>
      <WeatherInfo place={place}/>
    </div>
  );
}

export default App;
