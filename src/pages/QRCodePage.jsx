import { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import API_BASE_URL from "../api/api.config";
import RestaurantNavbar from "../components/RestaurantNavbar";

const QRCodePage = () => {
  const [slug, setSlug] = useState("");
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchSlug = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/restaurant/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!data.slug) throw new Error("Slug missing in response");
        setSlug(data.slug);
      } catch (err) {
        console.error("Slug fetch error:", err);
        setError("Failed to load slug.");
      }
    };
    fetchSlug();
  }, []);

  const menuURL = `${window.location.origin}/menu/${slug}`;

  const handleDownload = () => {
    const canvas = document.getElementById("qr-code");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    const link = document.createElement("a");
    link.href = pngUrl;
    link.download = "qr-menu.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <RestaurantNavbar />
      <div className="p-4 text-center">
        <h2 className="text-xl font-semibold mb-4">QR Code for Your Menu</h2>

        {error && <p className="text-red-600">{error}</p>}

        {slug ? (
          <>
            <QRCodeCanvas
              id="qr-code"
              value={menuURL}
              size={256}
              level="H"
              className="mx-auto"
            />
            <p className="mt-4">{menuURL}</p>
            <button
              onClick={handleDownload}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
            >
              Download QR Code
            </button>
          </>
        ) : (
          !error && <p>Loading...</p>
        )}
      </div>
    </>
  );
};

export default QRCodePage;
