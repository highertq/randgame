'use client'

import { useState, useEffect } from 'react'

export default function CountdownTimer() {
  const [countdown, setCountdown] = useState('24:00:00')

  useEffect(() => {
    function updateCountdown() {
      try {
        // 获取当前时间
        const now = new Date()
        
        // 获取明天的午夜时间（美国东部时间）
        const etOptions = { timeZone: "America/New_York" }
        const etNow = new Date(now.toLocaleString('en-US', etOptions))
        
        // 设置东部时间的下一个午夜
        const etTomorrow = new Date(etNow)
        etTomorrow.setDate(etTomorrow.getDate() + 1)
        etTomorrow.setHours(0, 0, 0, 0)
        
        // 计算时差（毫秒）
        const diffMs = etTomorrow.getTime() - etNow.getTime()
        
        // 转换为小时、分钟和秒
        const hours = Math.floor(diffMs / (1000 * 60 * 60))
        const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((diffMs % (1000 * 60)) / 1000)
        
        // 确保显示正数
        const formattedHours = Math.max(0, hours)
        const formattedMinutes = Math.max(0, minutes)
        const formattedSeconds = Math.max(0, seconds)
        
        // 更新倒计时显示
        setCountdown(
          `${String(formattedHours).padStart(2, '0')}:${String(formattedMinutes).padStart(2, '0')}:${String(formattedSeconds).padStart(2, '0')}`
        )
      } catch (error) {
        console.error("Countdown error:", error)
        // 出错时显示默认值
        setCountdown("24:00:00")
      }
    }

    // 每秒更新倒计时
    const interval = setInterval(updateCountdown, 1000)
    updateCountdown() // 立即执行一次
    
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="countdown-container hidden md:block">
      <div className="countdown-label">Next Game Countdown</div>
      <div className="countdown-time" id="countdown">{countdown}</div>
    </div>
  )
} 