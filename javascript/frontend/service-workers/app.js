const app = () => {
  const fInput = document.querySelector('#f-input');
  const cInput = document.querySelector('#c-input');
  const installButton = document.querySelector('.install-button');

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

  // https://developers.google.com/web/fundamentals/app-install-banners/
  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    installButton.style.display = 'inline-block';

    installButton.addEventListener(
      'click',
      () => {
        installButton.style.display = 'none';
        event.prompt();
      },
      { once: true },
    )
  });
};

export default app;
