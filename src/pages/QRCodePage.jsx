import React from "react";
import { useParams } from "react-router-dom";
import QRCode from "react-qr-code";

const QRCodePage = () => {
  const { slug } = useParams();
  const url = `${window.location.origin}/menu/${slug}`;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white px-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-8 sm:p-12 w-full max-w-md text-center">
        {/* Title */}
        <h1 className="text-3xl font-bold mb-6 text-indigo-400">
          Scan this QR Code
        </h1>

        {/* QR Code */}
        <div className="flex justify-center mb-6">
          <div className="bg-gray-900/50 p-4 rounded-xl shadow-lg">
            <QRCode value={url} size={200} />
          </div>
        </div>

        {/* URL Display */}
        <p className="text-gray-300 text-sm mb-2">Share this link:</p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="break-all text-indigo-400 hover:text-indigo-300 underline"
        >
          {url}
        </a>

        {/* Copy Button */}
        <button
          onClick={() => {
            navigator.clipboard.writeText(url);
            alert("Link copied to clipboard!");
          }}
          className="mt-6 w-full px-6 py-3 rounded-lg font-semibold bg-gradient-to-r from-indigo-500 to-purple-500 hover:scale-105 transition-transform shadow-lg"
        >
          Copy Link
        </button>
      </div>
    </div>
  );
};

export default QRCodePage;
