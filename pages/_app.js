import "../styles/globals.css";
import Head from "next/head";

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>MyMoviz App</title>
        <link rel="shortcut icon" href="/favicon.png" type="image/png" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default App;
