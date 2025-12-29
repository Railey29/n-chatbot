"use client";
import { supabase } from "../lib/supabaseClient";
import { useState, useEffect } from "react";

export default function DebugPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [sessionInfo, setSessionInfo] = useState<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [userInfo, setUserInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    checkAuth();
  }, []);

  const checkAuth = async () => {
    setLoading(true);

    const { data: sessionData, error: sessionError } =
      await supabase.auth.getSession();
    const { data: userData, error: userError } = await supabase.auth.getUser();

    console.log("=== SESSION DATA ===", sessionData, "Error:", sessionError);
    console.log("=== USER DATA ===", userData, "Error:", userError);

    setSessionInfo(sessionData);
    setUserInfo(userData);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 text-black">
      <div className="max-w-5xl mx-auto space-y-6">
        <h1 className="text-2xl md:text-3xl font-bold text-center md:text-left mb-4">
          🔍 Supabase Auth Debug
        </h1>

        <div className="flex justify-center md:justify-start">
          <button
            onClick={checkAuth}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            🔄 Refresh Auth Status
          </button>
        </div>

        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : (
          <div className="flex flex-col md:flex-row gap-6">
            {/* Session Info */}
            <div className="flex-1 bg-white rounded-lg shadow p-4 md:p-6">
              <h2 className="text-lg md:text-xl font-semibold mb-4 flex items-center gap-2">
                📋 Session Info
              </h2>

              <div className="space-y-2 text-sm md:text-base">
                <div className="flex justify-between">
                  <span>Has Session:</span>
                  <span
                    className={
                      sessionInfo?.session ? "text-black" : "text-black"
                    }
                  >
                    {sessionInfo?.session ? "✅ YES" : "❌ NO"}
                  </span>
                </div>

                {sessionInfo?.session && (
                  <>
                    <div>
                      <span className="font-semibold">Access Token:</span>
                      <p className="text-xs md:text-sm break-all mt-1">
                        {sessionInfo.session.access_token.substring(0, 50)}...
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <span>Expires At:</span>
                      <span>
                        {new Date(
                          sessionInfo.session.expires_at * 1000
                        ).toLocaleString()}
                      </span>
                    </div>
                  </>
                )}
              </div>

              <details className="mt-4">
                <summary className="cursor-pointer underline">
                  View Full Session JSON
                </summary>
                <pre className="mt-2 bg-gray-100 p-2 md:p-4 rounded overflow-auto text-xs md:text-sm max-h-64 text-black">
                  {JSON.stringify(sessionInfo, null, 2)}
                </pre>
              </details>
            </div>

            {/* User Info */}
            <div className="flex-1 bg-white rounded-lg shadow p-4 md:p-6">
              <h2 className="text-lg md:text-xl font-semibold mb-4 flex items-center gap-2">
                👤 User Info
              </h2>

              {userInfo?.user ? (
                <div className="space-y-2 text-sm md:text-base">
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <span>✅ Authenticated</span>
                  </div>
                  <div className="flex justify-between">
                    <span>ID:</span>
                    <span className="text-xs md:text-sm break-all">
                      {userInfo.user.id}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Email:</span>
                    <span>{userInfo.user.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Role:</span>
                    <span>{userInfo.user.role || "authenticated"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Email Confirmed:</span>
                    <span>
                      {userInfo.user.email_confirmed_at ? "✅ Yes" : "⚠️ No"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Created At:</span>
                    <span>
                      {new Date(userInfo.user.created_at).toLocaleString()}
                    </span>
                  </div>
                </div>
              ) : (
                <div>❌ Not authenticated</div>
              )}

              <details className="mt-4">
                <summary className="cursor-pointer underline">
                  View Full User JSON
                </summary>
                <pre className="mt-2 bg-gray-100 p-2 md:p-4 rounded overflow-auto text-xs md:text-sm max-h-64 text-black">
                  {JSON.stringify(userInfo, null, 2)}
                </pre>
              </details>
            </div>
          </div>
        )}

        {/* Auth Listener */}
        <div className="bg-white rounded-lg shadow p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-semibold mb-2 flex items-center gap-2">
            🔊 Real-time Auth Events
          </h2>
          <p className="text-sm mb-2">
            Open console to see auth events in real-time
          </p>
          <button
            onClick={() => {
              supabase.auth.onAuthStateChange((event, session) => {
                console.log("🔔 Auth Event:", event);
                console.log("Session:", session);
              });
              alert("Auth listener activated! Check console for events.");
            }}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
          >
            Activate Auth Listener
          </button>
        </div>
      </div>
    </div>
  );
}
