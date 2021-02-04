
const cellElements = document.querySelectorAll('[data-cell]'),
      board = document.getElementById('board'),
      X_CLASS = 'x',
      CIRCLE_CLASS = 'circle',
      WINNING_COMBINATIONS = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6]
      ],
      winningMsgTextElement = document.querySelector('[data-winning-msg-text]'),
      winningMsgElement = document.getElementById('winningMsg'),
      restartBtn = document.getElementById('restartButton')


let circleTurn

startGame()

restartBtn.addEventListener('click', startGame);
function startGame() {
    circleTurn = false
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, { once: true })
    })
    setBoardHoverClass()
    winningMsgElement.classList.remove('show');
}

function handleClick(e){
    const cell = e.target
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
    placeMark(cell, currentClass)
    if (checkWin(currentClass)) {
        endGame(false)
    } else if (isDraw()){
        endGame(true)
    } else {
        swapTurns()
        setBoardHoverClass()
    }
}

function endGame(draw){
    if (draw) {
        winningMsgTextElement.innerText = `Draw`;
    } else {
        winningMsgTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
    }
    winningMsgElement.classList.add('show');
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
}

function placeMark(cell, currentClass){
    cell.classList.add(currentClass)
}

function swapTurns(){
    circleTurn = !circleTurn
}
function setBoardHoverClass(){
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    if (circleTurn) board.classList.add(CIRCLE_CLASS)
    else board.classList.add(X_CLASS)
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}