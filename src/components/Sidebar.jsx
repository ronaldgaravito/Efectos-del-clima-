function Sidebar({ weatherTypes, currentWeather, onWeatherChange }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1>🏠 ClimaCasa</h1>
        <p>Simulador de efectos climáticos</p>
      </div>

      <nav className="sidebar-menu">
        {weatherTypes.map((weather) => (
          <div
            key={weather.id}
            className={`menu-item ${currentWeather === weather.id ? 'active' : ''}`}
            data-weather={weather.id}
            onClick={() => onWeatherChange(weather.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                onWeatherChange(weather.id)
              }
            }}
          >
            <div className={`menu-icon ${weather.id}`}>
              {weather.icon}
            </div>
            <div className="menu-text">
              <h3>{weather.name}</h3>
              <p>{weather.description}</p>
            </div>
          </div>
        ))}
      </nav>

      <div className="sidebar-footer">
        <p>Ronald Garavito © 2026</p>
      </div>
    </aside>
  )
}

export default Sidebar
