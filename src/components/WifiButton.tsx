import { useState } from "react";
import WifiStyledQR from "./WifiStyledQR.tsx";
import WifiPasswordRoundedIcon from '@mui/icons-material/WifiPasswordRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

const ssid = "CanelaCakes";
const password = "BestCakesEver";
const wifiQR = `WIFI:S:${ssid};T:WPA;P:${password};;`;

export default function WifiButton() {
  const [show, setShow] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyPassword = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <button
        className="fixed bottom-20 right-4 bg-accent text-white p-4 rounded-full shadow-lg z-50 hover:scale-105 transition-transform"
        onClick={() => setShow(!show)}
        aria-label="Conectarse al WiFi"
      >
        <WifiPasswordRoundedIcon />
      </button>

      {show && (
        <div
          className="fixed inset-0 bg-black/10 flex items-center justify-center z-40"
          onClick={() => setShow(false)}
        >
          <div
            className="bg-background relative p-6 rounded-xl text-center w-[90%] max-w-sm shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-semibold mb-2">Conectarse al WiFi</h2>

            <p className="text-sm mb-1">
              <strong>Red:</strong> {ssid}
            </p>

            <p className="text-sm mb-4 flex items-center justify-center gap-2">
              <strong>Contraseña:</strong> {password}
              <button
                onClick={copyPassword}
                className="text-accent hover:underline text-sm"
              >
                {copied ? "Copiado!" : <i className="ri-file-copy-line"></i>}
              </button>
            </p>

            {/* QR + WiFi icon overlay */}
            <WifiStyledQR ssid={ssid} password={password} />

            <button
              onClick={() => setShow(false)}
              className="absolute top-2 right-2 text-accent hover:underline mx-auto text-sm"
            >
              <CloseRoundedIcon />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
