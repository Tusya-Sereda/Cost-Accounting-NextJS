import '../styles/globals.css'
import '../styles/main.css';
import '../styles/onePurchase.css';
import {CostProvider} from '../context/Context';
import {ApolloProvider, ApolloClient, InMemoryCache} from '@apollo/client';

const client = new ApolloClient( {
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache()
})

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <CostProvider>
        <Component {...pageProps} />
      </CostProvider>
    </ApolloProvider>
  );
}

export default MyApp
