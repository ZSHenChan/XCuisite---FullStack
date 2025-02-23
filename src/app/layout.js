// import "bootstrap/dist/css/bootstrap.css";

import "@/styles/globals.scss";
import GlobalHeader from "./components/GlobalHeader/GlobalHeader";
import GlobalFooter from "./components/GlobalFooter/GlobalFooter";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";

// import { Toaster } from "@/components/Toasts/sonner";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "XCuisite",
  description: "Doughnuts!",
  icons: {
    icon: "/images/logos/xcuisite-logo-64-bg.png",
    apple: "/images/logos/xcuisite-logo-192-bg.png",
  },
};

export const viewport = {
  width: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <CartProvider>
            <GlobalHeader />
            <main>
              {children}
              <Toaster
                position="top-center"
                reverseOrder={false}
                gutter={8}
                containerClassName=""
                containerStyle={{}}
                toastOptions={{
                  // Define default options
                  className: "",
                  duration: 3000,
                  removeDelay: 1000,
                  style: {
                    background: "#eef4ed",
                    color: "#f46200",
                  },

                  // Default options for specific types
                  success: {
                    iconTheme: {
                      primary: "green",
                      secondary: "#eef4ed",
                    },
                    style: {
                      background: "#eef4ed",
                      color: "green",
                    },
                  },

                  error: {
                    iconTheme: {
                      primary: "red",
                      secondary: "#eef4ed",
                    },
                    style: {
                      background: "#eef4ed",
                      color: "red",
                    },
                  },
                }}
              />
            </main>
            <GlobalFooter />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
