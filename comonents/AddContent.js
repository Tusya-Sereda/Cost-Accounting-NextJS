import React, {useState, useEffect, useContext } from 'react';
import { CostContext } from '../context/Context';
import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TaskContent from './TaskContent';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function AddContent () {
  const classes = useStyles();
  const {allCosts, setAllCost} = useContext(CostContext);
  const [inputReason, setReason] = useState('');
  const [inputCost, setCost] = useState('');
  const [inputReasonDirty, setReasonDirty] = useState(false);
  const [inputCostDirty, setCostDirty] = useState(false);
  const [inputReasonError, setReasonError] = useState('Поле не может быть пустым');
  const [inputCostError, setCostError] = useState('Поле не может быть пустым');

  useEffect( () => {
    async function load () {
      const response = await fetch('http://localhost:4200/costs');
      const json = await response.json();
      setAllCost(json);
    }
    load();
  }, [])

  const blurHandler = (event) => {
    switch(event.target.value) {
      case 'inputReason':
        setReasonDirty(true);
        break;
      case 'inputCost':
        setCostDirty(true);
        break;
    }
  }

  const onCLickButton = () => {
    const array = [...allCosts];
    array.push({
      reason: inputReason,
      cost: inputCost
    });  
    setAllCost(array);
    setReason('');
    setCost('');
  }

  return (
    <div className="add_input_content">
      <div className='add_content'>
        {(inputReasonDirty && inputReasonError) && <div style={{color: 'red'}}>{inputReasonError} </div>}
        <TextField 
          className= { inputReason ? "inputWhereValid" : "inputWhereInvalid" } 
          variant="outlined" 
          value={inputReason} 
          onBlur={() => blurHandler(event)}
          onChange={(event) => setReason(event.target.value)}
          label="Куда было потрачено:"
        />
        {(inputCostDirty && inputCostError) && <div style={{color: 'red'}}>{inputCostError}</div>}
        <TextField 
          className="inputHowMuch" 
          variant="outlined" 
          value={inputCost} 
          label="Сколько было потрачено:"
          onBlur={() => blurHandler(event)}
          onChange={(event) => setCost(event.target.value)}
        />
        <Button 
        variant="contained" 
        color="secondary" 
        onClick={() => onCLickButton()
        }>Add</Button>
        </div>
          <TaskContent/>
    </div>
  );
}

// AddContent.getInitialProps = async () => {
//   const response = await fetch('http://localhost:4200/costs');
//   const costs = await response.json();
//   console.log(costs);
//   return {
//     costs // возвращаем объект по ключу 
//   }
// }
