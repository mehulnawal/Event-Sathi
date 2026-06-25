"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { setAdminToken, getAdminToken } from "../adminAuth";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (getAdminToken()) router.replace("/admin/dashboard");
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Invalid credentials");
      setAdminToken(data.token, data.username);
      router.replace("/admin/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F0E8] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo / Brand */}
        <div className="text-center mb-8">
          <h1
            className="text-3xl font-bold text-[#7B1223]"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            EventSathi
          </h1>
          <p className="text-sm text-[#8C7B6B] mt-1">Admin Portal</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-[#C9973A]/20 p-8">
          <h2 className="text-lg font-bold text-[#1C1C1C] mb-6">Sign In</h2>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#8C7B6B] uppercase tracking-wider mb-1.5">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
                className="w-full px-3 py-2.5 text-sm border border-[#C9973A]/30 rounded-lg bg-[#FDFAF5] focus:outline-none focus:border-[#7B1223] transition-colors text-[#1C1C1C]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#8C7B6B] uppercase tracking-wider mb-1.5">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="w-full px-3 py-2.5 text-sm border border-[#C9973A]/30 rounded-lg bg-[#FDFAF5] focus:outline-none focus:border-[#7B1223] transition-colors text-[#1C1C1C]"
              />
            </div>

            {error && (
              <p className="text-xs text-[#D94F3D] font-semibold">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#7B1223] text-[#F5F0E8] py-3 rounded-full text-sm font-bold uppercase tracking-wider border border-[#C9973A] hover:bg-[#C9973A] hover:text-[#7B1223] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
