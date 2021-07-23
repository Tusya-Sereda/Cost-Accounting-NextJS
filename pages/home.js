import Head from 'next/head';
import AddContent from '../comonents/AddContent';

export default function Home() {
  return (
    <div className='mainHomeContainer'>
      <Head>
        <title>Cost-Accounting</title>
        <meta charSet="utf-8"></meta>
        <meta name="description" content="Page for account your purchases" />
      </Head>
      <h1>Учет расходов:</h1>
      <AddContent/>
    </div>
  )
}
