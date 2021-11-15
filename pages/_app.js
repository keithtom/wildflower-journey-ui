import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
// Importing Sass with Bootstrap CSS
import '../styles/scss/theme.scss';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
