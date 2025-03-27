'use client'

import { useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

// 创建 Supabase 客户端
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

export default function GameRefresher() {
  useEffect(() => {
    async function refreshGame() {
      try {
        const today = new Date().toISOString().split('T')[0]
        
        console.log("客户端刷新日期为以下的游戏:", today)
        
        const { data, error } = await supabase
          .from('games')
          .select('*')
          .eq('featured_date', today)
          .single()
          
        if (error) {
          console.error('刷新游戏数据出错:', error)
          return
        }
        
        console.log("客户端刷新获取到的游戏数据:", data)
        
        // 如果数据与页面上显示的不同，强制刷新页面
        const currentTitle = document.querySelector('h1')?.textContent
        if (data && currentTitle && data.title !== currentTitle) {
          console.log("检测到数据更新，正在刷新页面...")
          window.location.reload()
        }
      } catch (err) {
        console.error("刷新游戏时发生错误:", err)
      }
    }

    // 首次运行
    setTimeout(refreshGame, 5000)
    
    // 每60秒检查一次更新
    const intervalId = setInterval(refreshGame, 60000)
    
    return () => clearInterval(intervalId)
  }, [])

  // 这个组件不渲染任何可见内容
  return null
} 