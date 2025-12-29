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

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <>
      <div className="navbar bg-base-100 shadow-md p-0 m-0">
        <div className="flex-1">
          <img
            src="/logo.png"
            alt="logo"
            className="h-20 p-3 ml-5 cursor-pointer"
          />
        </div>
        <div className="flex-none mr-5 p-2">
          <ul className="menu menu-horizontal px-1 gap-2">
            {loading ? (
              <li>
                <span className="text-sm">Loading...</span>
              </li>
            ) : user ? (
              // User is logged in
              <>
                <li>
                  <span className="text-sm text-gray-600">{user.email}</span>
                </li>
                <li>
                  <Button title="Logout" onNavigation={handleLogoutClick} />
                </li>
              </>
            ) : (
              // User is not logged in
              <>
                <li>
                  <Button
                    title="Login"
                    onNavigation={() => router.push("/login")}
                  />
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}
