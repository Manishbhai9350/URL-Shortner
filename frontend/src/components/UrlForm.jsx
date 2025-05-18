import React, { useState } from "react";
import axios from "axios";
import AxiosUtil from "../utils/axios.util";

const UrlForm = ({ Data, setData }) => {
  const [loading, setLoading] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleShorten = async () => {
    if (!Data.fullUrl) {
      setError("Please enter a URL");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await AxiosUtil.post(`api/url`, {
        url: Data.fullUrl,
      });

      if (response.data.success) {
        const RedirectUrl = response.data.ShortUrl.redirect;
        setData((prev) => ({
          ...prev,
          shortUrl: response.data.ShortUrl.short,
          shortFull: RedirectUrl,
        }));
      } else {
        setError("Failed to shorten URL");
      }
    } catch (err) {
      setError(err.message || "An error occurred");
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
    <div className="Url-Form z-20 bg-dark2 relative sm:gap-4 gap-4 flex flex-col w-[95%] lg:w-[70%] rounded-sm p-4">
      <div className="input rounded-sm w-full p-2 px-4 h-12 flex bg-dark3 text-white">
        <input
          value={Data.fullUrl}
          onInput={(e) =>
            setData((prev) => ({ ...prev, fullUrl: e.target.value }))
          }
          type="text"
          style={{
            paddingInline: 10,
          }}
          className="w-full h-full text-2xl border-none outline-none bg-transparent"
          placeholder="https://example.com"
        />
      </div>

      <div
        className={`button cursor-pointer rounded-sm w-full h-12 ${
          loading ? "bg-blue-400" : "bg-blue-500"
        } transition-colors duration-150`}
        onClick={handleShorten}
      >
        <button
          className="w-full cursor-pointer h-full border-none outline-none text-2xl text-semibold"
          disabled={loading}
        >
          {loading ? "Shortening..." : "Shorten"}
        </button>
      </div>

      {error && (
        <div className="error-message text-red-500 mt-2 text-sm">{error}</div>
      )}

      {Data.shortFull && (
        <div className="result-container mt-4 flex flex-col gap-2">
          <div className="flex flex-col items-center gap-2">
            <div style={{paddingInline:10}} className="input rounded-sm w-full p-2 h-12 flex bg-dark3 text-white">
              <input
                value={Data.shortFull}
                readOnly
                type="text"
                className="w-full h-full text-xl border-none outline-none bg-transparent"
                placeholder="https://example.com"
              />
            </div>

            <button
              onClick={copyToClipboard}
              className={`copy-button cursor-pointer p-2 h-12 text-2xl w-full rounded-sm transition-colors duration-150 ${
                copySuccess ? "bg-green-500" : "bg-blue-500"
              }`}
            >
              {copySuccess ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UrlForm;
