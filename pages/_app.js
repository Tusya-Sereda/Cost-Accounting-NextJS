import "../styles/globals.scss";
import "../styles/main.scss";
import "../styles/onePurchase.scss";
import { CostProvider } from "../context/Context";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <CostProvider>
        <Component {...pageProps} />
      </CostProvider>
    </ApolloProvider>
  );
}

export default MyApp;
