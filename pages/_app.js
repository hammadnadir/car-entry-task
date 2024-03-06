import "@/styles/globals.css";
import { useEffect, useState } from "react";
import { wrapper } from "@/store";
import { SessionProvider } from "next-auth/react";
import "antd/dist/reset.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App({ Component, pageProps }) {
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isSSR) {
    return null;
  }

  return (
    <>
      <SessionProvider>
        <ToastContainer />
        <Component {...pageProps} />
      </SessionProvider>
    </>
  );
}

export default wrapper.withRedux(App);
