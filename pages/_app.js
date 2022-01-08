import Head from 'next/head'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/globals.css'
import { ThemeProvider, createTheme } from '@mui/material'

const ShrinkLyCanvas = ({ Component, pageProps }) => {
  const customTheme = createTheme({
    typography: {
      'fontFamily': `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`,
      'fontSize': 16,
      'fontWeightLight': 300,
      'fontWeightRegular': 400,
      'fontWeightMedium': 500
    },
    palette: {
      primary: {
        main: '#3367D5'
      }
    }
  })

  return (
    <>
      <Head>
        <title>Shrink-Ly - The Smart URL shortener. Speed up your work 10x faster</title>
        <link rel='shortcut icon' href='/logo.png' />
      </Head>
      <ThemeProvider theme={customTheme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}

export default ShrinkLyCanvas