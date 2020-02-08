import React from 'react';
import fakeExpensiveOperation from '../utils/fakeExpensiveOperation';

const NumberRow = React.memo(({ number, active, index, onClick }) => {
  console.log('RENDERING ROW: ', number);
  fakeExpensiveOperation(1);
  const classes = [
    'number-row',
    (active && 'number-row--active'),
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} onClick={() => onClick(index)}>
      {number}
    </div>
  );
});

export default NumberRow;
