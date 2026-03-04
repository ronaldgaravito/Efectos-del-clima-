function House({ currentWeather }) {
  const isSunny = currentWeather === 'sunny'
  const isDark = currentWeather === 'storm' || currentWeather === 'tornado'

  const windowClass = isSunny ? 'sunny-glow' : (isDark ? 'night-glow' : '')

  return (
    <div className="house">
      {/* Chimney */}
      <div className="chimney" />

      {/* Roof */}
      <div className="roof">
        <div className="roof-detail" />
      </div>

      {/* House body */}
      <div className="house-body">
        {/* Windows */}
        <div className={`window window-left ${windowClass}`} />
        <div className={`window window-right ${windowClass}`} />

        {/* Door */}
        <div className="door">
          <div className="door-knob" />
        </div>
      </div>
    </div>
  )
}

export default House
