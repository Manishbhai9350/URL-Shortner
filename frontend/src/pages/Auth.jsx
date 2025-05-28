import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import GridBackground from "../components/GridBackground";
import AxiosInstance from "../utils/axios.util";
import {login,logout} from '../store/slices/auth.slice'
import {useNavigate} from '@tanstack/react-router'

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError(null);
    setSuccess(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const endpoint = isLogin ? "/auth/login" : "/auth/register";

      const response = await AxiosInstance.post(endpoint, formData, {
        withCredentials: true,
      });

      if (response.data.success) {
        dispatch(login(response.data.user))
        navigate({to:'/dashboard'})
        setSuccess('')
      }
    } catch (err) {
      setError(
        err.response?.data?.error || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="dark px-4 pt-20 bg-gradient-bg text-white flex flex-col justify-start items-center min-h-screen w-screen">
      <GridBackground />

      <div
        className="headings z-20 relative w-full flex flex-col justify-between items-center"
        style={{ marginBottom: '32px' }}
      >
        <h1 className="text-[2.5rem] sm:text-[4rem] lg:text-[4rem] leading-none text-center">
          {isLogin ? "Welcome Back! 👋" : "Join Us Today! 🚀"}
        </h1>
        <h2
          className="text-[1.2rem] sm:text-[1.5rem] lg:text-[1.5rem] leading-none text-blue-400 text-center"
          style={{ marginTop: '16px' }}
        >
          {isLogin ? "Login to your account and start shortening" : "Create a new account and get started"}
        </h2>
      </div>

      <div
        className="auth-form z-20 bg-dark2/80 backdrop-blur-sm relative flex flex-col w-[95%] sm:w-[80%] md:w-[60%] lg:w-[40%] rounded-xl shadow-2xl border border-dark3/30"
        style={{
          gap: '24px',
          padding: '32px'
        }}
      >
        <form
          onSubmit={handleSubmit}
          className="flex flex-col"
          style={{ gap: '24px' }}
        >
          {!isLogin && (
            <div className="input-group">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-300"
                style={{ marginBottom: '12px' }}
              >
                👤 Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full rounded-lg bg-dark3/50 border border-dark3 focus:border-blue-500/50 text-white border-none outline-none text-lg placeholder-gray-400 transition-all duration-200"
                  style={{
                    height: '56px',
                    padding: '0 16px'
                  }}
                  placeholder="Enter your username"
                  required={!isLogin}
                />
              </div>
            </div>
          )}

          <div className="input-group">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300"
              style={{ marginBottom: '12px' }}
            >
              📧 Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-lg bg-dark3/50 border border-dark3 focus:border-blue-500/50 text-white border-none outline-none text-lg placeholder-gray-400 transition-all duration-200"
                style={{
                  height: '56px',
                  padding: '0 16px'
                }}
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300"
              style={{ marginBottom: '12px' }}
            >
              🔒 Password
            </label>
            <div className="relative">
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full rounded-lg bg-dark3/50 border border-dark3 focus:border-blue-500/50 text-white border-none outline-none text-lg placeholder-gray-400 transition-all duration-200"
                style={{
                  height: '56px',
                  padding: '0 16px'
                }}
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          {error && (
            <div
              className="error-message bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg text-sm flex items-center"
              style={{
                padding: '16px',
                gap: '12px'
              }}
            >
              <span className="text-lg">⚠️</span>
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div
              className="success-message bg-green-500/10 border border-green-500/30 text-green-400 rounded-lg text-sm flex items-center"
              style={{
                padding: '16px',
                gap: '12px'
              }}
            >
              <span className="text-lg">✅</span>
              <span>{success}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full rounded-lg text-lg font-semibold transition-all duration-200 shadow-lg ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 hover:shadow-blue-500/25 active:scale-[0.98]"
            }`}
            style={{ height: '56px' }}
          >
            {loading ? (
              <div
                className="flex items-center justify-center"
                style={{ gap: '8px' }}
              >
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Processing...
              </div>
            ) : (
              <div
                className="flex items-center justify-center"
                style={{ gap: '8px' }}
              >
                <span>{isLogin ? "🔑" : "🚀"}</span>
                {isLogin ? "Login to Account" : "Create Account"}
              </div>
            )}
          </button>

          <div
            className="text-center"
            style={{ marginTop: '24px' }}
          >
            <button
              type="button"
              onClick={toggleMode}
              className="text-blue-400 hover:text-blue-300 text-sm transition-colors font-medium rounded-lg hover:bg-blue-500/10"
              style={{ padding: '12px 16px' }}
            >
              {isLogin
                ? "Don't have an account? Sign up here 👆"
                : "Already have an account? Login here 👆"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Auth;
