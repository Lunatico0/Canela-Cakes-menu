import { useEffect, useRef } from "react";
import QRCodeStyling from "qr-code-styling";

type WifiStyledQRProps = {
  ssid: string;
  password: string;
};

export default function WifiStyledQR({ ssid, password }: WifiStyledQRProps) {
  const ref = useRef(null);

  const qrCode = new QRCodeStyling({
    width: 200,
    height: 200,
    type: "svg",
    data: `WIFI:S:${ssid};T:WPA;P:${password};;`,
    image: "/wifi-line.png",
    imageOptions: {
      crossOrigin: "anonymous",
      margin: 5
    },
    dotsOptions: {
      color: "#000000",
      type: "rounded"
    },
    backgroundOptions: {
      color: "#bee5f8"
    }
  });

  useEffect(() => {
    if (ref.current) {
      qrCode.append(ref.current);
    }
  }, []);

  return (
    <div className="flex flex-col items-center gap-2">
      <div ref={ref} />
    </div>
  );
}
