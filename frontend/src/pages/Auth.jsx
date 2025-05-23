import React, { useState } from "react";
import GridBackground from "../components/GridBackground";
import AxiosInstance from "../utils/axios.util";

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
        setSuccess(isLogin ? "Login successful!" : "Registration successful!");
        // You could redirect the user or update app state here
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
    <main className="dark  bg-gradient-bg text-white flex flex-col justify-start items-center h-screen w-screen">
      <GridBackground />

      <div className="headings z-20 relative w-full flex flex-col justify-between items-center mb-8">
        <h1 className="text-[2.5rem] sm:text-[4rem] lg:text-[4rem] leading-none">
          {isLogin ? "Welcome Back" : "Join Us Today"}
        </h1>
        <h2 className="text-[1.5rem] sm:text-[2rem] lg:text-[2rem] leading-none text-blue-400 mt-2">
          {isLogin ? "Login to your account" : "Create a new account"}
        </h2>
      </div>

      <div className="auth-form z-20 bg-dark2 relative sm:gap-4 gap-4 flex flex-col w-[95%] sm:w-[80%] md:w-[60%] lg:w-[40%] rounded-md p-6">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {!isLogin && (
            <div className="input-group">
              <label
                htmlFor="username"
                className="block text-sm font-medium mb-2"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                style={{ paddingInline: 16 }}
                className="w-full h-12 px-4 rounded-sm bg-dark3 text-white border-none outline-none text-lg"
                placeholder="johndoe"
                required={!isLogin}
              />
            </div>
          )}

          <div className="input-group">
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={{ paddingInline: 16 }}
              className="w-full h-12 px-4 rounded-sm bg-dark3 text-white border-none outline-none text-lg"
              placeholder="john@example.com"
              required
            />
          </div>

          <div className="input-group">
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              style={{ paddingInline: 16 }}
              className="w-full h-12 px-4 rounded-sm bg-dark3 text-white border-none outline-none text-lg"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <div className="error-message text-red-500 text-sm mt-2">
              {error}
            </div>
          )}

          {success && (
            <div className="success-message text-green-500 text-sm mt-2">
              {success}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full cursor-pointer h-12 rounded-sm text-lg font-medium transition-colors duration-150 ${
              loading ? "bg-blue-400" : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {loading ? "Processing..." : isLogin ? "Login" : "Sign Up"}
          </button>

          <div className="text-center mt-4">
            <button
              type="button"
              onClick={toggleMode}
              className="text-blue-400 hover:text-blue-300 text-sm transition-colors"
            >
              {isLogin
                ? "Don't have an account? Sign up"
                : "Already have an account? Login"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Auth;
