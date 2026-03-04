function House({ currentWeather }) {
  const isSunny = currentWeather === 'sunny'
  const isDark = currentWeather === 'storm' || currentWeather === 'tornado'
  const isSnow = currentWeather === 'snow'

  const windowClass = isSunny ? 'sunny-glow' : (isDark ? 'night-glow' : '')

  return (
    <div className="house">
      {/* Chimney - now inside roof wrapper for correct positioning */}
      <div className="roof-wrapper">
        <div className="chimney">
          <div className="chimney-top" />
          {/* Smoke for sunny/snow */}
          {(isSunny || isSnow) && (
            <div className="smoke-container">
              <div className="smoke smoke-1" />
              <div className="smoke smoke-2" />
              <div className="smoke smoke-3" />
            </div>
          )}
        </div>
        <div className="roof">
          <div className="roof-shadow" />
          <div className="roof-lines">
            <div className="roof-line" />
            <div className="roof-line" />
            <div className="roof-line" />
          </div>
        </div>
        <div className="roof-overhang" />
      </div>

      {/* House body */}
      <div className="house-body">
        {/* Brick texture */}
        <div className="brick-row brick-row-1">
          <div className="brick" /><div className="brick wide" /><div className="brick" />
        </div>
        <div className="brick-row brick-row-2">
          <div className="brick wide" /><div className="brick" /><div className="brick wide" />
        </div>
        <div className="brick-row brick-row-3">
          <div className="brick" /><div className="brick wide" /><div className="brick" />
        </div>

        {/* Windows */}
        <div className={`window window-left ${windowClass}`}>
          <div className="window-reflection" />
          <div className="window-sill" />
          {isSunny && <div className="window-flower-box">
            <div className="mini-flower red" />
            <div className="mini-flower yellow" />
            <div className="mini-flower red" />
          </div>}
        </div>
        <div className={`window window-right ${windowClass}`}>
          <div className="window-reflection" />
          <div className="window-sill" />
          {isSunny && <div className="window-flower-box">
            <div className="mini-flower yellow" />
            <div className="mini-flower red" />
            <div className="mini-flower yellow" />
          </div>}
        </div>

        {/* Door */}
        <div className="door">
          <div className="door-panel top" />
          <div className="door-panel bottom" />
          <div className="door-knob" />
        </div>

        {/* Door step */}
        <div className="door-step" />

        {/* House number */}
        <div className="house-number">42</div>

        {/* Lamp */}
        <div className="wall-lamp left-lamp">
          <div className={`lamp-light ${isDark ? 'on' : ''}`} />
        </div>
        <div className="wall-lamp right-lamp">
          <div className={`lamp-light ${isDark ? 'on' : ''}`} />
        </div>
      </div>

      {/* Foundation */}
      <div className="foundation" />

      {/* Pathway */}
      <div className="pathway">
        <div className="path-stone" style={{ left: '35%', bottom: '0' }} />
        <div className="path-stone" style={{ left: '25%', bottom: '18px' }} />
        <div className="path-stone" style={{ left: '40%', bottom: '36px' }} />
        <div className="path-stone" style={{ left: '30%', bottom: '54px' }} />
      </div>

      {/* Bushes at door sides */}
      <div className="bush bush-left">
        <div className="bush-circle c1" />
        <div className="bush-circle c2" />
        <div className="bush-circle c3" />
      </div>
      <div className="bush bush-right">
        <div className="bush-circle c1" />
        <div className="bush-circle c2" />
        <div className="bush-circle c3" />
      </div>

      {isSnow && <div className="roof-snow" />}
    </div>
  )
}

export default House
