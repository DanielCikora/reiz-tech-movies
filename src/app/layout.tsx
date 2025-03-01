"use client";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import store from "@/store/store";
import "../styles/globals.css";
import Header from "@/components/header/Header";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../footer/Footer";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>
        <Provider store={store}>
          <ToastContainer position='top-center' style={{ top: "80px" }} />
          <Header />
          {children}
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
