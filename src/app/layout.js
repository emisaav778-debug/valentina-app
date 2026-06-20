import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// 🔥 1. Importamos el proveedor de temas
import { ThemeProvider } from "next-themes"; 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 🔥 2. Configuración para Móviles y PWA (Evita zoom accidental y da color a la barra del celu)
export const viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

// 🔥 3. Metadatos de la App (Aquí conectamos el manifest.json que creaste)
export const metadata = {
  title: "Valentina Fit | Forja tu mejor versión",
  description: "Entrena de forma inteligente con nuestra IA o descarga las guías detalladas.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    title: "ValentinaFit",
    statusBarStyle: "black-translucent",
  },
};

export default function RootLayout({ children }) {
  return (
    // 🔥 4. suppressHydrationWarning es obligatorio para el Modo Oscuro
    <html lang="es" suppressHydrationWarning>
      
      {/* 🔥 CÓDIGO DE GOOGLE ADSENSE (AQUÍ ENTRA EL ROBOT DE GOOGLE) */}
      <head>
        <script 
          async 
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9215160843913685"
          crossOrigin="anonymous"
        ></script>
      </head>

      <body className={`${geistSans.variable} ${geistMono.variable} min-h-full flex flex-col antialiased`}>
        
        {/* 🔥 5. Envolvemos la app con el ThemeProvider */}
        <ThemeProvider attribute="class" defaultTheme="dark">
          {children}
        </ThemeProvider>

      </body>
    </html>
  );
}