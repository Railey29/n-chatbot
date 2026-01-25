import React from "react";

interface ButtonProps {
  title: string;
  onNavigation?: () => void;
  disabled?: boolean;
  className?: string;
}

export default function Button({
  title,
  onNavigation,
  disabled = false,
  className = "",
}: ButtonProps) {
  return (
    <button
      className={`px-4 py-2 rounded-lg font-medium shadow transition hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      onClick={onNavigation}
      disabled={disabled}
    >
      {title}
    </button>
  );
}
