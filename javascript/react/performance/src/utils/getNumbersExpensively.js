import fakeExpensiveOperation from './fakeExpensiveOperation';

const getNumbersExpensively = (count) => {
  console.log('GETTING NUMBERS');
  fakeExpensiveOperation(5);
  return Array.from(new Array(count)).map((_, i) => i);
}

export default getNumbersExpensively;
