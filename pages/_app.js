import '../styles/globals.css'
import '../styles/main.css';
import {CostProvider} from '../context/Context';

function MyApp({ Component, pageProps }) {
  return (
  <CostProvider>
    <Component {...pageProps} />
  </CostProvider>
  );
}

export default MyApp
