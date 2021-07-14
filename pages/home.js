import Head from 'next/head';
import { CostContext } from '../context/Context';
import { useEffect, useState, useContext } from 'react';
import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddContent from '../comonents/AddContent';

export default function Home() {
  const {allCosts, setAllCost} = useContext(CostContext);
  console.log(allCosts);
  return (
    <div className='home_container'>
      <Head>
        <title>Cost-Accounting</title>
      </Head>
      <h1>Учет моих расходов:</h1>
      <AddContent/>
    </div>
  )
}
