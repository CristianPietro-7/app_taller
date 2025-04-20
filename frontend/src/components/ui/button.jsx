import React from "react";

export function Button({ children, onClick, className = "", type = "button", asChild = false }) {
  const baseClass =
    "px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-200";

  if (asChild) {
    return React.cloneElement(children, {
      className: `${baseClass} ${children.props.className || ""} ${className}`,
      onClick,
    });
  }

  return (
    <button type={type} onClick={onClick} className={`${baseClass} ${className}`}>
      {children}
    </button>
  );
}
