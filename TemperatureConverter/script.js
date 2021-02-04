const celciusInput = document.querySelector('#celcius > input');
const fahrenheitInput = document.querySelector('#fahrenheit > input');
const kelvinInput = document.querySelector('#kelvin > input');

function roundNum(num) {
    return Math.round(num * 100) / 100;
}

celciusInput.addEventListener('input', function() {
    const cTemp = parseFloat(celciusInput.value);
    const fTemp = (cTemp * (9/5)) + 32;
    const kTemp = cTemp + 273.15;
    fahrenheitInput.value = roundNum(fTemp);
    kelvinInput.value = roundNum(kTemp);
});

fahrenheitInput.addEventListener('input', function() {
    const fTemp = parseFloat(fahrenheitInput.value);
    const cTemp = ((fTemp - 32) * 5) / 9;
    const kTemp = (((fTemp - 32) * 5)/ 9) + 272.15;
    celciusInput.value = roundNum(cTemp);
    kelvinInput.value = roundNum(kTemp);
});

kelvinInput.addEventListener('input', function() {
    const kTemp = parseFloat(kelvinInput.value);
    const cTemp = kTemp - 273.15;
    const fTemp = (((kTemp - 273.15) / 5) * 9) + 32;
    celciusInput.value = roundNum(cTemp);
    fahrenheitInput.value = roundNum(fTemp);
});

