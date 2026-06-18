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

// 🔥 CONFIGURACIÓN PARA MÓVILES (Evita zoom accidental y define color)
export const viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

// 🔥 CONFIGURACIÓN DE LA APP (Metadatos y PWA)
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
    // 🔥 2. suppressHydrationWarning es obligatorio para que el Modo Oscuro no tire errores al cargar
    <html lang="es" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-full flex flex-col antialiased`}>
        
        {/* 🔥 3. Envolvemos toda tu aplicación con el ThemeProvider */}
        <ThemeProvider attribute="class" defaultTheme="dark">
          {children}
        </ThemeProvider>

      </body>
    </html>
  );
}