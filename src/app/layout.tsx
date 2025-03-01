"use client";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import store from "@/store/store";
import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";
import Header from "@/components/header/Header";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>
        <Provider store={store}>
          <ToastContainer />
          <Header />
          {children}
        </Provider>
      </body>
    </html>
  );
}
