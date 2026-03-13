import { useEffect, useState, useRef, useMemo } from 'react'
import House from './House'

function Scene({ currentWeather, weatherData }) {
  const [lightningFlash, setLightningFlash] = useState(false)
  const [lightningBolts, setLightningBolts] = useState([])
  const lightningInterval = useRef(null)

  // Generate raindrops — more drops, varied lengths for realism
  const raindrops = useMemo(() => {
    const count = currentWeather === 'storm' ? 280 : 160
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      height: `${20 + Math.random() * 45}px`,
      duration: `${0.35 + Math.random() * 0.35}s`,
      delay: `${Math.random() * 2.5}s`,
      opacity: 0.35 + Math.random() * 0.55,
      blur: Math.random() > 0.7 ? '0.6px' : '0px',
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

  // Generate birds (more and better positioned)
  const birds = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      id: i,
      top: `${5 + Math.random() * 30}%`,
      left: `${-5 + Math.random() * 80}%`,
      flapDelay: `${Math.random() * 0.3}s`,
      flyDuration: `${18 + Math.random() * 15}s`,
      flyDelay: `${i * 2.5}s`,
      scale: 0.7 + Math.random() * 0.6,
    }))
  }, [])

  // Generate butterflies
  const butterflies = useMemo(() => {
    const colors = [
      ['#ff6b6b', '#ff8e8e'], // red
      ['#ffd93d', '#ffe066'], // yellow
      ['#74b9ff', '#a8d8ff'], // blue
      ['#a29bfe', '#c8c3ff'], // purple
      ['#fd79a8', '#ff9fc3'], // pink
    ]
    return Array.from({ length: 4 }, (_, i) => ({
      id: i,
      left: `${15 + i * 20}%`,
      top: `${20 + Math.random() * 40}%`,
      color: colors[i % colors.length],
      duration: `${6 + Math.random() * 4}s`,
      delay: `${i * 1.5}s`,
      scale: 0.8 + Math.random() * 0.4,
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

  // Generate puddles with ripple rings
  const puddles = useMemo(() => [
    { id: 1, bottom: '19%', left: '12%',  width: '100px', height: '26px', ripples: [{ d: '2.8s', dl: '0s' }, { d: '2.8s', dl: '0.9s' }, { d: '2.8s', dl: '1.8s' }] },
    { id: 2, bottom: '13%', left: '52%',  width: '130px', height: '32px', ripples: [{ d: '3.2s', dl: '0s' }, { d: '3.2s', dl: '1.1s' }, { d: '3.2s', dl: '2.2s' }] },
    { id: 3, bottom: '23%', right: '18%', width: '80px',  height: '20px', ripples: [{ d: '2.5s', dl: '0s' }, { d: '2.5s', dl: '0.8s' }, { d: '2.5s', dl: '1.6s' }] },
    { id: 4, bottom: '10%', left: '35%',  width: '70px',  height: '17px', ripples: [{ d: '3s',   dl: '0s' }, { d: '3s',   dl: '1s'   }, { d: '3s',   dl: '2s'   }] },
  ], [])

  // Generate mist streaks for rain atmosphere
  const mistStreaks = useMemo(() => {
    return Array.from({ length: 6 }, (_, i) => ({
      id: i,
      top: `${20 + i * 10}%`,
      duration: `${8 + Math.random() * 6}s`,
      delay: `${i * 1.5}s`,
      opacity: 0.5 + Math.random() * 0.5,
    }))
  }, [])

  // Generate splashes at ground level
  const splashes = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: `${2 + Math.random() * 96}%`,
      duration: `${0.5 + Math.random() * 0.5}s`,
      delay: `${Math.random() * 3}s`,
    }))
  }, [])

  // Generate flowers
  const flowers = useMemo(() => {
    const colors = ['#ff6b6b', '#ffd93d', '#ff8e53', '#a8e6cf', '#ff6eb4', '#74b9ff', '#fd79a8']
    return Array.from({ length: 14 }, (_, i) => ({
      id: i,
      left: `${3 + i * 7}%`,
      color: colors[i % colors.length],
      delay: `${i * 0.3}s`,
    }))
  }, [])

  // Generate grass blades
  const grassBlades = useMemo(() => {
    return Array.from({ length: 60 }, (_, i) => ({
      id: i,
      left: `${(i / 60) * 100}%`,
      height: `${10 + Math.random() * 15}px`,
      delay: `${Math.random() * 3}s`,
    }))
  }, [])

  // Generate fence posts and rails
  const fencePosts = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      id: i,
      left: `${3 + i * 6}%`,
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
  const hillClass = isSnow ? 'snow-hill' : (isDark ? 'dark' : '')

  return (
    <main className="scene-container">
      {/* Sky */}
      <div className={`sky ${currentWeather}`} />

      {/* Ground */}
      <div className={`ground ${currentWeather} ${isEarthquake ? 'earthquake-shake' : ''}`} />

      {/* Hills (videogame parallax) */}
      <div className="hills-container">
        <div className={`hill hill-1 ${hillClass}`} />
        <div className={`hill hill-2 ${hillClass}`} />
        <div className={`hill hill-3 ${hillClass}`} />
      </div>

      {/* Weather Label */}
      <div className="weather-label">
        <span className="weather-label-icon">{weatherData?.icon}</span>
        <span className="weather-label-text">{weatherData?.name}</span>
      </div>

      {/* Sun (improved with face) */}
      <div className={`sun ${isSunny ? 'visible' : ''}`}>
        <div className="sun-face">
          <div className="sun-eye left" />
          <div className="sun-eye right" />
          <div className="sun-mouth" />
        </div>
        <div className="sun-rays">
          {Array.from({ length: 16 }, (_, i) => (
            <div
              key={i}
              className={`sun-ray ${i % 2 === 0 ? 'long' : ''}`}
              style={{ transform: `rotate(${i * 22.5}deg) translateY(60px)` }}
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

      {/* Birds (improved) */}
      <div className={`birds-container ${isSunny ? 'visible' : ''}`}>
        {birds.map((bird) => (
          <div
            key={bird.id}
            className="bird bird-fly"
            style={{
              top: bird.top,
              left: bird.left,
              animationDuration: bird.flyDuration,
              animationDelay: bird.flyDelay,
              transform: `scale(${bird.scale})`,
            }}
          >
            <div className="bird-body" />
            <div className="bird-wing left" style={{ animationDelay: bird.flapDelay }} />
            <div className="bird-wing right" style={{ animationDelay: bird.flapDelay }} />
          </div>
        ))}
      </div>

      {/* Butterflies (sunny only) */}
      <div className={`butterflies-container ${isSunny ? 'visible' : ''}`}>
        {butterflies.map((b) => (
          <div
            key={b.id}
            className="butterfly"
            style={{
              left: b.left,
              top: b.top,
              animationDuration: b.duration,
              animationDelay: b.delay,
              transform: `scale(${b.scale})`,
            }}
          >
            <div
              className="butterfly-wing left"
              style={{ background: b.color[0] }}
            />
            <div
              className="butterfly-wing right"
              style={{ background: b.color[1] }}
            />
          </div>
        ))}
      </div>

      {/* Grass blades (sunny) */}
      <div className={`grass-container ${isSunny ? 'visible' : ''}`}>
        {grassBlades.map((blade) => (
          <div
            key={blade.id}
            className="grass-blade"
            style={{
              left: blade.left,
              height: blade.height,
              animationDelay: blade.delay,
            }}
          />
        ))}
      </div>

      {/* Fence (sunny) */}
      <div className={`fence-container ${isSunny ? 'visible' : ''}`}>
        {fencePosts.map((post) => (
          <div key={post.id} className="fence-post" style={{ left: post.left }} />
        ))}
        <div className="fence-rail fence-rail-top" style={{ left: '3%', width: '45%' }} />
        <div className="fence-rail fence-rail-bottom" style={{ left: '3%', width: '45%' }} />
        <div className="fence-rail fence-rail-top" style={{ right: '3%', width: '30%' }} />
        <div className="fence-rail fence-rail-bottom" style={{ right: '3%', width: '30%' }} />
      </div>

      {/* Flowers (sunny) */}
      <div className={`flowers-container ${isSunny ? 'visible' : ''}`}>
        {flowers.map((flower) => (
          <div
            key={flower.id}
            className="flower"
            style={{ left: flower.left, animationDelay: flower.delay }}
          >
            <div className="flower-head" style={{ background: `radial-gradient(circle, ${flower.color}, ${flower.color}dd)` }} />
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
              filter: drop.blur !== '0px' ? `blur(${drop.blur})` : undefined,
            }}
          />
        ))}
      </div>

      {/* Atmospheric fog / mist layer */}
      <div className={`rain-mist ${isRainy ? 'visible' : ''}`} />

      {/* Drifting mist streaks */}
      <div className={`rain-mist-streaks ${isRainy ? 'visible' : ''}`}>
        {mistStreaks.map((streak) => (
          <div
            key={streak.id}
            className="mist-streak"
            style={{
              top: streak.top,
              animationDuration: streak.duration,
              animationDelay: streak.delay,
              opacity: streak.opacity,
            }}
          />
        ))}
      </div>

      {/* Puddles with ripple rings */}
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
          >
            {puddle.ripples.map((r, idx) => (
              <div
                key={idx}
                className="puddle-ripple"
                style={{
                  width: puddle.width,
                  height: puddle.height,
                  animationDuration: r.d,
                  animationDelay: r.dl,
                }}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Rain splashes at ground level */}
      <div className={`splash-container ${isRainy ? 'visible' : ''}`}>
        {splashes.map((s) => (
          <div
            key={s.id}
            className="splash"
            style={{
              left: s.left,
              animationDuration: s.duration,
              animationDelay: s.delay,
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

      {/* Trees (improved depth and variety) */}
      <div className={`tree tree-1 tree-lg ${treeClass}`}>
        <div className={`tree-leaves ${treeLeavesClass}`} />
        <div className="tree-trunk" />
      </div>
      <div className={`tree tree-2 tree-lg ${treeClass}`}>
        <div className={`tree-leaves ${treeLeavesClass}`} />
        <div className="tree-trunk" />
      </div>
      <div className={`tree tree-3 tree-sm ${treeClass}`}>
        <div className={`tree-leaves ${treeLeavesClass}`} />
        <div className="tree-trunk" />
      </div>
      <div className={`tree tree-4 tree-sm ${treeClass}`}>
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
