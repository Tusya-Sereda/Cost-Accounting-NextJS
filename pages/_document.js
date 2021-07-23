import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render( ) {
    return (
      <Html>
        <Head> 
          <link rel="preconnect" href="https://fonts.googleapis.com"/>
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="true"/>
          <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital@1&display=swap" rel="stylesheet"/>
        </Head>
        <body>
          <Main/>
          <NextScript/>
        </body>
      </Html>
    );
  }
}
