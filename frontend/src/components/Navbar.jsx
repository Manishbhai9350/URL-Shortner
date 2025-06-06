import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from '@tanstack/react-router'
import { useQueryClient } from '@tanstack/react-query';
import { logout } from '../store/slices/auth.slice'
import AxiosUtil from '../utils/axios.util'
import { FaUser, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa'
import { setUrlData } from '../store/slices/url.slice'

const Navbar = () => {
  const { isAuthenticated, user } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const queryClient = useQueryClient()

  const handleLogout = async () => {
    try {
      await AxiosUtil.get('/auth/logout')
      await queryClient.removeQueries(['current-user'])
      dispatch(logout())
      dispatch(setUrlData({userId:null,urls:[]}))
      navigate({ to: '/' })
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <nav style={{paddingInline:10}} className="fixed px-2 top-0 left-0 right-0 z-50 bg-dark2/95 backdrop-blur-sm border-b border-dark3/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <span className="text-sm sm:text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent group-hover:from-blue-300 group-hover:to-blue-500 transition-all duration-300">
              URL Shortener
            </span>
          </Link>

          {/* User Section */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                {/* User Info */}
                {/* <div
                  className="flex items-center bg-dark3/50 rounded-lg"
                  style={{
                    gap: '12px',
                    padding: '12px 16px'
                  }}
                >
                  <div className="w-9 h-9 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                    <FaUser className="text-white text-sm" />
                  </div>
                  <span className="text-white text-sm font-medium hidden sm:block">
                    {user?.username || user?.email?.split('@')[0]}
                  </span>
                </div> */}

                {/* Dashboard Link */}
                <Link
                  to="/dashboard"
                  className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded-lg transition-all duration-200 text-sm font-medium"
                  style={{ padding: '12px 20px' }}
                >
                  Dashboard
                </Link>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="flex items-center text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all duration-200 text-sm font-medium"
                  style={{
                    gap: '8px',
                    padding: '12px 20px'
                  }}
                >
                  <FaSignOutAlt className="text-xs" />
                  <span className="hidden sm:block">Logout</span>
                </button>
              </div>
            ) : (
              <Link
                to="/auth"
                className="flex items-center bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg transition-all duration-200 shadow-lg hover:shadow-blue-500/25 font-medium"
                style={{
                  gap: '8px',
                  padding: '12px 24px'
                }}
              >
                <FaSignInAlt className="text-sm" />
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
