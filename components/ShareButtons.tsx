'use client'

import { useState } from 'react'

export default function ShareButtons() {
  const [showCopyAlert, setShowCopyAlert] = useState(false)
  const [showBookmarkAlert, setShowBookmarkAlert] = useState(false)
  const [showFeedbackInfo, setShowFeedbackInfo] = useState(false)

  const shareGame = () => {
    // 直接使用主域名
    const gameUrl = 'https://randgame.online'
    
    try {
      // 现代浏览器方法
      navigator.clipboard.writeText(gameUrl)
        .then(() => {
          setShowCopyAlert(true)
          setTimeout(() => setShowCopyAlert(false), 2000)
        })
        .catch(err => {
          fallbackCopyLink(gameUrl)
        })
    } catch (err) {
      fallbackCopyLink(gameUrl)
    }
  }
  
  const fallbackCopyLink = (text: string) => {
    const textArea = document.createElement('textarea')
    textArea.value = text
    textArea.style.position = 'fixed'
    textArea.style.opacity = '0'
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()
    
    try {
      document.execCommand('copy')
      setShowCopyAlert(true)
      setTimeout(() => setShowCopyAlert(false), 2000)
    } catch (err) {
      console.error('Copy failed', err)
      alert('Copy failed. Please manually copy: randgame.online')
    }
    
    document.body.removeChild(textArea)
  }
  
  const bookmarkGame = () => {
    setShowBookmarkAlert(true)
    setTimeout(() => setShowBookmarkAlert(false), 3000)
  }

  const toggleFeedbackInfo = () => {
    setShowFeedbackInfo(!showFeedbackInfo)
  }
  
  const copyFeedbackEmail = () => {
    const emailText = 'mantq@qq.com'
    
    try {
      navigator.clipboard.writeText(emailText)
        .then(() => {
          alert("Email address copied to clipboard!")
          setShowFeedbackInfo(false)
        })
        .catch(err => {
          fallbackCopy(emailText)
        })
    } catch (err) {
      fallbackCopy(emailText)
    }
  }
  
  const fallbackCopy = (text: string) => {
    const textArea = document.createElement('textarea')
    textArea.value = text
    textArea.style.position = 'fixed'
    textArea.style.opacity = '0'
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()
    
    try {
      document.execCommand('copy')
      alert("Email address copied to clipboard!")
      setShowFeedbackInfo(false)
    } catch (err) {
      console.error('Copy failed', err)
      alert('Copy failed. Please manually copy: mantq@qq.com')
    }
    
    document.body.removeChild(textArea)
  }

  return (
    <>
      {/* 桌面版分享按钮 - 在移动设备上隐藏 */}
      <div className="share-container flex md:flex-col gap-3 fixed left-4 top-1/2 transform -translate-y-1/2 hidden md:flex">
        <button 
          className="share-btn copy-btn"
          onClick={shareGame}
          title="Copy Link"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#6366F1">
            <path d="M16 1H4C2.9 1 2 1.9 2 3V17H4V3H16V1ZM19 5H8C6.9 5 6 5.9 6 7V21C6 22.1 6.9 23 8 23H19C20.1 23 21 22.1 21 21V7C21 5.9 20.1 5 19 5ZM19 21H8V7H19V21Z"/>
          </svg>
        </button>
        <button 
          className="share-btn bookmark-btn"
          onClick={bookmarkGame}
          title="Bookmark"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#FFC107">
            <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"/>
          </svg>
        </button>
        <button 
          className="share-btn feedback-btn"
          onClick={toggleFeedbackInfo}
          title="Feedback"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#4ADE80">
            <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
          </svg>
        </button>
      </div>

      {/* 移动端分享按钮 - 也隐藏 */}
      <div className="share-container flex gap-4 fixed left-1/2 bottom-4 transform -translate-x-1/2 hidden">
        <button 
          className="share-btn copy-btn"
          onClick={shareGame}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#6366F1">
            <path d="M16 1H4C2.9 1 2 1.9 2 3V17H4V3H16V1ZM19 5H8C6.9 5 6 5.9 6 7V21C6 22.1 6.9 23 8 23H19C20.1 23 21 22.1 21 21V7C21 5.9 20.1 5 19 5ZM19 21H8V7H19V21Z"/>
          </svg>
        </button>
        <button 
          className="share-btn bookmark-btn"
          onClick={bookmarkGame}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#FFC107">
            <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"/>
          </svg>
        </button>
        <button 
          className="share-btn feedback-btn"
          onClick={toggleFeedbackInfo}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#4ADE80">
            <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
          </svg>
        </button>
      </div>

      {/* 链接复制成功提示 */}
      {showCopyAlert && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-800 bg-opacity-90 text-white px-4 py-2 rounded-lg z-50 transition-opacity duration-300">
          Website link copied to clipboard!
        </div>
      )}

      {/* 收藏提示 */}
      {showBookmarkAlert && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-800 bg-opacity-90 text-white px-4 py-2 rounded-lg z-50 transition-opacity duration-300">
          {navigator.userAgent.indexOf('Mac') !== -1 ? 'Press Command+D to bookmark this page!' : 'Press Ctrl+D to bookmark this page!'}
        </div>
      )}

      {/* 反馈信息弹窗 */}
      {showFeedbackInfo && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex items-center justify-center z-50 transition-all duration-300">
          <div className="bg-opacity-90 bg-gray-900 p-6 rounded-xl border-l-4 border-orange-500 max-w-md mx-4 w-full">
            <h3 className="text-xl font-bold mb-4 text-white">Send Feedback</h3>
            <p className="mb-3 text-gray-100">Please send your feedback to the following email:</p>
            <div className="bg-gray-800 p-3 rounded flex items-center justify-between mb-5">
              <span className="text-orange-400 font-medium select-all">mantq@qq.com</span>
              <button onClick={copyFeedbackEmail} className="text-blue-400 hover:text-blue-300 text-sm">
                Copy
              </button>
            </div>
            <div className="flex justify-end">
              <button onClick={toggleFeedbackInfo} className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
} 