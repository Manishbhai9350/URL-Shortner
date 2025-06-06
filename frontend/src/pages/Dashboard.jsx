import { useEffect, useMemo, useReducer } from "react";
import { useSelector } from "react-redux";
import GridBackground from "../components/GridBackground";
import { Link } from "@tanstack/react-router";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const { urls } = useSelector((state) => state.urls);

  const TotalClicks = useMemo(() => {
    if (!urls || urls.length == 0) return 0;
    return urls.reduce((p, c, i) => p + c.click, 0);
  }, [urls]);

  return (
    <main className="dark px-4 pt-20 bg-gradient-bg text-white flex flex-col justify-start items-center min-h-screen w-screen">
      <GridBackground />

      <div className="headings z-20 relative w-full flex flex-col justify-between items-center mb-8">
        <h1 className="text-[2.5rem] sm:text-[4rem] lg:text-[4rem] leading-none text-center">
          Welcome back, {user?.username || user?.email?.split("@")[0]}! 👋
        </h1>
        <h2 className="text-[1.2rem] opacity-60 sm:text-[1.5rem] lg:text-[1.5rem] leading-none text-blue-480 mt-4 text-center">
          📊 Your URL Dashboard & Analytics
        </h2>
      </div>

      <div
        className="dashboard-content z-20 bg-dark2/80 backdrop-blur-sm relative flex flex-col w-[95%] lg:w-[80%] rounded-xl shadow-2xl border border-dark3/30"
        style={{
          gap: "32px",
          padding: "5px",
        }}
      >
        <div className="stats-section">
          <h3
            className="text-2xl font-bold flex items-center"
            style={{
              gap: "8px",
              marginBottom: "24px",
            }}
          >
            <span>📈</span>
            Your Statistics
          </h3>
          <div className="grid grid-cols-2" style={{ gap: "32px" }}>
            <div
              className="stat-card bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30 rounded-lg hover:scale-105 transition-transform duration-200"
              style={{ padding: "16px" }}
            >
              <div
                className="flex items-center justify-between"
                style={{ marginBottom: "8px" }}
              >
                <h4 className="text-xs sm:text-sm font-semibold text-blue-400">
                  Total URLs
                </h4>
                <span className="text-lg sm:text-xl">🔗</span>
              </div>
              <p
                className="text-xl sm:text-2xl font-bold text-white"
                style={{ marginBottom: "2px" }}
              >
                {urls?.length || 0}
              </p>
              <p className="text-xs text-gray-400 hidden sm:block">
                Links created
              </p>
            </div>
            <div
              className="stat-card bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-500/30 rounded-lg hover:scale-105 transition-transform duration-200"
              style={{ padding: "16px" }}
            >
              <div
                className="flex items-center justify-between"
                style={{ marginBottom: "8px" }}
              >
                <h4 className="text-xs sm:text-sm font-semibold text-green-400">
                  Total Clicks
                </h4>
                <span className="text-lg sm:text-xl">👆</span>
              </div>
              <p
                className="text-xl sm:text-2xl font-bold text-white"
                style={{ marginBottom: "2px" }}
              >
                {TotalClicks}
              </p>
              <p className="text-xs text-gray-400 hidden sm:block">
                Times clicked
              </p>
            </div>
          </div>
        </div>

        <div className="recent-urls-section">
          <h3
            className="text-2xl font-bold flex items-center"
            style={{
              gap: "8px",
              marginBottom: "24px",
            }}
          >
            <span>🕒</span>
            Recent URLs
          </h3>
          {!urls || urls.length == 0 ? (
            <div
              className="bg-dark3/50 border border-dark3/50 rounded-xl text-center"
              style={{ padding: "32px" }}
            >
              <div
                className="flex flex-col items-center"
                style={{ gap: "16px" }}
              >
                <span className="text-6xl">🔗</span>
                <p className="text-gray-400 text-lg">No URLs created yet</p>
                <p className="text-gray-500 text-sm">
                  Start shortening some links to see them here!
                </p>
                <Link
                  to="/"
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-blue-500/25"
                  style={{
                    marginTop: "16px",
                    padding: "12px 24px",
                  }}
                >
                  Create Your First Link
                </Link>
              </div>
            </div>
          ) : (
            <div style={{ padding: "1rem" }}>
              {/* Desktop Table */}
              <div className="hidden sm:block overflow-x-auto">
                <table className="min-w-full table-auto border-collapse rounded-lg overflow-hidden">
                  <thead className="bg-[#0f172a] text-gray-300 text-sm uppercase tracking-wider">
                    <tr>
                      <th style={{ padding: "12px 16px", textAlign: "left" }}>
                        Short (Full URL)
                      </th>
                      <th style={{ padding: "12px 16px", textAlign: "left" }}>
                        Redirect To
                      </th>
                      <th style={{ padding: "12px 16px", textAlign: "left" }}>
                        Clicks
                      </th>
                      <th style={{ padding: "12px 16px", textAlign: "left" }}>
                        Slug
                      </th>
                      <th style={{ padding: "12px 16px", textAlign: "left" }}>
                        View
                      </th>
                    </tr>
                  </thead>

                  <tbody className="bg-[#1e293b] divide-y divide-[#334155]">
                    {urls.length === 0 ? (
                      <tr>
                        <td
                          colSpan="5"
                          style={{
                            padding: "16px",
                            textAlign: "center",
                            color: "#94a3b8",
                          }}
                        >
                          No URLs found.
                        </td>
                      </tr>
                    ) : (
                      urls.map((url) => (
                        <tr
                          key={url._id}
                          className="hover:bg-[#2c3e50] transition"
                        >
                          <td style={{ padding: "12px 16px" }}>
                            <a
                              href={url.full}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                color: "#60a5fa",
                                wordBreak: "break-all",
                                textDecoration: "underline",
                              }}
                            >
                              {url.full}
                            </a>
                          </td>
                          <td
                            style={{
                              padding: "12px 16px",
                              color: "#d1d5db",
                              wordBreak: "break-all",
                            }}
                          >
                            <a
                              href={url.redirect}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                color: "#60a5fa",
                                textDecoration: "underline",
                              }}
                            >
                              {url.redirect}
                            </a>
                          </td>
                          <td
                            style={{ padding: "12px 16px", color: "#d1d5db" }}
                          >
                            {url.click}
                          </td>
                          <td
                            style={{ padding: "12px 16px", color: "#d1d5db" }}
                          >
                            {url.short}
                          </td>
                          <td style={{ padding: "12px 16px" }}>
                            <a
                              href={url.full}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                color: "#3b82f6",
                                fontWeight: "600",
                                textDecoration: "underline",
                              }}
                            >
                              View
                            </a>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="sm:hidden space-y-4 mt-4">
                {urls.length === 0 ? (
                  <p className="text-center text-gray-400">No URLs found.</p>
                ) : (
                  urls.map((url) => (
                    <div
                      key={url._id}
                      className="bg-[#1e293b] border border-[#334155] rounded-lg p-4 shadow-sm"
                    >
                      <p className="text-sm text-gray-400">
                        <span className="font-medium text-gray-300">
                          Short (Full):{" "}
                        </span>
                        <a
                          href={url.full}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 underline break-all"
                        >
                          {url.full}
                        </a>
                      </p>
                      <p className="text-sm text-gray-400 mt-1">
                        <span className="font-medium text-gray-300">
                          Redirect To:{" "}
                        </span>
                        <a
                          href={url.redirect}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 underline break-all"
                        >
                          {url.redirect}
                        </a>
                      </p>
                      <p className="text-sm text-gray-400 mt-1">
                        <span className="font-medium text-gray-300">
                          Clicks:
                        </span>{" "}
                        {url.click}
                      </p>
                      <p className="text-sm text-gray-400 mt-1">
                        <span className="font-medium text-gray-300">Slug:</span>{" "}
                        {url.short}
                      </p>
                      <p className="text-sm text-blue-400 mt-2 underline">
                        <a
                          href={url.full}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View
                        </a>
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
