import "@/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="bg-[#2D2727]">
      <Component {...pageProps} />
    </div>
  );
}
