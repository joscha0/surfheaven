import React, { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import NextLink from "next/link";

import "../styles/globals.css";
import "@fontsource/montserrat";

import Head from "next/head";
import styles from "../styles/Home.module.css";

import ResponsiveAppBar from "../components/appbar";
import Footer from "../components/footer";

const LinkBehavior = React.forwardRef(function changeLinks(props, ref) {
  const { href, ...other } = props;
  // Map href (MUI) -> to (nextjs router)
  return (
    <NextLink href={href} passHref>
      <a sx={{ display: "inline" }} ref={ref} {...other} />
    </NextLink>
  );
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
  typography: {
    fontFamily:
      '"Montserrat", -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;',
  },
  components: {
    MuiLink: {
      defaultProps: {
        component: LinkBehavior,
      },
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior,
      },
    },
  },
});

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#f6a821",
    },
  },
  typography: {
    fontFamily:
      '"Montserrat", -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;',
  },
  components: {
    MuiLink: {
      defaultProps: {
        component: LinkBehavior,
      },
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior,
      },
    },
  },
});

function MyApp({ Component, pageProps }) {
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <CssBaseline />
      <Head>
        <title>Surfheaven</title>
        <meta
          name="description"
          content="Surfheaven surf server advanced profile view"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ResponsiveAppBar toggleTheme={toggleTheme} isDarkTheme={isDarkTheme} />
      <main className={styles.main}>
        <Component {...pageProps} />
      </main>
      <Footer />
    </ThemeProvider>
  );
}

export default MyApp;
