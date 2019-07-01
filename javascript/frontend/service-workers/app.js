const app = () => {
  const fInput = document.querySelector('#f-input');
  const cInput = document.querySelector('#c-input');

  fInput.addEventListener('input', () => {
    const fValue = Number(fInput.value);
    if (isNaN(fValue) || !fInput.value) {
      cInput.value = '';
    } else {
      cInput.value = (fValue - 32) * (5 / 9);
    }
  });

  cInput.addEventListener('input', () => {
    const cValue = Number(cInput.value);
    if (isNaN(cValue) || !cInput.value) {
      fInput.value = '';
    } else {
      fInput.value = (cValue * (9 / 5)) + 32;
    }
  });
};

export default app;
