import "@/styles/globals.css";
import { Inter, Source_Sans_Pro, Abril_Fatface } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
});

const sourcePro = Source_Sans_Pro({
  subsets: ["latin"],
  weight: ["600", "700"],
});

const abrilFat = Abril_Fatface({
  subsets: ["latin"],
  variable: "--font-abril",
  weight: ["400"],
});

export default function App({ Component, pageProps }) {
  return (
    <>
      <style jsx global>
        {`
          :root {
            --inter-font: ${inter.style.fontFamily};
            --sourcePro-font: ${sourcePro.style.fontFamily};
            --abrilFat-font: ${abrilFat.style.fontFamily};
          }
        `}
      </style>
      <Component {...pageProps} />
    </>
  );
}
