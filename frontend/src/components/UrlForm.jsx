import React, { useState } from "react";
import { useSelector } from "react-redux";
import AxiosUtil from "../utils/axios.util";
import { useQueryClient } from "@tanstack/react-query";

const UrlForm = ({ Data, setData }) => {
  const [loading, setLoading] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [error, setError] = useState(null);
  const [customSlug, setCustomSlug] = useState("");
  const [useCustomSlug, setUseCustomSlug] = useState(false);

  const { isAuthenticated } = useSelector((state) => state.auth);

  const queryClient = useQueryClient()

  const handleShorten = async () => {
    if (!Data.fullUrl) {
      setError("Please enter a URL");
      return;
    }

    if (useCustomSlug && !customSlug.trim()) {
      setError("Please enter a custom slug");
      return;
    }

    

    try {
      setLoading(true);
      setError(null);

      let endpoint = "api/url";
      let payload = { url: Data.fullUrl };

      // Use custom endpoint if authenticated and custom slug is provided
      if (isAuthenticated && useCustomSlug && customSlug.trim()) {
        endpoint = "api/url/custom";
        payload.slug = customSlug.trim();
      }

      const response = await AxiosUtil.post(endpoint, payload);

      if (response.data.success) {
        const RedirectUrl = response.data.ShortUrl.redirect;
        setData((prev) => ({
          ...prev,
          shortUrl: response.data.ShortUrl.short,
          shortFull: response.data.ShortUrl.full,
        }));
        // Reset custom slug after successful creation
        setCustomSlug("");
        setUseCustomSlug(false);
        await queryClient.removeQueries(['user-urls'])
      } else {
        setError("Failed to shorten URL");
      }
    } catch (err) {
      setError(err.response?.data?.error || err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!Data.shortFull || copySuccess) return;

    navigator.clipboard
      .writeText(Data.shortFull)
      .then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      })
      .catch(() => {
        setError("Failed to copy to clipboard");
      });
  };

  return (
    <div
      className="Url-Form z-20 bg-dark2/80 backdrop-blur-sm relative flex flex-col w-[95%] lg:w-[70%] rounded-xl shadow-2xl border border-dark3/30"
      style={{
        gap: "32px",
        padding: "32px",
      }}
    >
      <div className="input-container">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Enter your long URL
        </label>
        <div className="input relative rounded-lg w-full bg-dark3/50 border border-dark3 focus-within:border-blue-500/50 transition-all duration-200">
          <input
            value={Data.fullUrl}
            onInput={(e) =>
              setData((prev) => ({ ...prev, fullUrl: e.target.value }))
            }
            style={{ paddingInline: 6 }}
            type="text"
            className="w-full h-14 px-4 text-lg border-none outline-none bg-transparent text-white placeholder-gray-400"
            placeholder="https://example.com/your-very-long-url"
          />
        </div>
      </div>

      {/* Custom URL Section for Authenticated Users */}
      {isAuthenticated && (
        <div
          className="custom-url-section bg-dark3/30 rounded-lg border border-dark3/50"
          style={{ padding: "24px" }}
        >
          <div
            className="flex items-center"
            style={{
              gap: "12px",
              marginBottom: "16px",
            }}
          >
            <input
              type="checkbox"
              id="useCustomSlug"
              checked={useCustomSlug}
              onChange={(e) => setUseCustomSlug(e.target.checked)}
              className={`
                appearance-none 
                w-6 h-6 
                rounded-md 
                bg-dark3 
                border-2 border-gray-600 
                checked:bg-blue-600 
                checked:border-blue-500 
                transition-all duration-200 
                cursor-pointer 
                relative 
                before:text-white 
                before:text-sm 
                before:absolute 
                before:top-0 before:left-[3px] 
                before:opacity-0 
                checked:before:opacity-100
              `}
            />

            <label
              htmlFor="useCustomSlug"
              className="text-white text-sm font-medium flex items-center"
              style={{ gap: "8px" }}
            >
              <span className="text-blue-400">✨</span>
              Create custom short URL
            </label>
          </div>

          {/* {useCustomSlug && ( */}
          <div className="custom-input-container">
            <label
              className="block text-xs font-medium text-gray-400"
              style={{ marginBottom: "8px" }}
            >
              Custom URL slug
            </label>
            <div
              className={`custom-input flex items-center rounded-lg border transition-all duration-200 ${
                useCustomSlug
                  ? "bg-dark3/50 border-dark3 focus-within:border-blue-500/50"
                  : "bg-dark3/20 border-dark3/30"
              }`}
            >
              <input
                disabled={!useCustomSlug}
                value={customSlug}
                onChange={(e) => setCustomSlug(e.target.value)}
                type="text"
                className={`flex-1 border-none outline-none bg-transparent text-lg transition-all duration-200 ${
                  useCustomSlug
                    ? "text-white placeholder-gray-400"
                    : "text-gray-600 placeholder-gray-600 cursor-not-allowed"
                }`}
                style={{
                  height: "48px",
                  padding: "0 12px",
                }}
                placeholder={
                  useCustomSlug ? "my-custom-link" : "Enable custom URL first"
                }
              />
            </div>
          </div>
          {/* )} */}
        </div>
      )}

      <button
        className={`shorten-button w-full h-14 rounded-lg font-semibold text-lg transition-all duration-200 shadow-lg ${
          loading
            ? "bg-blue-400 cursor-not-allowed"
            : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 hover:shadow-blue-500/25 active:scale-[0.98]"
        }`}
        onClick={handleShorten}
        disabled={loading}
      >
        {loading ? (
          <div className="flex items-center justify-center gap-2">
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            Shortening...
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2">
            <span>✂️</span>
            Shorten URL
          </div>
        )}
      </button>

      {error && (
        <div
          className="error-message bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg text-sm flex items-center"
          style={{
            padding: "16px",
            gap: "12px",
          }}
        >
          <span>⚠️</span>
          {error}
        </div>
      )}

      {Data.shortFull && (
        <div
          className="result-container bg-green-500/10 border border-green-500/30 rounded-lg"
          style={{ padding: "24px" }}
        >
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-green-400">🎉</span>
              <span className="text-green-400 font-medium text-sm">
                Your shortened URL is ready!
              </span>
            </div>

            <div className="result-input-container">
              <label className="block text-xs font-medium text-gray-400 mb-2">
                Shortened URL
              </label>
              <div className="input relative rounded-lg w-full bg-dark3/50 border border-dark3">
                <input
                  value={Data.shortFull}
                  readOnly
                  type="text"
                  className="w-full h-12 px-4 text-lg border-none outline-none bg-transparent text-white"
                />
              </div>
            </div>

            <button
              onClick={copyToClipboard}
              className={`copy-button w-full h-12 rounded-lg font-medium text-lg transition-all duration-200 shadow-lg ${
                copySuccess
                  ? "bg-green-500 text-white"
                  : "bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white hover:shadow-gray-500/25"
              }`}
            >
              {copySuccess ? (
                <div className="flex items-center justify-center gap-2">
                  <span>✅</span>
                  Copied to Clipboard!
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <span>📋</span>
                  Copy to Clipboard
                </div>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UrlForm;
