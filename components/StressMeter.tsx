'use client'

import { useState, useEffect } from 'react'

export default function StressMeter() {
  const [stressLevel, setStressLevel] = useState(80)
  const [gamePlayTime, setGamePlayTime] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setGamePlayTime(prev => prev + 1)
      
      // 每15秒降低5%的压力，最低到20%
      if (gamePlayTime % 15 === 0 && stressLevel > 20) {
        setStressLevel(prev => prev - 5)
      }
    }, 1000)
    
    return () => clearInterval(interval)
  }, [gamePlayTime, stressLevel])

  return (
    <div className="stress-meter-container hidden md:block">
      <div className="new-tag">NEW</div>
      <div className="stress-text">GAMING STRESS</div>
      <div className="stress-meter">
        <div className="stress-level" style={{ height: `${stressLevel}%` }}></div>
      </div>
    </div>
  )
} 