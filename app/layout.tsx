import localFont from "next/font/local";
import "./globals.css";
import MainHeader from "@/components/navigation/MainHeader"; 
import MainFooter from "@/components/navigation/MainFooter";
import BrandThemeObserver from "@/components/BrandThemeObserver";

export const metadata = {
  title: "Sennheiser TR",
  description: "Metan Teknik - Sennheiser Yetkili Distribütörü",
};

export const viewport = {
  themeColor: '#013746',
}

/* We define the font here. 
   'variable' creates the CSS variable --font-ff-unit-pro.
   'display: swap' prevents invisible text while loading.
*/
const ffUnitPro = localFont({
  src: [
    { path: "../public/fonts/ff-unit-pro/FF Unit Pro Thin.otf", weight: "100", style: "normal" },
    { path: "../public/fonts/ff-unit-pro/FF Unit Pro Thin Italic.otf", weight: "100", style: "italic" },
    { path: "../public/fonts/ff-unit-pro/FF Unit Pro Light.otf", weight: "300", style: "normal" },
    { path: "../public/fonts/ff-unit-pro/FF Unit Pro Light Italic.otf", weight: "300", style: "italic" },
    { path: "../public/fonts/ff-unit-pro/FF Unit Pro Regular.otf", weight: "400", style: "normal" },
    { path: "../public/fonts/ff-unit-pro/FF Unit Pro Italic.otf", weight: "400", style: "italic" },
    { path: "../public/fonts/ff-unit-pro/FF Unit Pro Medium.otf", weight: "500", style: "normal" },
    { path: "../public/fonts/ff-unit-pro/FF Unit Pro Medium Italic.otf", weight: "500", style: "italic" },
    { path: "../public/fonts/ff-unit-pro/FF Unit Pro Bold.otf", weight: "700", style: "normal" },
    { path: "../public/fonts/ff-unit-pro/FF Unit Pro Bold Italic.otf", weight: "700", style: "italic" },
    { path: "../public/fonts/ff-unit-pro/FF Unit Pro Black.otf", weight: "900", style: "normal" },
    { path: "../public/fonts/ff-unit-pro/FF Unit Pro Black Italic.otf", weight: "900", style: "italic" },
    { path: "../public/fonts/ff-unit-pro/FF Unit Pro Ultra.otf", weight: "950", style: "normal" },
    { path: "../public/fonts/ff-unit-pro/FF Unit Pro Ultra Italic.otf", weight: "950", style: "italic" },
  ],
  variable: "--font-ff-unit-pro",
  display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={ffUnitPro.variable}>
      <body className="antialiased min-h-screen flex flex-col font-sans">
        <BrandThemeObserver />
        <MainHeader />
        {/* Children will now be able to "reach up" and change the background */}
        <main className="flex-grow">
          {children}
        </main>
        <MainFooter />
      </body>
    </html>
  );
}