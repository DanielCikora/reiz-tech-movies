"use client";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import store from "@/store/store";
import "../styles/globals.css";
import Header from "@/components/header/Header";
import "react-toastify/dist/ReactToastify.css";
import Footer from "@/components/footer/Footer";
import { useEffect, useState } from "react";
import { Bounce } from "react-toastify";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading, setLoading] = useState<boolean>(true);
  const [fadeIn, setFadeIn] = useState<boolean>(false);
  const loadingDuration: number = 3000;
  const fadeInDelayDuration: number = 100;

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setTimeout(() => setFadeIn(true), fadeInDelayDuration);
    }, loadingDuration);
    return () => clearTimeout(timer);
  }, []);

  return (
    <html lang='en'>
      <body>
        <Provider store={store}>
          {loading ? (
            <section className='w-dvw h-dvh grid place-items-center'>
              <div className='loader'></div>
            </section>
          ) : (
            <div
              className={`transition-opacity duration-1000 ${
                fadeIn ? "opacity-100" : "opacity-0"
              }`}
            >
              <ToastContainer
                position='top-center'
                autoClose={3000}
                limit={1}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss={false}
                draggable={false}
                pauseOnHover={false}
                theme='dark'
                transition={Bounce}
                style={{ top: "80px", padding: "0 20px" }}
              />
              <Header />
              {children}
              <Footer />
            </div>
          )}
        </Provider>
      </body>
    </html>
  );
}
