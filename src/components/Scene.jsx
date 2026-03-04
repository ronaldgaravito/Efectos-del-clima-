import { useEffect, useState, useRef, useMemo } from 'react'
import House from './House'

function Scene({ currentWeather, weatherData }) {
  const [lightningFlash, setLightningFlash] = useState(false)
  const [lightningBolts, setLightningBolts] = useState([])
  const lightningInterval = useRef(null)

  // Generate raindrops
  const raindrops = useMemo(() => {
    const count = currentWeather === 'storm' ? 200 : 100
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      height: `${15 + Math.random() * 25}px`,
      duration: `${0.4 + Math.random() * 0.4}s`,
      delay: `${Math.random() * 2}s`,
      opacity: 0.3 + Math.random() * 0.5,
    }))
  }, [currentWeather])

  // Generate snowflakes
  const snowflakes = useMemo(() => {
    return Array.from({ length: 80 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: `${8 + Math.random() * 10}px`,
      duration: `${4 + Math.random() * 6}s`,
      delay: `${Math.random() * 5}s`,
      opacity: 0.5 + Math.random() * 0.5,
      symbol: ['❄', '❅', '❆', '•'][Math.floor(Math.random() * 4)],
    }))
  }, [])

  // Generate birds
  const birds = useMemo(() => {
    return Array.from({ length: 5 }, (_, i) => ({
      id: i,
      top: `${8 + Math.random() * 25}%`,
      left: `${10 + Math.random() * 70}%`,
      delay: `${i * 0.2}s`,
      duration: `${15 + Math.random() * 10}s`,
    }))
  }, [])

  // Generate tornado rings
  const tornadoRings = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      id: i,
      top: `${i * 8}%`,
      width: `${20 + i * 14}px`,
      height: `${10 + i * 5}px`,
      speed: `${0.6 + i * 0.08}s`,
      opacity: 0.3 + (i / 12) * 0.4,
    }))
  }, [])

  // Generate debris
  const debris = useMemo(() => {
    return Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: `${20 + Math.random() * 60}%`,
      top: `${20 + Math.random() * 50}%`,
      width: `${4 + Math.random() * 8}px`,
      height: `${2 + Math.random() * 4}px`,
      duration: `${1.5 + Math.random() * 2}s`,
      delay: `${Math.random() * 2}s`,
      color: ['#8B6914', '#6b3410', '#4a4a4a', '#8B4513'][Math.floor(Math.random() * 4)],
    }))
  }, [])

  // Generate dust particles
  const dustParticles = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: `${2 + Math.random() * 4}px`,
      duration: `${1 + Math.random() * 2}s`,
      delay: `${Math.random() * 2}s`,
    }))
  }, [])

  // Generate wind lines
  const windLines = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      id: i,
      top: `${10 + Math.random() * 50}%`,
      width: `${80 + Math.random() * 120}px`,
      duration: `${1 + Math.random() * 1.5}s`,
      delay: `${Math.random() * 2}s`,
    }))
  }, [])

  // Generate puddles
  const puddles = useMemo(() => {
    return [
      { id: 1, bottom: '20%', left: '15%', width: '80px', height: '20px' },
      { id: 2, bottom: '15%', left: '55%', width: '100px', height: '25px' },
      { id: 3, bottom: '25%', right: '20%', width: '60px', height: '15px' },
    ]
  }, [])

  // Generate flowers
  const flowers = useMemo(() => {
    const colors = ['#ff6b6b', '#ffd93d', '#ff8e53', '#a8e6cf', '#ff6eb4']
    return Array.from({ length: 10 }, (_, i) => ({
      id: i,
      left: `${5 + i * 10}%`,
      color: colors[i % colors.length],
    }))
  }, [])

  // Lightning effect for storms
  useEffect(() => {
    if (currentWeather === 'storm') {
      const triggerLightning = () => {
        setLightningFlash(true)
        setLightningBolts([{
          id: Date.now(),
          left: `${20 + Math.random() * 60}%`,
          top: '5%',
        }])
        
        setTimeout(() => setLightningFlash(false), 100)
        setTimeout(() => {
          setLightningFlash(true)
          setTimeout(() => setLightningFlash(false), 50)
        }, 200)
        setTimeout(() => setLightningBolts([]), 500)
      }

      lightningInterval.current = setInterval(triggerLightning, 3000 + Math.random() * 4000)
      
      return () => {
        clearInterval(lightningInterval.current)
        setLightningFlash(false)
        setLightningBolts([])
      }
    }
  }, [currentWeather])

  const isSunny = currentWeather === 'sunny'
  const isRainy = currentWeather === 'rain' || currentWeather === 'storm'
  const isStorm = currentWeather === 'storm'
  const isTornado = currentWeather === 'tornado'
  const isEarthquake = currentWeather === 'earthquake'
  const isSnow = currentWeather === 'snow'
  const isDark = isStorm || isTornado

  const treeClass = isTornado ? 'strong-wind' : (isStorm ? 'wind-blow' : '')
  const treeLeavesClass = isSnow ? 'snow-covered' : (isDark ? 'dark' : '')

  return (
    <main className="scene-container">
      {/* Sky */}
      <div className={`sky ${currentWeather}`} />

      {/* Ground */}
      <div className={`ground ${currentWeather} ${isEarthquake ? 'earthquake-shake' : ''}`} />

      {/* Weather Label */}
      <div className="weather-label">
        <span className="weather-label-icon">{weatherData?.icon}</span>
        <span className="weather-label-text">{weatherData?.name}</span>
      </div>

      {/* Sun */}
      <div className={`sun ${isSunny ? 'visible' : ''}`}>
        <div className="sun-rays">
          {Array.from({ length: 12 }, (_, i) => (
            <div
              key={i}
              className="sun-ray"
              style={{ transform: `rotate(${i * 30}deg)` }}
            />
          ))}
        </div>
      </div>

      {/* Clouds */}
      <div className={`cloud cloud-1 ${isSunny ? 'visible' : ''}`} />
      <div className={`cloud cloud-2 ${isSunny ? 'visible' : ''}`} />
      <div className={`cloud cloud-3 ${isSnow ? 'visible' : ''}`} />
      
      {/* Dark clouds for rain/storm */}
      <div className={`cloud cloud-1 ${isRainy ? 'visible dark' : ''}`} />
      <div className={`cloud cloud-2 ${isRainy ? 'visible dark' : ''}`} />
      <div className={`cloud cloud-3 ${isRainy ? 'visible dark' : ''}`} />
      
      {/* Storm clouds */}
      <div className={`cloud cloud-1 ${isStorm ? 'visible dark-storm' : ''}`} style={{ top: '5%' }} />
      <div className={`cloud cloud-2 ${isStorm ? 'visible dark-storm' : ''}`} style={{ top: '3%' }} />

      {/* Birds */}
      <div className={`birds-container ${isSunny ? 'visible' : ''}`}>
        {birds.map((bird) => (
          <div
            key={bird.id}
            className="bird"
            style={{
              top: bird.top,
              left: bird.left,
              animation: `cloudFloat ${bird.duration} linear infinite`,
              animationDelay: bird.delay,
            }}
          >
            <div className="bird-wing left" style={{ animationDelay: bird.delay }} />
            <div className="bird-wing right" style={{ animationDelay: bird.delay }} />
          </div>
        ))}
      </div>

      {/* Flowers (sunny) */}
      <div className={`flowers-container ${isSunny ? 'visible' : ''}`}>
        {flowers.map((flower) => (
          <div key={flower.id} className="flower" style={{ left: flower.left }}>
            <div className="flower-head" style={{ background: flower.color }} />
            <div className="flower-stem" />
          </div>
        ))}
      </div>

      {/* Rain */}
      <div className={`rain-container ${isRainy ? 'visible' : ''} ${isStorm ? 'heavy' : ''}`}>
        {raindrops.map((drop) => (
          <div
            key={drop.id}
            className="raindrop"
            style={{
              left: drop.left,
              height: drop.height,
              animationDuration: drop.duration,
              animationDelay: drop.delay,
              opacity: drop.opacity,
            }}
          />
        ))}
      </div>

      {/* Puddles */}
      <div className={`puddles-container ${isRainy ? 'visible' : ''}`}>
        {puddles.map((puddle) => (
          <div
            key={puddle.id}
            className="puddle"
            style={{
              bottom: puddle.bottom,
              left: puddle.left,
              right: puddle.right,
              width: puddle.width,
              height: puddle.height,
            }}
          />
        ))}
      </div>

      {/* Lightning */}
      {isStorm && (
        <>
          <div className={`lightning ${lightningFlash ? 'flash' : ''}`} />
          {lightningBolts.map((bolt) => (
            <div
              key={bolt.id}
              className="lightning-bolt visible"
              style={{ left: bolt.left, top: bolt.top }}
            />
          ))}
        </>
      )}

      {/* Snow */}
      <div className={`snow-container ${isSnow ? 'visible' : ''}`}>
        {snowflakes.map((flake) => (
          <span
            key={flake.id}
            className="snowflake"
            style={{
              left: flake.left,
              fontSize: flake.size,
              animationDuration: flake.duration,
              animationDelay: flake.delay,
              opacity: flake.opacity,
            }}
          >
            {flake.symbol}
          </span>
        ))}
      </div>
      <div className={`snow-ground ${isSnow ? 'visible' : ''}`} />

      {/* Tornado */}
      <div className={`tornado-container ${isTornado ? 'visible' : ''}`}>
        <div className="tornado-funnel">
          {tornadoRings.map((ring) => (
            <div
              key={ring.id}
              className="tornado-ring"
              style={{
                top: ring.top,
                width: ring.width,
                height: ring.height,
                animationDuration: ring.speed,
                opacity: ring.opacity,
              }}
            />
          ))}
        </div>
      </div>

      {/* Flying debris (tornado) */}
      <div className={`debris-container ${isTornado ? 'visible' : ''}`}>
        {debris.map((d) => (
          <div
            key={d.id}
            className="debris"
            style={{
              left: d.left,
              top: d.top,
              width: d.width,
              height: d.height,
              background: d.color,
              animationDuration: d.duration,
              animationDelay: d.delay,
            }}
          />
        ))}
      </div>

      {/* Wind lines (tornado + storm) */}
      <div className={`wind-lines ${isTornado || isStorm ? 'visible' : ''}`}>
        {windLines.map((line) => (
          <div
            key={line.id}
            className="wind-line"
            style={{
              top: line.top,
              width: line.width,
              animationDuration: line.duration,
              animationDelay: line.delay,
            }}
          />
        ))}
      </div>

      {/* Earthquake effects */}
      <div className={`earthquake-effects ${isEarthquake ? 'visible' : ''}`}>
        <div className="crack crack-1" />
        <div className="crack crack-2" />
        <div className="crack crack-3" />
      </div>

      {/* Dust (earthquake) */}
      <div className={`dust-container ${isEarthquake ? 'visible' : ''}`}>
        {dustParticles.map((dust) => (
          <div
            key={dust.id}
            className="dust-particle"
            style={{
              left: dust.left,
              width: dust.size,
              height: dust.size,
              animationDuration: dust.duration,
              animationDelay: dust.delay,
            }}
          />
        ))}
      </div>

      {/* Trees */}
      <div className={`tree tree-1 ${treeClass}`}>
        <div className={`tree-leaves ${treeLeavesClass}`} />
        <div className="tree-trunk" />
      </div>
      <div className={`tree tree-2 ${treeClass}`}>
        <div className={`tree-leaves ${treeLeavesClass}`} />
        <div className="tree-trunk" />
      </div>
      <div className={`tree tree-3 ${treeClass}`}>
        <div className={`tree-leaves ${treeLeavesClass}`} />
        <div className="tree-trunk" />
      </div>

      {/* House */}
      <div className={`house-container ${isTornado ? 'tornado-shake' : ''} ${isEarthquake ? 'earthquake-shake' : ''}`}>
        <House currentWeather={currentWeather} />
      </div>
    </main>
  )
}

export default Scene
