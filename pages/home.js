import { useContext } from 'react';
import Head from 'next/head';
import { CostContext } from '../context/Context';
import AddContent from '../comonents/AddContent';

export default function Home() {
  const {allCosts, setAllCost} = useContext(CostContext);

  return (
    <div className='mainHomeContainer'>
      <Head>
        <title>Cost-Accounting</title>
        <meta charset="utf-8"></meta>
        <meta name="description" content="Page for account your purchases" />
      </Head>
      <h1>Учет расходов:</h1>
      <AddContent/>
    </div>
  )
}
