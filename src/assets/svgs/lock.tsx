import React from "react";

export default function LockSvg() {
  return (
    <div>
      <svg
        width="120"
        height="120"
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="60" cy="60" r="60" fill="#F7931A" fill-opacity="0.1" />
        <circle cx="60" cy="60" r="50" fill="#F7931A" fill-opacity="0.2" />
        <circle cx="60" cy="60" r="40" fill="#F7931A" fill-opacity="0.4" />
        <circle cx="60" cy="60" r="30" fill="#F7931A" fill-opacity="0.6" />
        <path
          d="M60 65.3332V62.6665"
          stroke="white"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M50.666 63.9998C50.666 58.8452 54.8447 54.6665 59.9993 54.6665C65.154 54.6665 69.3327 58.8452 69.3327 63.9998C69.3327 69.1545 65.154 73.3332 59.9993 73.3332C54.8447 73.3332 50.666 69.1545 50.666 63.9998Z"
          stroke="white"
        />
        <path
          d="M66 56.6665V52.6665C66 49.3528 63.3137 46.6665 60 46.6665C56.6863 46.6665 54 49.3528 54 52.6665V56.6665"
          stroke="white"
          stroke-linecap="round"
        />
      </svg>
    </div>
  );
}
