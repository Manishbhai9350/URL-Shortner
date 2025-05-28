
import React from 'react'
import { useSelector } from 'react-redux'
import GridBackground from '../components/GridBackground'
import { Link } from '@tanstack/react-router'

const Dashboard = () => {
  const { user } = useSelector(state => state.auth)

  return (
    <main className="dark px-4 pt-20 bg-gradient-bg text-white flex flex-col justify-start items-center min-h-screen w-screen">
      <GridBackground />

      <div className="headings z-20 relative w-full flex flex-col justify-between items-center mb-8">
        <h1 className="text-[2.5rem] sm:text-[4rem] lg:text-[4rem] leading-none text-center">
          Welcome back, {user?.username || user?.email?.split('@')[0]}! 👋
        </h1>
        <h2 className="text-[1.2rem] opacity-60 sm:text-[1.5rem] lg:text-[1.5rem] leading-none text-blue-480 mt-4 text-center">
          📊 Your URL Dashboard & Analytics
        </h2>
      </div>

      <div
        className="dashboard-content z-20 bg-dark2/80 backdrop-blur-sm relative flex flex-col w-[95%] lg:w-[80%] rounded-xl shadow-2xl border border-dark3/30"
        style={{
          gap: '32px',
          padding: '32px'
        }}
      >
        <div className="stats-section">
          <h3
            className="text-2xl font-bold flex items-center"
            style={{
              gap: '8px',
              marginBottom: '24px'
            }}
          >
            <span>📈</span>
            Your Statistics
          </h3>
          <div
            className="grid grid-cols-3"
            style={{ gap: '12px' }}
          >
            <div
              className="stat-card bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30 rounded-lg hover:scale-105 transition-transform duration-200"
              style={{ padding: '16px' }}
            >
              <div
                className="flex items-center justify-between"
                style={{ marginBottom: '8px' }}
              >
                <h4 className="text-xs sm:text-sm font-semibold text-blue-400">Total URLs</h4>
                <span className="text-lg sm:text-xl">🔗</span>
              </div>
              <p
                className="text-xl sm:text-2xl font-bold text-white"
                style={{ marginBottom: '2px' }}
              >
                0
              </p>
              <p className="text-xs text-gray-400 hidden sm:block">Links created</p>
            </div>
            <div
              className="stat-card bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-500/30 rounded-lg hover:scale-105 transition-transform duration-200"
              style={{ padding: '16px' }}
            >
              <div
                className="flex items-center justify-between"
                style={{ marginBottom: '8px' }}
              >
                <h4 className="text-xs sm:text-sm font-semibold text-green-400">Total Clicks</h4>
                <span className="text-lg sm:text-xl">👆</span>
              </div>
              <p
                className="text-xl sm:text-2xl font-bold text-white"
                style={{ marginBottom: '2px' }}
              >
                0
              </p>
              <p className="text-xs text-gray-400 hidden sm:block">Times clicked</p>
            </div>
            <div
              className="stat-card bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-500/30 rounded-lg hover:scale-105 transition-transform duration-200"
              style={{ padding: '16px' }}
            >
              <div
                className="flex items-center justify-between"
                style={{ marginBottom: '8px' }}
              >
                <h4 className="text-xs sm:text-sm font-semibold text-purple-400">Custom URLs</h4>
                <span className="text-lg sm:text-xl">✨</span>
              </div>
              <p
                className="text-xl sm:text-2xl font-bold text-white"
                style={{ marginBottom: '2px' }}
              >
                0
              </p>
              <p className="text-xs text-gray-400 hidden sm:block">Custom links</p>
            </div>
          </div>
        </div>

        <div className="recent-urls-section">
          <h3
            className="text-2xl font-bold flex items-center"
            style={{
              gap: '8px',
              marginBottom: '24px'
            }}
          >
            <span>🕒</span>
            Recent URLs
          </h3>
          <div
            className="bg-dark3/50 border border-dark3/50 rounded-xl text-center"
            style={{ padding: '32px' }}
          >
            <div
              className="flex flex-col items-center"
              style={{ gap: '16px' }}
            >
              <span className="text-6xl">🔗</span>
              <p className="text-gray-400 text-lg">No URLs created yet</p>
              <p className="text-gray-500 text-sm">Start shortening some links to see them here!</p>
              <Link
                to="/"
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-blue-500/25"
                style={{
                  marginTop: '16px',
                  padding: '12px 24px'
                }}
              >
                Create Your First Link
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Dashboard