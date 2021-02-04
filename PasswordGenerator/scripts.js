const characterAmountRange = document.getElementById('characterAmountRange');
const characterAmountNumber = document.getElementById('characterAmountNumber');
const form = document.getElementById('passwordGeneratorForm');

const includeUppercaseElement = document.getElementById('includeUppercase');
const includeNumbersElement = document.getElementById('includeNumbers');
const includeSymbolsElement = document.getElementById('includeSymbols');
const passwordDisplay = document.getElementById('passwordDisplay');

const LOWERCASE_CHAR_CODE = arrayFromLowToHigh(97, 122);
const UPPERCASE_CHAR_CODE = arrayFromLowToHigh(65, 90);
const NUMBER_CHAR_CODE = arrayFromLowToHigh(48, 57);
const SYMBOL_CHAR_CODE = arrayFromLowToHigh(33, 47).concat(
    arrayFromLowToHigh(58, 64)
).concat(
    arrayFromLowToHigh(91, 96)
).concat(
    arrayFromLowToHigh(123, 126)
);


characterAmountNumber.addEventListener('input', syncCharacterAmount);
characterAmountRange.addEventListener('input', syncCharacterAmount);

form.addEventListener('submit', function(e) {
    e.preventDefault();
    const characterAmount = characterAmountNumber.value;
    const includeUppercase = includeUppercaseElement.checked;
    const includeNumbers = includeNumbersElement.checked;
    const includeSymbols = includeSymbolsElement.checked;
    const password = generatePassword(characterAmount, includeUppercase, includeNumbers, includeSymbols);
    passwordDisplay.innerText = password;
});



function generatePassword(characterAmount, includeUppercase, includeNumbers, includeSymbols) {
    let charCodes = LOWERCASE_CHAR_CODE;
    if (includeUppercase) charCodes = charCodes.concat(UPPERCASE_CHAR_CODE);
    if (includeNumbers) charCodes = charCodes.concat(NUMBER_CHAR_CODE);
    if (includeSymbols) charCodes = charCodes.concat(SYMBOL_CHAR_CODE);
    //console.log(charCodes);
    const passwordCharacters = [];
    for (let i = 0; i < characterAmount; i++) {
        const characterCode = charCodes[Math.floor(Math.random() * charCodes.length)];
        passwordCharacters.push(String.fromCharCode(characterCode));
    }
    
    return passwordCharacters.join(''); // retuns as a string
    
}

function arrayFromLowToHigh(low, high){
    const array = [];
    for (let i = low; i <= high; i++) {
        array.push(i);
    }
    return array;
}
function syncCharacterAmount(e) {
    const value = e.target.value;
    characterAmountNumber.value = value;
    characterAmountRange.value = value;
}