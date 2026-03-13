import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Scene from './components/Scene'

const WEATHER_TYPES = [
  {
    id: 'sunny',
    name: 'Soleado',
    description: 'Día brillante y cálido',
    icon: '☀️',
  },
  {
    id: 'rain',
    name: 'Lluvia',
    description: 'Lluvia moderada',
    icon: '🌧️',
  },
  {
    id: 'storm',
    name: 'Tormenta',
    description: 'Rayos y truenos',
    icon: '⛈️',
  },
  {
    id: 'tornado',
    name: 'Tornado',
    description: 'Vientos destructivos',
    icon: '🌪️',
  },
  {
    id: 'earthquake',
    name: 'Terremoto',
    description: 'Movimiento sísmico',
    icon: '🌍',
  },
  {
    id: 'snow',
    name: 'Nieve',
    description: 'Nevada invernal',
    icon: '❄️',
  },
]

function App() {
  const [currentWeather, setCurrentWeather] = useState('sunny')

  return (
    <div className="app-container">
      <Sidebar
        weatherTypes={WEATHER_TYPES}
        currentWeather={currentWeather}
        onWeatherChange={setCurrentWeather}
      />
      <Scene
        currentWeather={currentWeather}
        weatherData={WEATHER_TYPES.find(w => w.id === currentWeather)}
      />
    </div>
  )
}

export default App
