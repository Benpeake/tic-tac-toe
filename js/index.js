const sqr1 = document.getElementById(1)
const sqr2 = document.getElementById(2)
const sqr3 = document.getElementById(3)
const sqr4 = document.getElementById(4)
const sqr5 = document.getElementById(5)
const sqr6 = document.getElementById(6)
const sqr7 = document.getElementById(7)
const sqr8 = document.getElementById(8)
const sqr9 = document.getElementById(9)

const resultText = document.querySelector('.result')

const restartBtn = document.querySelector('.restart')

const player1Score = document.querySelector('.player1Wins')
const player1Display = document.querySelector('.player1')
const player1Symbol = document.querySelector('.player1-symbol')

const player2Score = document.querySelector('.player2Wins')
const player2Display = document.querySelector('.player2')
const player2Symbol = document.querySelector('.player2-symbol')

const setNamesBtn = document.querySelector('.setNames')
const chooseNameP1 = document.getElementById('chooseNameP1')
const chooseNameP2 = document.getElementById('chooseNameP2')

const player1Turn = document.querySelector('.player-info1')
const player1TurnOther = document.querySelector('.sub-info1')

const player2Turn = document.querySelector('.player-info2')
const player2TurnOther = document.querySelector('.sub-info2')


//player factory
const playerFactory = (name, symbol) => {
    function move(square){
        square.innerHTML = symbol
    }
    function setName(input) {
        this.name = input
    }
    let moves = []
    let wins = 0

    function addWin(){
        wins ++
        return wins
    }

    return{name, symbol, move, setName, moves, addWin, wins}
}

//players
const player1 = playerFactory('P-1', `X`)
const player2 = playerFactory('P-2', `O`)


player1Display.innerHTML = player1.name
player2Display.innerHTML = player2.name
player1Score.innerHTML = player1.wins
player2Score.innerHTML = player2.wins
player1Symbol.innerHTML = player1.symbol
player2Symbol.innerHTML = player2.symbol

//start game info
let currentPlayer = player1

//gameboard
let gameBoard = {
    gameMoves: 0,
    squares: [ 
        sqr1, sqr2, sqr3,
        sqr4, sqr5, sqr6,
        sqr7, sqr8, sqr9
        ],
    winSequences: [
        [sqr1, sqr2, sqr3],
        [sqr4, sqr5, sqr6], 
        [sqr7, sqr8, sqr9], 
        [sqr1, sqr4, sqr7], 
        [sqr2, sqr5, sqr8], 
        [sqr3, sqr6, sqr9], 
        [sqr1, sqr5, sqr9], 
        [sqr3, sqr5, sqr7] 
        ]
    
}

//handle click/move
function handleSquareClick(square) {
    if(resultText.innerHTML == ''){
    if (square.innerHTML === '') {
      if (currentPlayer === player1) {

        player2Turn.classList.add('green')
        player2TurnOther.classList.add('sub-info-green')

        player1Turn.classList.remove('green')
        player1TurnOther.classList.remove('sub-info-green')

        player1.move(square)
        player1.moves.push(square)
        gameBoard.gameMoves++
        checkWin()
        currentPlayer = player2
      } else {

        player1Turn.classList.add('green')
        player1TurnOther.classList.add('sub-info-green')

        player2Turn.classList.remove('green')
        player2TurnOther.classList.remove('sub-info-green')

        player2.move(square)
        player2.moves.push(square)
        gameBoard.gameMoves++
        checkWin()
        currentPlayer = player1
      }
    }
    }
  }

  //handle player moving 
gameBoard.squares.forEach(square => {
  square.addEventListener('click', () => handleSquareClick(square))
})

function checkWin() {
    let win = false;
    for (const sequence of gameBoard.winSequences) {
      if (sequence.every(square => player1.moves.includes(square))) {
        resultText.innerHTML = `${player1.name} wins!`;
        player1Score.innerHTML = player1.addWin()
        win = true;
      } else if (sequence.every(square => player2.moves.includes(square))) {
        resultText.innerHTML = `${player2.name} wins!`;
        player2Score.innerHTML = player2.addWin()
        win = true;
      }
    }
    if (gameBoard.gameMoves == 9 && !win) {
      resultText.innerHTML = `${player1.name} and ${player2.name} draw`;
    }
  }


//restart game logic 
function restartGame() {
    gameBoard.squares.forEach(square => {
        square.innerHTML = ''
    })
    resultText.innerHTML = ''
    gameBoard.gameMoves = 0
    player1.moves = []; 
    player2.moves = []; 
}

restartBtn.addEventListener('click', restartGame)

