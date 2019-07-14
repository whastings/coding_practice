import React from 'react';
import './App.css';
import getNumbersExpensively from './utils/getNumbersExpensively';
import NumberRow from './components/NumberRow';

const NUMBER_COUNT = 3;

const App = () => {
  const [activeRow, setActiveRow] = React.useState(null);

  const numbers = React.useMemo(() => getNumbersExpensively(NUMBER_COUNT), [NUMBER_COUNT]);

  const handleRowClick = React.useCallback((index) => {
    console.log('ACTIVATING ROW: ', index);
    setActiveRow(index);
  }, []);

  return (
    <div className="App">
      {numbers.map((number, i) => (
        <NumberRow
          key={number}
          number={number}
          active={activeRow === i}
          index={i}
          onClick={handleRowClick}
        />
      ))}
    </div>
  );
}

export default App;
