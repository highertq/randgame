import { createClient } from '@supabase/supabase-js'
import CountdownTimer from '@/components/CountdownTimer'
import ShareButtons from '@/components/ShareButtons'
import StressMeter from '@/components/StressMeter'

// 定义游戏控制类型
type GameControl = {
  label: string
  action: string
}

// 定义游戏类型
type Game = {
  id: string
  title: string
  slug: string
  description: string | null
  embed_url: string
  controls: GameControl[]
  strategy_tips: string | null
  difficulty: number
  featured_date: string
  created_at: string
}

// 创建 Supabase 客户端
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

async function getTodayGame() {
  const today = new Date().toISOString().split('T')[0]
  
  // 调试用 - 检查查询参数
  console.log("Fetching game for date:", today)
  
  const { data, error } = await supabase
    .from('games')
    .select('*')
    .eq('featured_date', today)
    .single()
    
  if (error) {
    console.error('Error fetching game:', error)
    return null
  }
  
  // 调试用 - 检查返回值
  console.log("Retrieved game data:", data)
  
  return data as Game
}

export default async function Home() {
  const game = await getTodayGame()
  
  if (!game) {
    return (
      <div className="ripple-bg min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">
          没有可用的游戏。请检查数据库。
        </div>
      </div>
    )
  }

  return (
    <main className="ripple-bg min-h-screen">
      <div className="parallax-bg" id="parallaxBg"></div>
      
      <CountdownTimer />
      
      <StressMeter />
      
      <ShareButtons />
      
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <header className="text-center mb-8">
          <div className="daily-highlight animate-pulse">
            <span className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-5 py-2 rounded-full font-bold shadow-lg">
              <span className="mr-2">🔧</span>TODAY'S GAME<span className="ml-2">🔧</span>
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">{game.title}</h1>
          <p className="text-xl header-subtitle mb-3">{game.description}</p>
          <p className="slacker-motto">
            <span>✨ <a href={`/${game.slug}`}>#{game.slug}</a> ✨</span>
          </p>
        </header>

        {/* Game container */}
        <div className="game-container relative mb-8 px-0">
          <div className="game-reveal crt-effect w-full rounded-lg shadow-2xl relative">
            <iframe 
              src={game.embed_url}
              className="w-full aspect-video"
              allowFullScreen
            />
          </div>
          
          {/* Difficulty display */}
          <div className="mt-4">
            <div className="difficulty-label">
              <span>Difficulty Level</span>
              <span>{game.difficulty} / 5</span>
            </div>
            <div className="difficulty-meter">
              <div 
                className="difficulty-level"
                style={{ width: `${(game.difficulty / 5) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Game Controls */}
          <div className="content-card rounded-xl p-6 shadow-md col-span-1">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 border-b border-gray-200 pb-2">Game Controls</h2>
            <div className="grid grid-cols-1 gap-3">
              {game.controls && game.controls.map((control, index) => (
                <div key={index} className="control-item p-3 mb-3">
                  <p>
                    <span className="control-label text-orange-500">{control.label}:</span>
                    <span className="control-action ml-2">{control.action}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Strategy Tips */}
          <div className="content-card rounded-xl p-6 shadow-md col-span-2">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 border-b border-gray-200 pb-2">Strategy Tips</h2>
            <div className="prose max-w-none">
              <p className="mb-4">{game.strategy_tips}</p>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="content-card rounded-xl p-6 shadow-md mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 border-b border-gray-200 pb-2">About Daily Random Game</h2>
          <div className="prose max-w-none">
            <p className="mb-4">Daily Random Game is a casual gaming platform designed for busy professionals and students. We understand that during intense work and study periods, a fun game can help you relax and relieve stress.</p>
            <p className="mb-4">Our unique feature is: <strong>one carefully selected game updated daily</strong>. No need to struggle with choosing which game to play - simply visit our website to experience the day's recommended exciting game.</p>
          </div>
        </div>

        <footer className="mt-12 text-center text-gray-600 text-sm">
          <p>© 2025 randgame.online - All Rights Reserved</p>
          <p className="mt-2">Daily Random Game is for entertainment purposes only</p>
        </footer>
      </div>
    </main>
  )
}