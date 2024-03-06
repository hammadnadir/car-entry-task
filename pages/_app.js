import "@/styles/globals.css";
import "@/styles/Home.module.css";
import { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.min.css";
import { wrapper } from "@/store";
import "react-image-crop/dist/ReactCrop.css";
import { SessionProvider } from "next-auth/react";
import "antd/dist/reset.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'react-chat-elements/dist/main.css'

function App({ Component, pageProps }) {
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    (function (c, l, a, r, i, t, y) {
      c[a] =
        c[a] ||
        function () {
          (c[a].q = c[a].q || []).push(arguments);
        };
      t = l.createElement(r);
      t.async = 1;
      t.src = "https://www.clarity.ms/tag/" + i;
      y = l.getElementsByTagName(r)[0];
      y.parentNode.insertBefore(t, y);
    })(window, document, "clarity", "script", "l2td7y6bp1");
  }, []);

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
