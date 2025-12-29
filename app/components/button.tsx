import React from "react";

interface buttonProps {
  title: string;
  onNavigation?: () => void;
}

export default function Button({ title, onNavigation }: buttonProps) {
  return (
    <>
      <button
        className="btn btn-outline btn-success ml-2"
        onClick={onNavigation}
      >
        {title}
      </button>
    </>
  );
}
