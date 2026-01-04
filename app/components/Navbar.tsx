"use client";
import React, { useEffect, useState } from "react";
import Button from "./button";
import { useRouter } from "next/navigation";
import { getCurrentUser, handleLogout } from "../controller/LoginController";

export default function Navbar() {
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const checkUser = async () => {
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogoutClick = async () => {
    try {
      await handleLogout();
      setUser(null);
      alert("Logout Successfully");
      router.push("/");
    } catch (error) {
      alert(error);
    }
  };

  const handleHistoryClick = () => {
    if (user) {
      router.push("/history");
    } else {
      router.push("/login");
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <div className="navbar bg-base-100 shadow-md px-4">
      {/* LOGO */}
      <div className="flex-1">
        <img
          src="/logo.png"
          alt="logo"
          className="h-14 cursor-pointer"
          onClick={() => router.push("/")}
        />
      </div>

      {/* MOBILE MENU */}
      <div className="flex-none lg:hidden">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost">
            ☰
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 gap-2"
          >
            {loading ? (
              <li>
                <span>Loading...</span>
              </li>
            ) : user ? (
              <>
                <li className="text-sm text-gray-600 px-2">{user.email}</li>
                <li>
                  <Button title="History" onNavigation={handleHistoryClick} />
                </li>
                <li>
                  <Button title="Logout" onNavigation={handleLogoutClick} />
                </li>
              </>
            ) : (
              <>
                <li>
                  <Button
                    title="Login"
                    onNavigation={() => router.push("/login")}
                  />
                </li>
                <li>
                  <Button title="History" onNavigation={handleHistoryClick} />
                </li>
              </>
            )}
          </ul>
        </div>
      </div>

      {/* DESKTOP MENU */}
      <div className="hidden lg:flex flex-none">
        <ul className="menu menu-horizontal gap-2">
          {loading ? (
            <li>
              <span className="text-sm">Loading...</span>
            </li>
          ) : user ? (
            <>
              <li>
                <span className="text-sm text-gray-600">{user.email}</span>
              </li>
              <li>
                <Button title="History" onNavigation={handleHistoryClick} />
              </li>
              <li>
                <Button title="Logout" onNavigation={handleLogoutClick} />
              </li>
            </>
          ) : (
            <>
              <li>
                <Button
                  title="Login"
                  onNavigation={() => router.push("/login")}
                />
              </li>
              <li>
                <Button title="History" onNavigation={handleHistoryClick} />
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}
